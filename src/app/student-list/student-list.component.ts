import { Component, OnInit } from '@angular/core';

import { StudentService, IStudent, IResponse } from '../student.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  public allStudents: Object;

  constructor(private studentService: StudentService) {
    this.studentService.getAllStudents().subscribe(
      (response: any) => {
        this.allStudents = response.data;
      }
    );
  }

  ngOnInit() {
  }

  /**
   * Delete button click event
   * @param student Student Data
   */
  onDeleteStudentClick(student: IStudent) {
    const isDelete = confirm('Are you sure to delete ' + student.name);
    if (isDelete) {
      this.studentService.deleteStudent(student._id).
        subscribe(
          (students: IStudent[] | IStudent) => this.allStudents = students
        );
    }
  }

}
