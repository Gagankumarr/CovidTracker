import { Component, OnInit, Input } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/gobal-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummary[];
  country: string[] = [];
  
  totalConfirmed = 0;
  totalActive= 0 ;
  totalDeaths= 0;
  totalRecovered= 0;

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(res => {
      this.data= res;
      this.data.forEach(covidcase => {
        this.country.push(covidcase.country)
      })
    })
  }

  updateValues(country : string){
    console.log(country);
    
    this.data.forEach( covidcase => {
      if(covidcase.country == country){
        this.totalActive= covidcase.active;
        this.totalConfirmed= covidcase.confirmed;
        this.totalDeaths= covidcase.deaths;
        this.totalRecovered= covidcase.recoverd;
      }
    })
  }

}
