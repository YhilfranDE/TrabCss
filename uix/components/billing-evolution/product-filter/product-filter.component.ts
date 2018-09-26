import { Component, Output, EventEmitter } from '@angular/core';
import { ClientsService } from '../../../services/clients/clients.service';
import { DocumentsService } from '../../../services/documents/documents.service';
import * as $AB from 'jquery';

export interface bussineModel {
    businessId: any
    createStamp: string
    customerCustomerId: string
    status: string
}

export interface dataFilterModel {
    customerId: any,
    productId: string,
    businessId: any
}

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

    @Output() loadCompleted: EventEmitter<boolean>;

    // object with form attributes
    dataFilter = {
        customerId: null,
        productId: "",
        businessId: "",
    }
    list: any[];
    totalDoc: any;
    monthString: any;
    monthList: string[];
    data: any;
    loading: boolean;  
    business: bussineModel;
    products: any[] = [];
    productDescription = null;
    errorProd = null;
    errorModal = null;
    errorBussines = null;
    msg = null;
    errorMessage: string;
    errorExport: string;
    viewChart: boolean;
    loadCompletedHere: boolean;
 


    constructor(private clientsService: ClientsService,
        private documentsService: DocumentsService
    ) {
        this.loadCompleted = new EventEmitter()
        this.loadCompletedHere = false;
        this.data = { customerDocumentNumber: null, }
        this.loadData();

        this.monthList = [
            '',
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
            'Diciembre'
        ]
    }

    public chartColors: any[] = [
        {
            backgroundColor: ["#11588e", "grey", "#11588e", "grey", "#11588e", "grey"]
        }];

    //Properties and event graphic
    public barChartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true, 
        scaleShowValues: true,
        scaleValuePaddingX: 10,
        scaleValuePaddingY: 5,   
        
        
       

        animation: {
            onComplete: function () {           
                var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'botton';              
                ctx.fillStyle="black";
                ctx.font="30px";

                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 15);
                    });
                });
            }
        }
      

    }; 

    public barChartData: any[] = [
        { data: [], label: 'Total' },
    ];
    public barChartLabels: any[];
    public monthLabelChart: any[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public totalAmountChart: number[] = [];

    // initial data load
    loadData() {
        var userId = localStorage.getItem("userId");
        this.clientsService.misDatos(userId).subscribe(result => {
            this.data = this.assignData(result.json());
            var customerId =
            {
                customerId: this.data.customerDocumentNumber
            }
            this.getBusinessByCustomer(this.data);//--> Load Business Data          
            this.getProductsByCustomer(customerId);//--> Load Products
            this.dataFilter.customerId = this.data.customerDocumentNumber; //-> Ruc assign DataFilter          
        }, err => {
            this.loading = false;
            this.loadCompletedHere = true;  
            var error = <any>err;
            var jsonObject = JSON.parse(error.text());
            var errorMessage = jsonObject.message;
            this.msg = errorMessage;
        });
    }

    assignData(value) {
        return { customerDocumentNumber: value.customerDocumentNumber }
    }

    // Get business data
    getBusinessByCustomer(datos) {
        this.clientsService.getBusinessByCustomer(datos.customerDocumentNumber)
            .subscribe(result => {                
                this.assignDataBussine(result.json());
                this.business = result.json();
            }, err => {
                this.loading = false;
                var error = <any>err;
                var jsonObject = JSON.parse(error.text());
                var errorMessage = jsonObject.message;
                this.errorBussines = errorMessage;
            });
    }

    assignDataBussine(value) {
        this.dataFilter.businessId = value[0].businessId
        console.log("asigna",this.dataFilter.businessId);
    }

    // Get Product
    getProductsByCustomer(customerId) {
       
        this.documentsService.getProductsByCustomer(customerId)
            .subscribe(result => {          
                this.assignDataProduct(result.json());
                this.products = result.json();
                this.loadCompleted.emit(true);
                this.loadCompletedHere = true;                                
            }, err => {
                //this.loading = false;
                this.loadCompleted.emit(true);
                this.loadCompletedHere = true;
                var error = <any>err;
                var jsonObject = JSON.parse(error.text());
                var errorMessage = jsonObject.message;
                this.errorProd = errorMessage;
            });
    }

    assignDataProduct(value) {
        this.dataFilter.productId = value[0].productId;
        this.productDescription = value[0].description;
        this.getTotalInvoiceByProduct();
    }

    getTotalInvoiceByProduct() {
        this.loading = true;       
        this.monthLabelChart = [''];
        this.totalAmountChart = [0];
        this.monthLabelChart = [''];
        this.barChartLabels = [''];
        this.viewChart = false;
        this.barChartData =
            [
                { data: [], label: 'Total' },
            ];
        this.msg = null;
        this.documentsService.getTotalInvoiceByProduct(
            this.dataFilter.customerId, this.dataFilter.productId, this.dataFilter.businessId)
            .subscribe(result => {
                console.log(result.json());
                this.viewChart = true;
                let barChartResp = [];
                this.monthLabelChart = [];
                this.totalAmountChart = [];
                barChartResp = result.json();
                barChartResp.forEach(element => {
                    this.monthLabelChart.push(element.month + "/" + element.year)
                    this.totalAmountChart.push(JSON.parse(element.totalAmount))
                })

                let min = JSON.stringify(this.totalAmountChart.sort().slice(0, 1));
                let max = JSON.stringify(this.totalAmountChart.sort().slice(-1));
                let valueMin = JSON.parse(min) / 2;
                let valueMax = JSON.parse(max) * 1.3;
                this.totalAmountChart.push(valueMin);
                this.totalAmountChart.push(valueMax);
                this.barChartData = [
                    { data: this.totalAmountChart, label: 'Total' }
                ];
                console.log(this.barChartData);
                this.barChartLabels = this.monthLabelChart;  
                this.loading = false; 
                this.loadCompletedHere=true;            
            }, err => {
                this.loading = false;             
                var error = <any>err;
                var jsonObject = JSON.parse(error.text());
                this.errorMessage = jsonObject.message;
                this.msg = this.errorMessage;
                this.viewChart = false;
            });
    }

    // events click chart
    public chartClicked(e: any): void {
        console.log(e.active.length);
        if (e.active.length === 0) {
            return;
        }
        // this.loading = true;
        this.errorModal = null;
        this.errorExport = null;
        let monthYear = e.active["0"]._model.label;
        monthYear = monthYear.split('/');
        this.monthString = monthYear[0];
        let yearOut = monthYear[1]
        // this.loading = false;
        let monthOut = this.monthList.indexOf(this.monthString);
        this.documentsService.getInvoiceByMonth(this.dataFilter.customerId, this.dataFilter.businessId,
            this.dataFilter.productId, monthOut, yearOut)
            .subscribe(result => {
                this.list = result.json();
                this.totalDoc = this.list.length;
                this.list.forEach(element => {
                    var temp = element.expirationDate.split('T')[0];
                    var date = temp.split('/');
                    element.expirationDate = date[0] + ' de ' + this.monthList[(date[1] - 1)] + ' del ' + date[2];
                });               
                (<any>$('#mostrarmodal')).modal({ backdrop: 'static', keyboard: false })
            }, err => {
                this.errorExport = null;
                 this.loading = false;
                var error = <any>err;
                var jsonObject = JSON.parse(error.text());
                var errorMessage = jsonObject.message;
                this.errorModal = errorMessage;
            });
    }

    //Dowload pdf files for Invoice
    ExportFile(invoiceId, invoiceSpeed) {
        this.loading = true;
        this.documentsService.downloadFile(invoiceId, invoiceSpeed)
            .subscribe(res => {
                console.log('start download:', res);
                console.log("PDF", res);
                console.log(res);
                this.errorExport = null;
                var url = window.URL.createObjectURL(res.data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = res.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.loading = false;
            }, err => {
                console.log('download error:', JSON.stringify(err));
                this.loading = false;
                var error = <any>err;
                var jsonObject = JSON.parse(error.text());
                this.errorMessage = jsonObject.message;
                this.errorExport = "Error al descargar archivo.";
            }, () => {
                console.log('Completed file download.')
                this.loading = false;
            });
    }

    onClick() {
     
        this.barChartData =
            [
                { data: [], label: 'Total' },
            ];
        this.monthLabelChart = null;
        this.totalAmountChart = null;
        this.monthLabelChart = [''];
        this.barChartLabels = null;
        this.viewChart = false;
        this.msg = null;    
    }

    onServiceSelect(value) {     
        let result= this.products.filter(text => text.productId === value);
        this.productDescription=result[0].description;
    }
}
