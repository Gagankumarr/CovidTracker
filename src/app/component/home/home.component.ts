import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/gobal-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive= 0 ;
  totalDeaths= 0;
  totalRecovered= 0;
  pieChart: GoogleChartInterface= {
    chartType :'PieChart'
  }
  columnChart: GoogleChartInterface= {
    chartType :'ColumnChart'
  }
  globalData : GlobalDataSummary[];
  constructor( private dataServices: DataServiceService ) { }

  initChart(caseType: string){

    let datatable=[];
    datatable.push(["Country", "Cases"])

    this.globalData.forEach(covidcase =>{
      let value:number;
      if(caseType == 'a')
        console.log("active was entered");
        
        if(covidcase.active>2000)
          value = covidcase.active
   
      
      if(caseType == 'r')
        console.log("recoverd was ebtered");
        
        if(covidcase.recoverd>1000)
          value =covidcase.recoverd
         
        
      
      if(caseType == 'd')
        console.log("deaths was entered");
        
        if(covidcase.deaths>5000)
          value = covidcase.deaths
        
      
       if(caseType == 'c')
        console.log("confirmed was entered");
        
        if(covidcase.confirmed>10000)
          value = covidcase.confirmed
        

        datatable.push([
          covidcase.country , value
        
        ])

    })
     console.log(" values after chart updated", datatable)
    this.pieChart={
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {height: 500},
    };
    this.columnChart={
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {height: 500},
    };
  }


  ngOnInit(): void {
    this.dataServices.getGlobalData().subscribe(res => {
      console.log(res);

      this.globalData= res;
      res.forEach(covidcase => {          // providing covidcase object to itterate value from the array
        if (!Number.isNaN(covidcase.confirmed)){
          this.totalActive+= covidcase.active
          this.totalDeaths+= covidcase.deaths
          this.totalRecovered+= covidcase.recoverd
          this.totalConfirmed+= covidcase.confirmed
        }
      
      })
      this.initChart('a');
      
    })
  }

  updateChart(input){
    // console.log(input)
    this.initChart(input)
  }
 
}
