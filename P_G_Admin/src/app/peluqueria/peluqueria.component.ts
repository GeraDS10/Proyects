import { Component, OnInit } from '@angular/core';
import { IValues } from '../models/values.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-peluqueria',
  templateUrl: './peluqueria.component.html',
  styleUrls: ['./peluqueria.component.css']
})
export class PeluqueriaComponent implements OnInit{

  valuesList: IValues[] = [];

  constructor(private _apiService: ApiService){}
  
  ngOnInit(): void{
    this._apiService.getAllValues().subscribe(data=>{
      this.valuesList = data;
    })
    
  }
}
