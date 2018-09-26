import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ClientsService } from "../../../services/clients/clients.service";
import * as $AB from 'jquery';
import { generate } from 'rxjs';

@Component({
  selector: 'app-registry-membership',
  templateUrl: './registry-membership.component.html',
  styleUrls: ['./registry-membership.component.css']
})



export class RegistryMembershipComponent implements OnInit {

  @Output() loadCompleted: EventEmitter<boolean>;

  data = {
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
  

  request:any = {
    file:File,
    customerDocumentTypeId: null,
    documentNumber: "",
    firstName:null,
    lastName: "",
    telephone:"",
    email: "", 
    CheckAutorizo:false,
    emailNotificacion :false,
  }
 

  isLinear = true;
  isEditable = false;
  firstFormGroup: FormGroup;  
  secondFormGroup: FormGroup;
  privatec = '';
  stepOneControl;
  stepTwoControl;
  loading;
  errorMessage;
  typeData;
  notPdf;
  fileValid:Boolean;
  loadCompletedHere: boolean;

  public documentTypes = [];

  constructor(private _formBuilder: FormBuilder,  
    private clientsService: ClientsService) {
    this.loadData();
    this.loadCompleted = new EventEmitter()
  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      emailNotificacion: [true, Validators.required],
      CheckAutorizo: [true, Validators.required]    
    });
    this.secondFormGroup = this._formBuilder.group({
      fileUpload: ['', Validators.required]   
    });
  }

  loadData() {
    this.loading = true;
    var userId = localStorage.getItem("userId");
    this.clientsService.misDatos(userId).subscribe(result => {
      this.data = result.json();
      this.loading = false;
      this.loadCompleted.emit(true);
      this.loadCompletedHere = true;
    }, err => {
      this.loading = false;
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      var error = jsonObject.message;
      this.errorMessage = error;
    });
  }


  goStepTwo(stepper: MatStepper) { 
    this.stepOneControl = "off";   
    this.request.customerDocumentTypeId = this.data.contactDocumentType;
    this.request.documentNumber = this.data.contactDocumentNumber;
    this.request.telephone = this.data.contactPhone;
    this.request.email = this.data.contactEmail;
    this.request.contactName = this.data.contactName;
    this.request.CheckAutorizo = this.firstFormGroup.value.CheckAutorizo;
    this.request.emailNotificacion = this.firstFormGroup.value.emailNotificacion;    
    console.log(this.firstFormGroup.value);    
    stepper.next();
  }


  goStepThree(stepper: MatStepper) {
    stepper.next();
  } 

  selectImage(fileUpload:File){
    if( !fileUpload ){
      return;
      }

      if(fileUpload.type!="application/pdf"){
       this.notPdf="Debe seleccionar un archivo en formato PDF con los documentos requeridos";
       fileUpload =null;
       this.fileValid=false;
       return;
      }
      this.request.file = fileUpload;
      this.fileValid=true;
      this.notPdf="";
    
  }


  registerInvoiceDigital(){ 
    this.loading= true;
    console.log(this.request);
    this.clientsService.registerInvoiceDigital(this.request.file,this.request.customerDocumentTypeId,this.request.documentNumber,
      this.request.contactName,'Cambiar',this.request.telephone,this.request.email)
      .then( resp => {       
        console.log( resp );
        this.loading= false;
       (<any>$('#viewmodal')).modal({ backdrop: 'static', keyboard: false })
      })
      .catch(resp => {
       console.log( resp );
       this.loading= false;
      })     
  }


}



