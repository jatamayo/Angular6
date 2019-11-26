import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';

import { ConversationService } from 'src/app/services/conversation.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;
  conversation: any;
  shake: boolean = false;

  constructor(  
    private activatedRoute:ActivatedRoute, 
    private userService: UserService, 
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService) { 

    this.friendId = this.activatedRoute.snapshot.params['id'];
    console.log(this.friendId);
    
    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          const ids = [this.user.id, this.friend.id].sort();
          this.conversation_id = ids.join('|');
          this.getConversation();
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      id: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.id,
      receiver: this.friend.id,
      type: 'txt'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }

  
  sendZumbido() {
    const message = {
      id: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.id,
      receiver: this.friend.id,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido();
  }

  doZumbido(){
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(()=>{
      this.shake=false;
    }, 1000);
  }

  getConversation(){
    console.log(this.conversation_id);
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data)=>{
      this.conversation = data;

      this.conversation.forEach((message)=>{
        if (!message.seen){
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type == 'txt'){
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();  
          }else if (message.type == 'zumbido'){
            this.doZumbido();
          };
        }
      });

    }, (error)=>{
      console.log(error);
    })
  }

  getUserNickById(id){
    if(id === this.friend.id){
      return this.friend.nick;
    }else{
      return this.user.nick;
    }
  }
}
