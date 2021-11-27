import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from 'src/app/classes/document';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css'],
})
export class DocumentCardComponent implements OnInit {
  @Input() document: Document = new Document();
  documentTypeList: string[] = [
    'Pozew',
    'Wniosek o wszczęcie postępowania nieprocesowego',
    'Wniosek o wszczęcie egzekucji',
    'Wniosek o przeprowadzenie dowodu',
  ];
  file: File | null;
  @Input() shouldBeDisabled: boolean = false;
  @Output() delete: EventEmitter<boolean> = new EventEmitter();
  @Input() caseId: number;

  async handleFileInput(files: FileList) {
    this.document.file = await this.fileToByteArrayy(files.item(0));
  }

  fileToByteArrayy(file: any) {
    return new Promise<any[]>((resolve, reject) => {
      try {
        let reader = new FileReader();
        let fileByteArray: any = [];
        reader.readAsArrayBuffer(file);
        reader.onloadend = (evt) => {
          if (evt.target!.readyState == FileReader.DONE) {
            let arrayBuffer = evt.target!.result,
              array = new Uint8Array(<ArrayBuffer>arrayBuffer);
            for (const byte of array) {
              fileByteArray.push(byte);
            }
          }
          resolve(fileByteArray);
        };
      } catch (e) {
        reject(e);
      }
    });
  }

  sendJson() {
    this.documentService.addDocument(this.caseId, this.document).subscribe(
      (response) => {
        this.document.id = response.body;
        this.shouldBeDisabled = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  discard() {
    this.delete.emit(true);
  }

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {}
}
