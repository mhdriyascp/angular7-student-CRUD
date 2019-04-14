import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IResponse {
  status: boolean;
  message: string;
  data: IStudent | IStudent[];
}

export interface IStudent {
  name: string;
  age: number;
  dob: string;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private serviceUrl = 'http://localhost:3300/';

  constructor(private http: HttpClient) { }

  /**
   * Get all student data
   */
  getAllStudents() {
    const url = this.serviceUrl + 'students';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.get(url, httpOptions);
  }

  /**
   * Get a student data by id
   * @param id Student ID
   */
  getStudent(id: string): Observable<IStudent | IStudent[]> {
    const url = this.serviceUrl + 'student/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.get(url, httpOptions)
      .pipe(
        map(
          (response: IResponse) => response.data
        )
      );
  }

  /**
   * Create Student
   * @param studentData Student Data
   */
  createStudent(studentData: IStudent) {
    const url = this.serviceUrl + 'student';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<IResponse>(url, studentData, httpOptions);
  }

  /**
   * Create Student
   * @param studentData Student Data
   */
  updateStudent(studentData: IStudent) {
    if (studentData._id.length) {
      const url = this.serviceUrl + 'student/' + studentData._id;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      return this.http.put<IResponse>(url, studentData, httpOptions);
    }
  }

  /**
   * Delete Student
   * @param id Student ID
   */
  deleteStudent(id: string) {
    const url = this.serviceUrl + 'student/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    // Sequential HTTP calls
    // https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
    return this.http.delete<IResponse>(url, httpOptions)
      .pipe(
        mergeMap(
          (response: IResponse) => this.getAllStudents()
            .pipe(
              map(
                (res: IResponse) => res.data
              )
            )
        )
      );
  }
}
