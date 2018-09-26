import { Component, OnInit, Input } from '@angular/core';
import { DocumentsService } from '../../../services/documents/documents.service';

@Component({
  selector: 'app-claim-documents-list',
  templateUrl: './claim-documents-list.component.html',
  styleUrls: ['./claim-documents-list.component.css']
})
export class ClaimDocumentsListComponent implements OnInit {

  @Input() product: any;

  list: any[];
  totalDoc: any;
  isLoginError: boolean = false;
  errorMessage: string;
  isProduct: any;
  msg: string;
  month: any[];
  loading: boolean;
  list1: any[];
  claim: any;
  errorExport: string;
  isError: boolean;
  costumer: any;
  errorMessage1: string;
  speed: any;

  constructor(private documentsService: DocumentsService) {
    this.month = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Ocutbre',
      'Noviembre',
      'Diciembre',
    ]
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.product.status = "TRAMITE";
    this.invocice(this.product);
  }

  invocice(value) {
    console.log(value);
    this.claim = value;
    this.loading = true;
    this.documentsService.getInvoiceByProduct(value).subscribe(result => {
      this.loading = false;
      this.isLoginError = false;
      this.isProduct = true;
      this.list = result.json();
      this.totalDoc = this.list.length;
      this.list.forEach(element => {
        var temp = element.expirationDate.split('T')[0];
        var date = temp.split('/');
        element.expirationDate = date[0] + ' de ' + this.month[(date[1] - 1)] + ' del ' + date[2];
      });
      console.log(this.list);
    }, err => {
      this.loading = false;
      this.isProduct = false;
      this.isLoginError = true;
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      this.errorMessage = jsonObject.message;
      this.msg = this.errorMessage;
    });
  }

  DownloadInvoice(invoiceId, invoiceSpeed) {
    this.loading = true;
    this.costumer = invoiceId;
    console.log(invoiceId);
    this.documentsService.downloadFile(this.costumer, invoiceSpeed)
      .subscribe(res => {
        this.loading = false;
        console.log('start download:', res);
        console.log("PDF", res);
        var url = window.URL.createObjectURL(res.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        this.errorExport = null
      }, err => {
        this.loading = false;
        console.log('download error:', JSON.stringify(error));
        this.errorExport = "Error al descargar archivo.";
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage1 = jsonObject.message;
      }, () => {
        console.log('Completed file download.')
        this.loading = false;
      });
  }

}
