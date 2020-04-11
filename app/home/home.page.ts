import { Component, ViewChild } from '@angular/core';
import data from '../../assets/input.json';
import Chart from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private student = data;
  @ViewChild('barChart') barChart;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  bars: any;
  colorArray: any;
  doughnutChart: any;
  lineChart: any;
  names: string[] = [];
  marks: string[] = [];
  color: string[] = [];
  colorH: string[] = [];
private timeoutId: number;
  constructor() {
    console.log(this.student);
   }

  ionViewDidEnter() {
    this.student.forEach(x => {
      this.names.push(x.studName);
      this.marks.push(x.marks);
      this.color.push(x.color);
      this.colorH.push(x.colorH);
    });
    this.createBarChart();
    this.doughnutChartMethod();
    this.lineChartMethod();
  }
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.names,
          datasets: [{
            label: 'Obtained Marks',
            data: this.marks,
            backgroundColor: this.color, // array should have same number of elements as number of dataset
            borderColor: this.colorH, // array should have same number of elements as number of dataset
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.names,
        datasets: [{
          label: 'Student Marks Details',
          data: this.marks,
          backgroundColor: this.color,
          hoverBackgroundColor: this.colorH
        }]
      }
    });
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.names,
        datasets: [
          {
            label: 'Student Marks Details',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.marks,
            spanGaps: false,
          }
        ]
      }
    });
  }
}
