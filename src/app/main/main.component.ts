import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  vte;
  chart;
  labels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private service: ControlService) { }

  start() {
    this.service.changeState(1).subscribe();
  }

  stop() {
    this.service.changeState(0).subscribe();
  }

  getTemp() {
    this.service.getTemp().subscribe(
      (data: {"ambient": number, "object_1": number}) => {
        let currentTime = this.getDate();
        this.vte = data.object_1;
        this.addData(data.object_1, currentTime);
      },
      error => console.log(`getTemp error: `, error.message)
    );
  }

  ngOnInit(): void {
    this.drawChart();
    // setInterval(() => {console.log("23423234"), 5000});
    setInterval(() => {
      this.getTemp();
    }, 1000);

  }

  getDate() {
    let currentdate = new Date();
    let currentTime = currentdate.getHours().toString().padStart(2, '0') + ":" + currentdate.getMinutes().toString().padStart(2, '0') + ":" + currentdate.getSeconds().toString().padStart(2, '0');
    return currentTime;
  }

  updateChart() {
    let currentTime = this.getDate();
    let newValue = Math.floor(Math.random()*30);
    this.vte = newValue;
    this.addData(newValue, currentTime);
  }

  addData(data, currentTime) {

    this.removeData();

    this.chart.data.labels.push(currentTime);

    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });

    this.chart.update();
  }


  removeData() {
    this.chart.data.labels.shift();
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
    this.chart.update();
  }

  drawChart() {
    var ctx = document.getElementById('myChart');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Vital Graph',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            display: true,
            stacked: true,
            ticks: {
              min: 0, // minimum value
              max: 40, // maximum value
              stepSize: 5
            }
          }],
          xAxes: [{
            autoSkip: false,
            maxRotation: 180,

          }],
          y: {
            beginAtZero: true,
          }
        }
      }
    });

  }

}
