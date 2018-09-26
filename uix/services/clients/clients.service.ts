import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Http, Response, Headers } from "@angular/http";
import { url } from "../../../const";


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: Http) { }
  //--> Valida Recaptcha  
  validarRecaptcha(response) {
    var data = JSON.stringify({
      checkRecaptcha: response
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(
      url + "/checkRecaptcha", data,
      {
        headers: headers
      }
    );
  }

  // --> Validad Customer
  etapaUnoPersona(documentNumber, documentType) {
    var data = JSON.stringify({
      customerType: "PERSONA_NATURAL",
      documentType: documentType,
      documentNumber: documentNumber
    });

    console.log("1persona", data);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(
      url + "/validateCustomer", data,
      {
        headers: headers
      }
    );
  }

  // --> Validad Customer Representative
  etapaDosPersona(
    documentNumber,
    representativeDocumentNumber,
    representativeEmail,
    documentType,
    representativeDocumentType) {


    var data = JSON.stringify({
      customerType: "PERSONA_NATURAL",
      customerDocumentType: documentType,
      customerDocumentNumber: documentNumber,
      representativeDocumentType: representativeDocumentType,
      representativeDocumentNumber: representativeDocumentNumber,
      representativeEmail: representativeEmail
    });
    console.log("2persona", data);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(
      url + "/validateCustomerRepresentative", data,
      {
        headers: headers
      }
    );
  }


  etapaTresPersona(customerDocumentNumber, representativeDocumentNumber, representativeEmail, documentType, representativeDocumentType) {
    var data = JSON.stringify({
      customerType: "PERSONA_NATURAL",
      customerDocumentType: documentType,
      customerDocumentNumber: customerDocumentNumber,
      representativeDocumentType: representativeDocumentType,
      representativeDocumentNumber: representativeDocumentNumber,
      representativeEmail: representativeEmail
    });

    console.log("3persona", data);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(
      url + "/registerUser", data,
      {
        headers: headers
      }
    );
  }

  etapaUnoEmpresa(documentNumber) {

    var data = JSON.stringify({
      customerType: "PERSONA_JURIDICA",
      documentType: "RUC",
      documentNumber: documentNumber
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(
      url + "/validateCustomer", data,
      {
        headers: headers
      }
    );
  }

  //--> Validad Customer Representative
  etapaDosEmpresa(customerDocumentNumber, representativeDocumentNumber, representativeEmail, documentType) {
    var data = JSON.stringify({
      customerType: "PERSONA_JURIDICA",
      customerDocumentType: "RUC",
      customerDocumentNumber: customerDocumentNumber,
      representativeDocumentType: documentType,
      representativeDocumentNumber: representativeDocumentNumber,
      representativeEmail: representativeEmail
    });
    console.log("2empresa", data);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(
      url + "/validateCustomerRepresentative", data,
      {
        headers: headers
      }
    );
  }

  // --> Validad Customer Representative
  etapaTresEmpresa(customerDocumentNumber, representativeDocumentNumber, representativeEmail, documentType) {
    var data = JSON.stringify({
      customerType: "PERSONA_JURIDICA",
      customerDocumentType: "RUC",
      customerDocumentNumber: customerDocumentNumber,
      representativeDocumentType: documentType,
      representativeDocumentNumber: representativeDocumentNumber,
      representativeEmail: representativeEmail
    });
    console.log("3empresa", data);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(url + "/registerUser", data, {
      headers: headers
    }
    );
  }

  misDatos(userId) {
    var token = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    return this.http.get(
      url + "/getUserInformation/" + userId, {
        headers: headers
      });
  }

  cambiarContrasenia(userId, password, newpassword) {
    var token = JSON.parse(localStorage.getItem("token"));
    var data = JSON.stringify({
      "userId": userId,
      "oldPassword": "",
      "newPassword": password,
      "retypeNewPassword": newpassword
    });
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(
      url + "/changePassword", data, {
        headers: headers
      }
    );
  }


  getBusinessByCustomer(customerId) {
    var data = JSON.stringify({
      "customerId": customerId
    });
    var token = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url + "/getBusinessByCustomer", data, {
      headers: headers
    });
  }


  registerInvoiceDigital(uploadFile, customerDocumentTypeId, documentNumber, firstName, lastName, telephone, email) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('file', uploadFile);
      formData.append('customerDocumentTypeId', JSON.stringify(customerDocumentTypeId));
      formData.append('documentNumber', JSON.stringify(documentNumber));
      formData.append('firstName', JSON.stringify(firstName));
      formData.append('lastName', JSON.stringify(lastName));
      formData.append('telephone', JSON.stringify(telephone));
      formData.append('email', JSON.stringify(email));

      console.log(formData);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Solicitud Procesada');
            resolve(xhr.response);
          } else {
            console.log("fallo la subida");
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url + '/registerInvoiceDigital', true);
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.send(formData);
    });
  }

}







