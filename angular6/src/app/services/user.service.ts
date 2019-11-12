import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends = [];

  constructor() { 
    let user1: User = {
      nick: 'jose alejandro tamayo',
      subnick: 'jatamayo',
      age:27,
      email: 'jatamayo@email.com',
      friend: true,
      id:1,
      status: 'offline'
    };
    let user2: User = {
      nick: 'soraida villagran lopez',
      subnick: 'sori',
      age:27,
      email: 'sori@email.com',
      friend:true,
      id: 2,
      status: 'away'
    };
    let user3: User = {
      nick: 'karem beatriz archila',
      subnick: 'karem',
      age: 50,
      email: 'karem@email.com',
      friend:true,
      id:3,
      status: 'online'
    };
    let user4: User = {
      nick: 'oto daniel tamayo',
      subnick: 'oto',
      age: 39,
      email: 'oto@email.com',
      friend:true,
      id: 4,
      status: 'busy'
    };
    let user5: User = {
      nick: 'meylin alejandra gamboa',
      subnick: 'meylin',
      age: 21,
      email: 'meylin@email.com',
      friend: true,
      id:5,
      status: 'offline'
    }
    this.friends = [user1, user2, user3, user4, user5];
  }

  getFriends(){
    return this.friends;
  }

}
