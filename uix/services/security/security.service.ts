import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';
import { url } from "../../../const";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {  

  constructor(private http: Http) { }
  
  validateEmpresa(ruc, dni, password,documentType) {
    var data = JSON.stringify({
      'customerType': 'PERSONA_JURIDICA',
      'customerDocumentType':'RUC',
      'customerDocumentNumber': ruc,
      'representativeDocumentType':documentType,      
      'representativeDocumentNumber': dni,      
      'password': password,
      'application': '1'
    });
    console.info('validateEmpresa',data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    return this.http.post(url + "/validateUser", data, {
      headers: headers
    });
  }

  validatePersona(dni, password,documentType) {
    var data = JSON.stringify({
      'customerType': 'PERSONA_NATURAL',
      'customerDocumentType': documentType,
      'customerDocumentNumber': dni,
      'representativeDocumentType':documentType,
      'representativeDocumentNumber': dni,      
      'password': password,
      'application': '1'
    });

    console.log("validatePersona",data);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url+ "/validateUser", data, {
      headers: headers
    });
  }

  login(username, password) {
    var data = 'grant_type=password&username=' + username + '&password=' + password;

    console.log("token",data);
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa("miamericatel-gw:miamericatel"));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url +"/token", data, {
      headers: headers
    });
  }

  logout(sessionId) {
    var data = sessionId;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url +"/logout", data, {
      headers: headers
    });
  }

  checkSession(sessionId) {
    var data = sessionId;
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url +"/checkSession", data, {
      headers: headers
    });
  }

  getMenuLateral(userId, aplication) {
    var token = JSON.parse(localStorage.getItem("token"));  
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');	
    return this.http.get(url+"/getPermissionsByUser/" + userId + '/' + aplication,
      { headers: headers }
    );
  }




}
