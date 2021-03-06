import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Document } from 'src/app/classes/document';
import { User } from 'src/app/classes/user';
import { UserNamesForDocumentSenderField } from 'src/app/interfaces/user-names-for-document-sender-field';
import { DocumentService } from 'src/app/services/document.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css'],
})
export class DocumentCardComponent implements OnInit {
  @Input() document: Document = new Document();
  @Input() shouldBeDisabled: boolean = false;
  @Input() caseId: number;
  @Input() shouldBePossibleToEdit: boolean;

  @Output() whatHappendWithNewDocument: EventEmitter<Document> =
    new EventEmitter();

  @ViewChild('documentForm') documentForm: NgForm;

  documentTypes: string[] = [
    'Pozew',
    'Odpowiedź na pozew',
    'Wniosek o wszczęcie postępowania nieprocesowego',
    'Odpowiedź na wniosek o wszczęcie postępowania nieprocesowego',
    'Apelacja',
    'Zażalenie',
    'Środek zaskarżenia od nakazu zapłaty',
    'Wniosek o przywrócenie terminu',
    'Wniosek o zawezwanie do próby ugodowej',
    'Skarga o wznowienie postępowania',
    'Skarga kasacyjna',
    'Skarga o stwierdzenie niezgodności z prawem prawomocnego orzeczenia',
    'Wniosek o wszczęcie postępowania egzekucyjnego',
    'Wniosek o doręczenie wyroku z uzasadnieniem',
    'Wyrok z uzasadnieniem',
    'Postanowienie',
    'Nakaz zapłaty',
    'Inne pismo przychodzące',
    'Inne pismo wychodzące',
    'Potwierdzenie odbioru',
    'Umowa o mediację',
    'Wniosek o zawieszenie postępowania',
  ];
  receiptMethods: string[] = [
    'Poczta Polska',
    'e-mail',
    'ePUAP',
    'Kurier',
    'Inne',
  ];
  usersNames: UserNamesForDocumentSenderField[] = [];
  file: File | null;
  fileName: string = 'Nowy plik';
  isBeingEdited: boolean = false;
  clone: any;

  constructor(
    private documentService: DocumentService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    if (this.shouldBeDisabled) {
      this.documentForm.form.disable();
      this.cdRef.detectChanges();
    }
  }

  ngOnInit(): void {
    if (this.document.id) {
      this.fileName = this.document.fileName;
    }
    this.userService.getUserNames().subscribe(
      (response) => {
        this.usersNames = response;
        if (this.document.id !== undefined && !this.document.isIncoming) {
          this.usersNames.forEach((user) => {
            if (user.id === this.document.sender!.id) {
              this.document.sender = <User>user;
            }
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async handleFileInput(files: FileList) {
    this.file = files.item(0);
    this.document.file = await this.convertToByteArray(this.file);
  }

  convertToByteArray(file: any) {
    return new Promise<any[]>((resolve, reject) => {
      try {
        let reader = new FileReader();
        let fileBytes: any = [];
        reader.readAsArrayBuffer(file);
        reader.onloadend = (event) => {
          if (event.target!.readyState == FileReader.DONE) {
            let arrayBuffer = event.target!.result,
              array = new Uint8Array(<ArrayBuffer>arrayBuffer);
            for (const byte of array) {
              fileBytes.push(byte);
            }
          }
          resolve(fileBytes);
        };
      } catch (e) {
        reject(e);
      }
    });
  }

  cleanUp() {
    if (this.document.isIncoming) {
      this.document.sender = undefined;
      this.document.dateOfDelivery = undefined;
      if (!this.document.isResponseRequired) {
        this.document.deadlineForResponse = undefined;
      }
    } else {
      this.document.deadlineForResponse = undefined;
      this.document.isResponseRequired = false;
      this.document.methodOfReceipt = '';
    }
  }

  sendJson() {
    if (this.file != null) {
      this.document.fileName = this.file.name;
    }
    this.cleanUp();

    if (this.isBeingEdited) {
      this.documentService.updateDocument(this.document).subscribe(
        (response) => {
          this.shouldBeDisabled = true;
          if (this.file != null) {
            this.fileName = this.file.name;
          }
          this.snackBar.open('Dokument został zaktualizowany', 'Zamknij');
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Dokument nie został zaktualizowany!', 'Zamknij');
        }
      );
    } else {
      this.documentService.addDocument(this.caseId, this.document).subscribe(
        (response) => {
          this.document.id = response.body;
          this.shouldBeDisabled = true;
          this.fileName = this.file!.name;
          this.whatHappendWithNewDocument.emit(this.document);
          this.snackBar.open('Dokument został dodany', 'Zamknij');
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Dokument nie został dodany!', 'Zamknij');
        }
      );
    }
  }

  discard() {
    if (!this.isBeingEdited) {
      this.whatHappendWithNewDocument.emit(this.document);
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
        const bytesAsChars = atob(this.document.file!.toString());
        const bytesAsUnicodes = new Array(bytesAsChars.length);
        for (var i = 0; i < bytesAsChars.length; i++) {
          bytesAsUnicodes[i] = bytesAsChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(bytesAsUnicodes);
        const file = new Blob([byteArray], { type: 'application/pdf;base64' });
        const fileURL = URL.createObjectURL(file);
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
    this.documentForm.form.enable();
  }
}
