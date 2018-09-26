import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute,Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LogInComponent implements OnInit {
  public empresa: Boolean = true;
  public carga: Boolean = true;
  public boton: Boolean = false;
  public errorChecksession: string = null;
  
  constructor(private activatedRoute: ActivatedRoute,  private router: Router,) {
   this.activatedRoute.params.subscribe(params => {
      this.errorChecksession = params["msg"];
     
    });
  }

  ngOnInit() {
    if (localStorage.getItem("control")) {
      this.validaTab();
    }
  }

  validaTab() {
    this.empresa = false;
    $("#opcion2").css("background", "#4986B6");
    $("#opcion2").css("color", "white");
    $("#opcion2").css("border", "#4986B6");
    $("#opcion1").css("border", "#4986B6");
    $("#opcion1").css("background", "rgba(211, 211, 211, 0.904)");
    $("#opcion1").css("color", "gray");
  }

  onClickMe(value) {
    if (value == "empresa") {
      this.empresa = true;
      $("#opcion1").css("background", "#4986B6");
      $("#opcion1").css("color", "white");
      $("#opcion1").css("border", "#4986B6");
      $("#opcion2").css("border", "#4986B6");
      $("#opcion2").css("background", "rgba(211, 211, 211, 0.904)");
      $("#opcion2").css("color", "gray");
    } else {
      this.empresa = false;
      $("#opcion2").css("background", "#4986B6");
      $("#opcion2").css("color", "white");
      $("#opcion2").css("border", "#4986B6");
      $("#opcion1").css("border", "#4986B6");
      $("#opcion1").css("background", "rgba(211, 211, 211, 0.904)");
      $("#opcion1").css("color", "gray");
    }
  }

  load() {
    this.carga = !this.carga;
    this.boton = !this.boton;   
  }


  clearErrorCheckSession(event){   
    if (event==true){
      this.errorChecksession='';  
      this.router.navigate(["/Login/"]);  

    } 
      
  }
}
