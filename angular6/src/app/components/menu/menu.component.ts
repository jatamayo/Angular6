import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  button1: string = 'menu_button1';
  button2: string = 'menu_button2';
  
  constructor() { }

  ngOnInit() {
  }

}
