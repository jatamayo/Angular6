import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getUsers(){
    return this.angularFireDatabase.list('users');
  }
  
  getUserById(id){
    return this.angularFireDatabase.object('/users/'+id);
  }
  
  createUser(user){
    return this.angularFireDatabase.object('/users/' + user.id).set(user);
  }

  editUser(user){
    return this.angularFireDatabase.object('/users/' + user.id).set(user);
  }

  setAvatar(avatar, id){
    return this.angularFireDatabase.object('/users/' + id + '/avatar').set(avatar);
  }

  addFriend(userId, friendId) {
    this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId).set(friendId);
    return this.angularFireDatabase.object('users/' + friendId + '/friends/' + userId).set(userId);
  }
}
