import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AutentiationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loginWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  registerWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus(){
    return this.angularFireAuth.authState;
  }

  logOut(){
    console.log("logout2");
    return this.angularFireAuth.auth.signOut();
  }

}
