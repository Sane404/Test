import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  API_KEY:string = '19270976-52a948baffb8c387b7c0b57b3';
  getApiData(){
   return this.http.get(`https://pixabay.com/api/?key=${this.API_KEY}&q=sky&image_type=photo&per_page=3`);
  }
}
