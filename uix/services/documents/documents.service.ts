import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { url } from "../../../const";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private http: Http) { }

  // --> get Invoice Type By Customer
  getInvoiceTypeByCustomer(customerId) {

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
    return this.http.post(url + "/getInvoiceTypeByCustomer", data, {
        headers: headers
      });
  }

  // --> get Invoice By Business
  getInvoiceByBusiness(customerId, businessId, invoiceTypeId) {
    var data = JSON.stringify({
      "customerId": customerId,
      "businessId": businessId,
      "invoiceTypeId": invoiceTypeId
    });

    var token = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url + "/getInvoiceByBusiness", data, {
        headers: headers
      });
  }

  getProductsByCustomer(customerId) {
    var token = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");


    console.log("customer",customerId)
    return this.http.post(url + "/getProductsByCustomer", customerId, {
        headers: headers
      });
  }

  getInvoiceByProduct(product) {
    var token = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(url + "/getInvoiceByProduct", product, {
        headers: headers
      });
  }

  processExportInvoiceByBusiness(customerId, businessId, invoiceTypeId, mediaType) {
    var data = JSON.stringify({
      "customerId": customerId,
      "businessId": businessId,
      "invoiceTypeId": invoiceTypeId,
      "mediaType": mediaType
    });

    console.log(data);

    var token = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.http.post(url + "/processExportInvoiceByBusiness", data, {
        headers: headers,
        responseType: ResponseContentType.Blob
      })
      .pipe(map(res => {
        return {
          filename: customerId+'.'+ mediaType,
          data: res.blob()
        };
      }))
    }

  downloadFile(invoiceId,invoiceSpeed) {
    var token = JSON.parse(localStorage.getItem("token"));
    var data = JSON.stringify({
      "invoiceId": invoiceId });  

    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http
      .post(url + "/processDownloadInvoice", data, {
          headers: headers,
          responseType: ResponseContentType.Blob
        })
      .pipe(map(res => {
        return {
          filename: invoiceSpeed + '.pdf',
          data: res.blob()
        };
      }))

  }
  getTotalInvoiceByProduct(customerId, productId, businessId) {
    var token = JSON.parse(localStorage.getItem("token"));
    var data = JSON.stringify({
      "customerId": customerId,
      "productId": productId,
      "businessId": businessId
    });

    console.log(data);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

    return this.http.post(url + "/getTotalInvoiceByProduct", data, {
        headers: headers
      });
  }

  getInvoiceByMonth(customerId, businessId, productId,month,year) {
    var token = JSON.parse(localStorage.getItem("token"));
    var data = JSON.stringify({
      
      "customerId": customerId,
      "businessId": businessId,
      "productId": productId,
      "month": month,
      "year": year
    });      
   
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    return this.http.post(url + "/getInvoiceByMonth", data, {
        headers: headers
      });
  }

 
  getDocumentTypesByCustomerType(customerId) {
    var data = JSON.stringify({
      "customerTypeId":customerId      
    });      
   
    let headers = new Headers(); 
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    return this.http.post(url + "/getDocumentTypesByCustomerType", data, {
        headers: headers
      });
  }

  getDealersByCustomer(customerId) {
    var token = JSON.parse(localStorage.getItem("token"));

    var data = JSON.stringify({      
      "customerId": customerId      
    });      
   
    console.log("data",data);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + token.access_token);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    return this.http.post(url + "/getDealersByCustomer", data, {
        headers: headers
      });
  }


}