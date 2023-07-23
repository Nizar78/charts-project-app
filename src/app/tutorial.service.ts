import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from './Tutorial';
import { Observable ,of} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import {HttpRequest,HttpResponse, HttpEvent,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


// We will use this service to get tutorials from API

@Injectable({
  providedIn: 'root'
})

export class TutorialService {
  tutorials:Tutorial[]=[];
  progress:number = 1;
  username:String="";
  password:String="";
  authenticated: boolean = false;
  message:String="";

  private authenticatedUser: any = null;

  private baseUrl = "http://localhost:8080/api/csv";
  private localStorageKey = "authenticatedUser";

  constructor(private http: HttpClient,private router:Router ) {
    const storedUser = localStorage.getItem(this.localStorageKey);
    if (storedUser) {
      this.authenticatedUser = JSON.parse(storedUser);
      this.authenticated = true;
      this.username = this.authenticatedUser.username;
      this.password = this.authenticatedUser.password;
      console.log(this.username)
    }
  
  } 

  getTutorials(): Observable<Tutorial[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
    

    return this.http.get<Tutorial[]>(`${this.baseUrl}/tutorials`, { headers: headers });
  }
  getTutorialById(tutorialId: number):Observable<any>{
    console.log(this.username)

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
    return this.http.get(`${this.baseUrl+ "/tutorials/"}${tutorialId}`, { headers: headers });
  }
  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
    return this.http.get(`${this.baseUrl+ "/delete?id="}${id}`, {responseType: 'text',headers: headers }); 
  }
  updateTutorial(tutorial: Tutorial): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
    return this.http.post(`${this.baseUrl+ "/update/"}${tutorial.id}`,tutorial, { headers: headers });
  }
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
       headers: headers
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  getPage(page:number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });

    return this.http.get(`${this.baseUrl+ "/tutorials?page="}${page}`, { headers: headers }); 


  }
  authenticate(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.get(`${this.baseUrl}/index`, { headers: headers, observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.authenticatedUser = { username: username ,password:password};
            this.authenticated = true;
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.authenticatedUser));
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Authentication failed:', error);
          this.message = "Authentication failed";
          return of(false);
        })
      );
  }

  getAuthenticatedUser(): any {
    return this.authenticatedUser;
  }
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout(): void {
    this.authenticatedUser = null;
    localStorage.removeItem(this.localStorageKey);
    window.location.reload();



  }
  setCredentials(username: string, password: string) {
    this.username = username;
    this.password = password;
  }


  singup(username:String,password:String){

    const data = {'username' :username,'password' :password ,'role':"USER"};
   
    return this.http.post(`${this.baseUrl+ "/addUser/"}`,data);

  }
  
 
}
 



