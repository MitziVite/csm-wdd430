import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document-model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0;
  documents: Document[] = [];

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for(let document of this.documents){
      if(document.id === id){
        return document;
      }
    }
    return null;
  }

  getMaxId(): number{
    let maxId = 0;
    this.documents.forEach(document => {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }

  addDocument( newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }else {
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.saveDocumentsToServer();
    }
  }
  

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.saveDocumentsToServer();
  }


  deleteDocument(document: Document) {
   if (!document) {
      return;
   }
   const pos = this.documents.indexOf(document);
   if (pos < 0) {
      return;
   }
   this.documents.splice(pos, 1);
   this.saveDocumentsToServer();
}

getDocumentsFromServer() {
  this.http.get<Document[]>('https://csmproject-b3996-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents ?? [];
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
}

saveDocumentsToServer() {
  // Convierte el arreglo de documentos a string JSON
  const documentsString = JSON.stringify(this.documents);

  // Crea los headers para indicar que el contenido es JSON
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Envía la lista de documentos al servidor de Firebase usando PUT
  this.http.put(
    'https://csmproject-b3996-default-rtdb.firebaseio.com/documents.json',
    documentsString,
    { headers }
  ).subscribe(
    () => {
      // Cuando el servidor responde exitosamente, emite el evento con una copia del array
      this.documentListChangedEvent.next(this.documents.slice());
    },
    (error: any) => {
      console.error(error);
    }
  );
}
}
