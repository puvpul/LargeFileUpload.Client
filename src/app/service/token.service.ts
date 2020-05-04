import {  HttpClient,HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, OnInit, Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
   providedIn: 'root' 
})
export class TokenService 
{
    contact: Contact;
    public result: any;
    constructor(private http: HttpClient) { }
    
    public getToken(contactid:string) 
    {
        let url = "https://localhost:44397/api/files";
       
        return this.http.get("https://localhost:44397/api/files/token?contactid=" + contactid.toString()).
               pipe(
                   map((data:Contact)=>{
                        console.log(data);
                        localStorage.clear();
                        localStorage.setItem('sasToken',JSON.stringify(data));
                        return data;
               }), 
                catchError(error =>{
                return throwError( 'Something went wrong!' );
               })
        );
    }
}