import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  blue= true
  text="sfondo blu"

  changeEvent(ev){
    this.blue= !this.blue
    console.log("evento",ev,this.blue)
    if(this.blue){
      this.text="sfondo blu"
    }
    else{
      this.text="sfondo bianco"
    }
  }

  constructor() { }

  ngOnInit() {
  }

}