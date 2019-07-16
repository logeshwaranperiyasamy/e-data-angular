import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DataService } from '../../data.service';
import { EmployeeComponent } from '../employee/employee.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Employee } from '../employee/employee.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  employees: Employee[];
  dataSource;
  displayedColumns: string[];
  columnNames: any[];

  constructor(private dataService: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.employees = [];
    this.dataSource = new MatTableDataSource(this.employees);
    this.displayedColumns = [
      'position',
      'name',
      'id',
      'action'
    ];
    this.columnNames = [{
      id: 'position',
      value: 'S.No'
    }, {
      id: 'name',
      value: 'Name'
    }, {
      id: 'id',
      value: 'ID'
    }, {
      id: 'action',
      value: 'Action'
    }];

    this.getEmployees();
  }

  refreshList(data: Employee[]) {
    this.employees = data;
    this.dataSource = new MatTableDataSource<Employee>(this.employees);
    this.dataSource.paginator = this.paginator;
  }

  getEmployees() {
    this.dataService.getEmployees().subscribe(res => this.refreshList(res));
  }

  onChange(data: Employee) {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '235px',
      disableClose: true,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEmployee(result);
      }
    });
  }

  onRemove(data: Employee) {
    this.dataService.removeEmployee(data).subscribe(res => {
      this.snackBar.open('Removed Successfully.', 'x');
      this.refreshList(res);
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '235px',
      disableClose: true,
      data: {
        id: Math.floor(Math.random() * 999999),
        name: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEmployee(result);
      }
    });
  }

  addEmployee(data: Employee) {
    this.dataService.addEmployee(data).subscribe(res => {
      this.snackBar.open('Added Successfully.', 'x');
      this.refreshList(res);
    });
  }

  updateEmployee(data: Employee) {
    this.dataService.updateEmployee(data).subscribe(res => {
      this.snackBar.open('Updated Successfully.', 'x');
      this.refreshList(res);
    });
  }
}
