import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, IStudent, IResponse } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  /**
   * Create student data, when called
   */
  onFormSubmit(studentData: IStudent) {
    this.studentService.createStudent(studentData)
      .subscribe(
        (response: IResponse) => {
          if (response.status) { // Redirect user to listing
            this.router.navigate(['/students']);
          } else { // Show error message
            alert(response.message);
          }
        }
      );
  }

}
