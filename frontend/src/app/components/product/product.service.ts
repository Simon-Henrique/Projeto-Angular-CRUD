import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import {HttpClient} from '@angular/common/http'
import { product } from './product.model';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "https://my-json-server.typicode.com/Simon-Henrique/db-crud/produtos"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['error'] : ['success']
    })
  }

  create(product: product): Observable<product>{
    return this.http.post<product>(this.baseUrl,product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro', true)
    return EMPTY
  }

  read(): Observable<product[]> {
   return this.http.get<product[]>(this.baseUrl).pipe(
    map(obj => obj),
    catchError(e => this.errorHandler(e))
  )     
  }

  readById(id: string): Observable<product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(product: product):Observable<product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string): Observable<product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
}
