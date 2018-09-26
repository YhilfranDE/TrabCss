import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Http, Response, Headers } from "@angular/http";
import { url } from "../../../const";

@Injectable({
  providedIn: "root"
})
export class RecoverPasswordService {
  constructor(private http: Http) {

  }

  recuperarEmpresa(dni, correoEmpresa,documentType) {
    var data = JSON.stringify({
      customerType: "PERSONA_JURIDICA",
      documentType: documentType,
      documentNumber: dni,
      email: correoEmpresa
    });   

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    headers.append(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, X-Auth-Token"
    );

    return this.http.post(url +"/recoverPassword",
      data,
      {
        headers: headers
      }
    );
  }

  recuperarPersona(dni,correoPersona,documentType) {
    var data = JSON.stringify({
      customerType: "PERSONA_NATURAL",
      documentType: documentType,
      documentNumber: dni,
      email: correoPersona
    });  

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    headers.append(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, X-Auth-Token"
    );

    return this.http.post(
      url+"/recoverPassword",
      data,
      {
        headers: headers
      }
    );
  }
}
