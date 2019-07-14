import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Employee Management';
  employees: [] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('init');
    this.dataService.getEmployees().subscribe(res => {
      console.log(res);
      this.employees = res.data
    });
  }
}
