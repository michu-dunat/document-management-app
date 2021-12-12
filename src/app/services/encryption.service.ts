import { Injectable } from '@angular/core';
import { SHA3, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  hashPassowrd(plainText: string): string {
    let hashedPassword = SHA3(plainText);
    for (let index = 0; index < 63999; index++) {
      hashedPassword = SHA3(hashedPassword);
    }
    let encodedPassword = hashedPassword.toString(enc.Hex);
    // const charBeforeHash = String.fromCharCode(
    //   this.getRandomIntInclusive(97, 122)
    // );
    // const step = (charBeforeHash.charCodeAt(0) % 7) + 2;
    // console.log(encodedPassword, step);
    
    // let hashedPasswordWithSalt: string = '';
    // hashedPasswordWithSalt += charBeforeHash;
    // for (let index = 0; index < encodedPassword.length; index++) {
    //   if (index % step == 0) {
    //     hashedPasswordWithSalt += String.fromCharCode(
    //       this.getRandomIntInclusive(97, 122)
    //     );
    //   }
    //   hashedPasswordWithSalt += encodedPassword[index];
    // }
    // return hashedPasswordWithSalt;
    return encodedPassword;
  }

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  constructor() {}
}
