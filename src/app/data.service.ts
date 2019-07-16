import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Configuration } from './app.constants';
import { Employee } from './components/employee/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private actionUrl: string;

  constructor(private http: HttpClient, private config: Configuration) {
    this.actionUrl = config.server + config.apiUrl;
  }

  addEmployee(data: Employee): Observable<any> {
    return this.http.post(this.actionUrl, data);
  }

  removeEmployee(data: Employee): Observable<any> {
    return this.http.delete(this.actionUrl + `/${data.id}`);
  }

  updateEmployee(data: Employee): Observable<any> {
    return this.http.put(this.actionUrl, data);
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.actionUrl);
  }
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private employees: Employee[] = [];
  private actionUrl: string;

  constructor(private config: Configuration) {
    this.actionUrl = config.server + config.apiUrl;

    for (let i = 1; i <= 100; i++) {
      this.employees.push({
        id: Math.floor(Math.random() * 999999),
        name: `Emp ${i}`,
        action: ''
      });
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.config.mockServer) {
      let data;

      switch (req.method) {
        case 'GET': {
          if (req.params.has('id')) {
            data = this.employees.find(x => x.id.toString() === req.params.get('id')); break;
          } else {
            data = this.employees; break;
          }
        }
        case 'POST': {
          this.employees.push(req.body);
          data = this.employees; break;
        }
        case 'PUT': {
          this.employees[this.employees.findIndex(emp => emp.id.toString() === req.params.get('id'))] = req.body;
          data = this.employees; break;
        }
        case 'DELETE': {
          const index = this.employees.findIndex(emp => emp.id.toString() === req.urlWithParams.split('employee/')[1]);

          if (index > -1) {
            this.employees.splice(index, 1);
          }

          data = this.employees; break;
        }
        default: {
          data = this.employees; break;
        }
      }

      return of(new HttpResponse({ status: 200, body: data }));
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req);
  }
}
