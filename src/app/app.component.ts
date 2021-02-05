import { Component, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from './shared/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'APITest';
  request_subscription:Subscription;
  timer_subscription:Subscription;
  dataRecieved:any;
  repeat:boolean = false;
  constructor(private httpRequest:HttpService){}
  ngOnInit(){
      this.repeat = false;
      this.request_subscription = interval(10000)
      .pipe(
        switchMap(()=>this.httpRequest.getApiData())
      )
      .subscribe(
        response => {
          if(response == undefined || null){
            console.log("No internet connection");
            this.request_subscription.unsubscribe()
          }else if(!document.hasFocus()){
            this.request_subscription.unsubscribe()
            console.log("Tab was inactive")
            this.timer_subscription = timer(10000,1000)
            .subscribe(response =>{
              if(!response && document.hasFocus()){
                console.log("Tab was inactive, 10 seconds didn't pass, reload the page to resume requests");
                this.timer_subscription.unsubscribe()
              }else{
                if(document.hasFocus()){
                  console.log("Tab was inactive, 10 seconds passed, resuming requests");// I could not implent recursion :( so just a console log here 
                }
              }
            })
          }else{
            console.log(response) // all is good
          }
        },
        error => console.log(error.message)  // Error messages
      )
    }
}
