import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(public http:Http) {
    console.log('Data service connected...');
   }

   getUsers(){
    return this.http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

   getPosts(){
     return this.http.get('https://jsonplaceholder.typicode.com/posts')
       .map(res => res.json());
   }



}
