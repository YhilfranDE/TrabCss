import { Component, OnInit, EventEmitter } from "@angular/core";
import { ClientsService } from "../../../services/clients/clients.service";
import { NgForm, FormControl, FormGroupDirective, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { registrarPersona } from "../../../interface/registrarUsuario.interface";
import { RecoverPasswordService } from "../../../services/security/recover-password.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { MatStepper } from '@angular/material';
import { DocumentsService } from "../../../services/documents/documents.service";

@Component({
  selector: "app-register-user-person",
  templateUrl: "./register-user-person.component.html",
  styleUrls: ["./register-user-person.component.css"]
})
export class RegisterUserPersonComponent implements OnInit {

  public errormsg: string;
  public style: string;
  public loading: boolean = false;
  public isError: boolean = false;
  public errorMessage: string;
  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public disable: boolean = true;
  public placeholderDocument = 'Documento Nacional de Identidad';
  public patterDocument = '';
  public formControlDocument = '';
  public maxlengthDocument = null;
  public minlengthDocument = null;
  public isEditable = false;
  public textDocument = '';
  public stepOneControl;
  public stepTwoControl;
  public typeData;


  // Data para registro de persona
  data: registrarPersona = {
    customerDocumentNumber: '',  
    representativeDocumentNumber: '',
    representativeEmail: '',
    documentType: "DNI",
    representativeDocumentType: "DNI"
  };

  public documentTypes = [];
  constructor(
    private clientsService: ClientsService,
    private recoverPasswordService: RecoverPasswordService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private documentsService:DocumentsService  
  ) {
    this.getDocumentTypesByCustomerType();
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.firstFormGroup = this._formBuilder.group({

      documentType: [
        'DNI',
        [
          Validators.required,

        ]
      ],
      customerDocumentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength,
          Validators.maxLength,

        ]
      ],

      stepOneControl: [
        '',
        [
          Validators.required,

        ]
      ]

    });

    this.secondFormGroup = this._formBuilder.group({
      representativeDocumentType: [
        'DNI',
        [
          Validators.required,

        ]
      ],

      stepTwoControl:
        [
          '',
          [
            Validators.required,

          ]
        ],

      representativeDocumentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength,
          Validators.maxLength,
          Validators.pattern
        ]
      ],
      representativeEmail: [
        '',
        [
          Validators.required,
          Validators.maxLength,
          Validators.pattern
        ]
      ]
    });
  }


  getDocumentTypesByCustomerType( ){
    this.loading = true;  
    this.documentsService.getDocumentTypesByCustomerType(2)
    .subscribe(result => {
      this.documentTypes = result.json();
      console.log(this.documentTypes);
      this.loading = false;
    }, err => {
      this.loading = false;     
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      let message = jsonObject.message;
      this.errorMessage = message;
    });   
  }  

  changeTypeDoc(event) {

    if (event == 'DNI') {
      this.placeholderDocument = 'Documento Nacional de Identidad';
      this.minlengthDocument = 8;
      this.maxlengthDocument = 8;
      this.patterDocument = "[0-9]{1,8}";
      this.textDocument = "DNI";
      this.typeData='Númerico';
    }

    else if (event == 'CE') {
      this.placeholderDocument = 'Carnet de Extranjeria';
      this.minlengthDocument = 12;
      this.maxlengthDocument = 12;
      this.patterDocument = "[a-zA-Z0-9]+";
      this.textDocument = "Carnet de Extranjeria";
      this.typeData='Alfanúmerico';
    }
    
    this.secondFormGroup.get('customerDocumentNumber').setValue("");

  }

 

  goSecondStep(stepper: MatStepper) {
   
      const response = grecaptcha.getResponse();
      if (response.length === 0) {
        this.errormsg = '¡Recaptcha no verificado!';
        this.stepOneControl = "";
        return;     
    } else {
      this.stepOneControl = "off";   
      this.errormsg = "";
      this.validateCustomerDocument(stepper);
    }
  }


  goThirdStep(stepper: MatStepper) {  
    this.loading = true;
    this.stepTwoControl = "off";
    this.clientsService
      .etapaDosPersona(
        this.data["customerDocumentNumber"],
        this.data["representativeDocumentNumber"],
        this.data["representativeEmail"],
        this.data["documentType"],
        this.data["representativeDocumentType"]
      ).subscribe(
        result => {
          this.stepTwoControl="off";
          this.registerUser(stepper);
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
          this.stepTwoControl = "";

        }
      );
  }

  registerUser(stepper: MatStepper) {
    console.log("Registro", this.data);
    this.clientsService
      .etapaTresPersona(
        this.data["customerDocumentNumber"],
        this.data["representativeDocumentNumber"],
        this.data["representativeEmail"],
        this.data["documentType"],
        this.data["representativeDocumentType"]
      )
      .subscribe(
        resul => {
          this.isError = false;
          this.loading = false;
          stepper.next();
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
          this.stepTwoControl = "";
        }
      );
  }


  validateCustomerDocument(stepper: MatStepper) {
    this.loading = true;
    this.clientsService.etapaUnoPersona(
      this.data.customerDocumentNumber, this.data.documentType).subscribe(
        result => {
          this.isError = false;
          this.loading = false;
          stepper.next();
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
          this.stepOneControl = "";
        }
      );
  }


  //Reenvio de contraseña
  recuperarEmpresa() {
    console.log("ObjetoPersona", this.data);
    this.loading = true;
    this.recoverPasswordService
      .recuperarPersona(
        this.data["representativeDocumentNumber"],
        this.data["representativeEmail"],
        this.data["documentType"]
      )
      .subscribe(
        (result: any) => {
          this.isError = false;
          this.loading = false;
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
        }
      );
  }

  onClick() {
    this.router.navigate(["/Login"]);
  }


}
