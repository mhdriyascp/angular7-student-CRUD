import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService, IStudent } from '../student.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  public studentID: string;
  public studentData: IStudent;

  constructor(
    public route: ActivatedRoute,
    private studentService: StudentService
  ) {
    this.studentID = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.studentID)
      .subscribe(
        (student: IStudent) => this.studentData = student
      );
   }

  ngOnInit() {
  }

}
