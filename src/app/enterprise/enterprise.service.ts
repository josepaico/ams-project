import { Injectable } from '@angular/core';
import { ENTERPRISES } from './enterprise.json';
import { Enterprise } from './enterprise';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  private urlEnpoint:string = 'http://localhost:3333/api/enterprises';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient,
              private router: Router ) { }

  getEnterprises():Observable<Enterprise[]>{
    //return of(ENTERPRISES);
    /*return this.http.get(this.urlEnpoint).pipe(
      map( (response) => response as Enterprise[] )
    )*/

    return this.http.get<Enterprise[]>(this.urlEnpoint);
  }

  create(enterprise: Enterprise) : Observable<Enterprise>{
    return this.http.post(this.urlEnpoint, enterprise, {headers: this.httpHeaders}).pipe(
      map( (response :any) => response.enterprise as Enterprise ),
      catchError(e => {
        console.error(e.error.mensaje);
        //mensaje alerta de catchError

        return throwError(e);
      })
    )
  }

  getEnterprise(id) : Observable<Enterprise>{
    return this.http.get<Enterprise>(`${this.urlEnpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/enterprises']);
        //mensaje de alerta error
        console.error(e.error.mensaje);

        return throwError(e);
      })
    )
  }

  /*modo 1 update(enterprise: Enterprise) : Observable<Enterprise>{
    return this.http.put<Enterprise>(`${this.urlEnpoint}/${enterprise.enterpriseId}`, enterprise, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);

        return throwError(e);

      })
    );
  }*/

  /*modo 2 con mensajes update(enterprise: Enterprise) : Observable<any>{
    return this.http.put<any>(`${this.urlEnpoint}/${enterprise.enterpriseId}`, enterprise, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);

        return throwError(e);

      })
    );
  }*/

  //modo 3 con mensajes y sacar solo el objeto
  update(enterprise: Enterprise) : Observable<Enterprise>{
    return this.http.put(`${this.urlEnpoint}/${enterprise.enterpriseId}`, enterprise, {headers: this.httpHeaders}).pipe(
      map( (response :any) => response.enterprise as Enterprise ),
      catchError(e => {
        console.error(e.error.mensaje);
        //mensaje alerta de catchError

        return throwError(e);

      })
    );
  }

  delete(enterpriseId: number){
    return this.http.delete(`${this.urlEnpoint}/${enterpriseId}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        //mensaje alerta de catchError

        return throwError(e);

      })
    )
  }

}
