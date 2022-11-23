import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() message = '';

  constructor() {
    // This is left empty on purpose, as the spinner component doesn't require any logic
  }

  ngOnInit(): void {
    // This is left empty on purpose, as the spinner component doesn't require any logic
  }

}
