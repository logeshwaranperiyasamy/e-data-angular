import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private actionUrl: string;

  constructor(private http: HttpClient, private config: Configuration) {
    this.actionUrl = config.server + config.apiUrl;
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.actionUrl);
  }
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req);
  }
}