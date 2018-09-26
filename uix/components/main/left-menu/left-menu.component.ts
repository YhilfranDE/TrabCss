import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security/security.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  @Output() loadCompleted: EventEmitter<boolean>;

  menuLateral: any[] = [];
  loading: boolean;
  errorMessage ;
  loadCompletedHere: boolean;

  constructor(private router: Router, private securityService: SecurityService) {
    this.loadCompleted = new EventEmitter()
   }

  ngOnInit() { this.cargarMenu() }


  cargarMenu() {
    this.loading = true;
    var userId = localStorage.getItem("userId");
    this.securityService.getMenuLateral(userId, '1')
      .subscribe(data => {       
        this.parsearData(data.json());      
        this.loadCompleted.emit(true);
        this.loadCompletedHere = true;               
      }, err => {
        this.loading = false;       
        this.loadCompletedHere=true;     
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        let message = jsonObject.message;
        this.errorMessage = message;
      }); 
  }

  parsearData(value) {
    value.options.forEach(element => {
     this.menuLateral.push(element)
      this.loading = false; 
    });
  }

}
