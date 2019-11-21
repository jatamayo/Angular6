import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AutentiationService } from '../../services/autentiation.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  friends: User[];
  query: string = '';
  user: User;
  
  constructor(private userService: UserService, private autentiationService: AutentiationService, private router:Router){
    
    this.autentiationService.getStatus().subscribe((status)=>{
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
    })
  }

  ngOnInit() {
  }

  logout(){
    this.autentiationService.logOut().then(() => {
      alert("Sesion Terminada");
      this.router.navigate(['login']);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
