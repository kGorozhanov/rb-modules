import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  index = 0;
  items = [this.index];

  ngOnInit() {
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
  }

  add() {
    this.index++;
    this.items = [...this.items, this.index];
  }

  onSortChanged($event: number[]) {
    this.items = $event;
  }
}
