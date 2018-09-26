import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security/security.service';
import { ClientsService } from '../../../services/clients/clients.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  datos: any;
  menuLateral: any[] = [];
  loading;
  errorMessage;

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private clientsService: ClientsService
  ) {

    /*Cargo Menu Lateral */
    this.cargarMenu();
    /*Fin cargo menu Lateral*/
    this.datos = {
      customerType: "",
      customerDocumentType: "",
      customerDocumentNumber: "",
      customerName: "",
      contactDocumentType: "",
      contactDocumentNumber: "",
      contactName: "",
      contactEmail: "",
      contactPhone: ""
    }
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarMenu() {
    var userId = localStorage.getItem("userId");
    this.securityService.getMenuLateral(userId, '1')
      .subscribe(data => {
        // console.log(data.json());
        this.parsearData(data.json());       
      } , err => {
        this.loading = false;     
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        let message = jsonObject.message;
        this.errorMessage = message;
      }); 
    
    
    
    
  }

  parsearData(value) {
    value.options.forEach(element => {
      element.options.forEach(element1 => {
        element1.path = element1.path.replace(/\//g, '');
      });

      this.menuLateral.push(element)
    });


  }

  cerrarSesion() {
    var sessionId = localStorage.getItem("sessionId");
    //console.log("cerrarSesion: sessionId=" + sessionId);

    this.securityService.logout(sessionId)
      .subscribe((result: any) => {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.router.navigate(['']);
      });
  }


  cambiarPassword() {
    //console.log("control", control);
    this.router.navigate(['/Principal/CambioContaseña'])
  }

  misDatos() {
    //console.log("control", control);
    this.router.navigate(['/Principal/MisDatos'])
  }

  cargarDatos() {
    var userId = localStorage.getItem("userId");
    this.clientsService.misDatos(userId).subscribe(result => {    
      this.datos = this.asignarData(result.json());  
    });
  }

  asignarData(value) {
    return {
      customerType: value.customerType,
      customerDocumentType: value.customerDocumentType,
      customerDocumentNumber: value.customerDocumentNumber,
      customerName: value.customerName,
      contactDocumentType: value.contactDocumentType,
      contactDocumentNumber: value.contactDocumentNumber,
      contactName: value.contactName,
      contactEmail: value.contactEmail,
      contactPhone: value.contactPhone
    }
  }

}
