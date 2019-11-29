import { Component, OnInit} from '@angular/core';
import { User } from '../../interfaces/user';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal]

})


export class HomeComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  friends: User[];
  query: string = '';
  user: User;
  friendEmail: string = '';
  
  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService, 
    private router:Router,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private requestsService: RequestsService){

    this.authenticationService.getStatus().subscribe((status)=>{
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User)=>{
        this.user = data;
        console.log(this.user);
      },(error)=>{
        console.log(error);
      });
    }, (error)=>{
      console.log(error);
    })
    userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.authenticationService.getStatus().subscribe((status)=>{
      this.userService.getUserById(status.uid).valueChanges().subscribe((data:User)=>{
        this.user = data;
      })
    })
  }

  /* Alert */
  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

  }
  /* Message alert */
  public changeSuccessMessage() {
    this._success.next(`- Message successfully changed.`);
  }

  logout(){
    this.authenticationService.logOut().then(() => {
      alert("Sesion Terminada");
      this.router.navigate(['login']);
    }).catch((error)=>{
      console.log(error);
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  sendRequest(){
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.id,
      status: 'pending'
    };
    this.requestsService.createRequest(request).then(()=>{
      alert('solicitud enviada');
    }).catch((error)=>{
      alert('Error en solicitud');
      console.log(error);
    });
  }
}


