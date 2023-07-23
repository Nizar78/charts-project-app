import { Component } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
import { Tutorial } from '../Tutorial';
import { TutorialService } from '../tutorial.service';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private tutorialService: TutorialService) { }


  tutorials: Tutorial[] = []

  ngOnInit():void{
    this.tutorialService.getTutorials().subscribe((data: Tutorial[]) => {
      this.tutorials= data["content"];
      this.RenderChart(this.tutorials);

      //console.log(this.tutorials);
    });

  }


  RenderChart(tutorials:Tutorial[]){
    console.log(tutorials);

    const publishedTutorials = tutorials.filter(item => item.published == true);
    const notPublishedTutorials = tutorials.filter(item => item.published != true);
    console.log(publishedTutorials + "--");

    const MyPieChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ['Published', 'Not Published'],
        datasets: [
          {
            data: [publishedTutorials.length, notPublishedTutorials.length],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'], // Adjust the bubble colors
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });

    const publishedCount = tutorials.filter(item => item.published).length;
    const notPublishedCount = tutorials.filter(item => !item.published).length;
    
    const MyStackedChart = new Chart("stackedChart", {
      type: 'bar',
      data: {
        labels: ['Tutorials'],
        datasets: [
          {
            label: 'Published',
            data: [publishedCount],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)'
          },
          {
            label: 'Not Published',
            data: [notPublishedCount],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor:'rgba(54, 162, 235, 1)'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        indexAxis: 'y', // Display bars horizontally
        responsive: true,
        plugins: {
          legend: {
            position: 'right', // Position the legend on the right side
          },
          title: {
            display: true,
            text: 'Published vs. Not Published Tutorials',
          },
        },
        scales: {
          x: {
            stacked: true // Enable stacking for X-axis (optional)
          },
          y: {
            stacked: true // Enable stacking for Y-axis
          }
        }
      }
    });
    

    const publishedcount = tutorials.filter(item => item.published).length;
    const notPublishedcount = tutorials.filter(item => !item.published).length;
    
    const bubbleData = [
      {
        x: 1.4, // Dummy X-coordinate for the first bubble
        y: 1, // Dummy Y-coordinate for the first bubble
        r: publishedcount * 10 // Adjust the bubble size based on the count of published tutorials
      },
      {
        x: 2, // Dummy X-coordinate for the second bubble
        y: 1, // Dummy Y-coordinate for the second bubble
        r: notPublishedcount * 10 // Adjust the bubble size based on the count of not published tutorials
      }
    ];
    
    const MyBubbleChart = new Chart("bubbleChart", {
      type: 'bubble',
      data: {
        datasets: [
          {
            data: bubbleData,
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'], // Adjust the bubble colors
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Bubble Chart - Published vs. Not Published Tutorials',
          },
        },
        scales: {
          x: {
            display: true, // Hide X-axis labels
          },
          y: {
            display: true, // Hide Y-axis labels
          }
        }
      }
    });


  }

}
