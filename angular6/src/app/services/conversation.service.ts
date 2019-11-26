import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase: AngularFireDatabase) {}
    
    createConversation(conversation){
      return this.angularFireDatabase.object('conversations/' + conversation.id + '/' + conversation.timestamp).set(conversation);
    }
    
    getConversation(id){
      return this.angularFireDatabase.list('conversations/' + id);
    }

    editConversation(conversation){
      return this.angularFireDatabase.object('conversations/' + conversation.id + '/' + conversation.timestamp).set(conversation);
    }
}
