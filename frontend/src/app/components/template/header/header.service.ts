import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { headerData } from './header-data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<headerData>({
    title: 'Início',
    icon: 'home',
    routeUrl:''
  })

  constructor() { }

  get headerData(): headerData{
    return this._headerData.value
  }
  set headerData(headerData:headerData){
    this._headerData.next(headerData)
  }

}
