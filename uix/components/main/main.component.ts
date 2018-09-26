import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	
	misDatos             : boolean=false;
	cambioContrasenia    : boolean=false;
	documentosPendientes : boolean=false;
	misDocumentos        : boolean=false;
  loading              : boolean;
  loadCompleted:boolean;

  constructor() { }  
  
ngOnInit() {
  }


  setLoadCompleted(event){  
    console.log(event);
    if (event==true){
      this.loading = false;   
      this.loadCompleted=true;  
    } 

  }

}