import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../models/gobal-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private getData= `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-31-2021.csv`;
  constructor(private _http: HttpClient) { }

  getGlobalData(){
    return this._http.get(this.getData , {responseType : 'text'}).pipe(
      map(result => {
        let data :GlobalDataSummary[]= [];    // pushing data according to the model 
        let raw ={};                          // an object to get final added data

        let rows = result.split('\n');
        rows.splice(0,1);    // to ignore first data
         rows.forEach(row =>{
           let cols= row.split(/,(?=\S)/)       // spliting data from csv file from link used reger.com to do so
           
           let covidcase ={
            country :cols[3],
            confirmed :+cols[7],  // + operator used to convert value in number 
            deaths : +cols[8],
            recoverd : +cols[9],
            active : +cols[10],
           };
           let temp : GlobalDataSummary = raw[ covidcase.country]
           if(temp){                                      // added all cases so that no country data gets repeated
             temp.active =covidcase.active +temp.active
             temp.confirmed= covidcase.confirmed+ temp.confirmed
             temp.deaths= covidcase.deaths +temp.deaths
             temp.recoverd = covidcase.recoverd + temp.recoverd

             raw[covidcase.country] =temp;         // adding temp values in cs object if country name is repeated
           }
           else{
             raw[covidcase.country]= covidcase;
           }
         
          
           
         })
        
       return <GlobalDataSummary[]>Object.values (raw);  // typecasted in this  bacause values are of this type
        
      })
    )
  }
}
