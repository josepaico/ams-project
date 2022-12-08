import { Component, OnInit } from '@angular/core';
import { Enterprise } from './enterprise';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  private Enterprise: Enterprise = new Enterprise();

  constructor(){}

  ngOnInit(){

  }
}
