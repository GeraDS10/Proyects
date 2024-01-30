import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEstadia } from '../models/estadia.model';
import { ApiService } from '../services/api.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guarderia',
  templateUrl: './guarderia.component.html',
  styleUrls: ['./guarderia.component.css']
})
export class GuarderiaComponent implements OnInit{

  estadia: IEstadia = {
    'id' : '1',
    valorEstadia: 0
  };

  formGuarderia: FormGroup;

  constructor(  
                private _router: Router,
                private _route: ActivatedRoute,
                private _apiService: ApiService,
                private form: FormBuilder
    ){

      this.estadia = {
        "id" : "1",
        "valorEstadia" : 0
      }
     this.formGuarderia= this.form.group({
      id: '',
      valorEstadia: ['', Validators.required]
     }) 
    }

  ngOnInit(): void {
    this._apiService.getValorEstadia(this.estadia.id).subscribe(data=> {
      console.log(data);
      this.estadia = data;
    })
  }

  editar(id: string){
      this.estadia.id = id;
      this.estadia.valorEstadia = this.formGuarderia.value.valorEstadia;
     this._apiService.updateValueEstadia(this.estadia.id, this.estadia)
     .subscribe(
      (updatedValue: IEstadia) => {
        this._router.navigate(['/peluqueria']);
        console.log("Valor actualizado:", updatedValue);
      },
      (error: any) => {
        console.error("Error al actualizar el valor:", error);
      }
    );
     console.log(this.estadia);
  }

  hasErrors(controlValor: string){
    return this.formGuarderia.get(controlValor)?.hasError('required') && this.formGuarderia.get(controlValor)?.touched
    }
}
