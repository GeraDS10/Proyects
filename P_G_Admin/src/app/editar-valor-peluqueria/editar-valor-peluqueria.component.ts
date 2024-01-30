import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IValues } from '../models/values.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-valor-peluqueria',
  templateUrl: './editar-valor-peluqueria.component.html',
  styleUrls: ['./editar-valor-peluqueria.component.css']
})
export class EditarValorPeluqueriaComponent implements OnInit{

  value: IValues;
  formEdit: FormGroup;
  id?: string;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _apiService: ApiService,
      private form: FormBuilder
    ){ 
      this.value = {
        "id" : "",
        "tamanio" : "",
        "corte" : 0,
        "banio" : 0,
        "tienePelolargo": true,
        "ejemplo" : ""
      }
      this.formEdit = this.form.group({
        id: [''],
        tamanio: [''],
        tienePeloLargo: [true],
        ejemplo: [''],
        corte: ['', Validators.required],
        banio: ['', Validators.required]
      })
    }
  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: Params )=> {
        this.id = params['id'];
        this._apiService.getValueById(params['id']).subscribe({
          next: (data:IValues) =>{
            this.value = data;
          },
          error: (error: any) =>{
            console.log(error);
          }
        })
    },
      error: (error: any) =>{
        console.log(error);
      }
    })
  }  
 
  editar(){
    if (this.value) {
      this.value.corte = this.formEdit.value.corte;
      this.value.banio = this.formEdit.value.banio;
     this._apiService.updateValue(this.value.id, this.value)
     .subscribe(
      (updatedValue: IValues) => {
        console.log("Valor actualizado:", updatedValue);
        this._router.navigate(['/peluqueria']);
      },
      (error: any) => {
        console.error("Error al actualizar el valor:", error);
      }
    );
     console.log(this.value);
  }
}

  hasErrors(controlCorte: string){
    return this.formEdit.get(controlCorte)?.hasError('required') && this.formEdit.get(controlCorte)?.touched
    }

}
