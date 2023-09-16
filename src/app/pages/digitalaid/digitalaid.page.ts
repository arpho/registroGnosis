import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digitalaid',
  templateUrl: './digitalaid.page.html',
  styleUrls: ['./digitalaid.page.scss'],
})
export class DigitalaidPage implements OnInit {  public counter = 21;

  public handleOnClick(stateCounter: number) {
    this.counter++;
  }

  constructor() { }

  ngOnInit() {
  }

}
