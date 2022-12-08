import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listCourse: string[] = ['TypesCript', 'Java', 'PHP'];

  habilitar: boolean = true;

  setHabilitar():void{
    this.habilitar = (this.habilitar==true)?false:true;
  }

  constructor(){}
}
