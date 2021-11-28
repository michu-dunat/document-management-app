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
  @Output() whatHappendWithNewDocument: EventEmitter<string> =
    new EventEmitter();
  @Input() caseId: number;
  fileName: string = 'Nowy plik';
  isBeingEdited: boolean = false;
  clone: any;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    if (this.document.id) {
      this.fileName = this.document.fileName;
    }
  }

  async handleFileInput(files: FileList) {
    this.file = files.item(0);
    this.document.file = await this.fileToByteArrayy(this.file);
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
          console.log(fileByteArray);
          resolve(fileByteArray);
        };
      } catch (e) {
        reject(e);
      }
    });
  }

  sendJson() {
    console.log(this.document);

    if (this.file != null) {
      this.document.fileName = this.file.name;
    }
    if (!this.document.isResponseRequired) {
      this.document.deadlineForResponse = undefined;
    }
    if (this.isBeingEdited) {
      this.documentService.updateDocument(this.document).subscribe(
        (response) => {
          this.shouldBeDisabled = true;
          if (this.file != null) {
            this.fileName = this.file.name;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.documentService.addDocument(this.caseId, this.document).subscribe(
        (response) => {
          this.document.id = response.body;
          this.shouldBeDisabled = true;
          this.fileName = this.file!.name;
          this.whatHappendWithNewDocument.emit('saved');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  discard() {
    if (!this.isBeingEdited) {
      this.whatHappendWithNewDocument.emit('discarded');
    } else {
      this.shouldBeDisabled = true;
      this.isBeingEdited = false;
      this.document = this.clone;
    }
  }

  download() {
    this.documentService.getFile(<number>this.document!.id).subscribe(
      (response) => {
        this.document.file = response.file;
        var byteCharacters = atob(this.document.file!.toString());
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], { type: 'application/pdf;base64' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL(fileURL);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edit() {
    this.clone = Object.assign({}, this.document);
    this.shouldBeDisabled = false;
    this.isBeingEdited = true;
  }
}
