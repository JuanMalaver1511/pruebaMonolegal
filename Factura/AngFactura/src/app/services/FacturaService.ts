import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  // Node/Express API
  REST_API: string = 'http://localhost:5039/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  // traer facturas y clientes
  GetFacturas() {
    let factura
    factura = this.httpClient.get(`${this.REST_API}/FacturaRoutes`);
    return factura;
  }


  GetFactura(codigoFactura: any): Observable<any> {
    let API_URL = `${this.REST_API}/FacturaRoutes/${codigoFactura}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Actualizar
  updateFactura(codigoFactura: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/FacturaRoutes/${codigoFactura}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}