import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentService, IStudent } from '../student.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  public studentSubscription$: Observable<IStudent | IStudent[]>;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.studentSubscription$ = this.studentService.getStudent(id);
  }

  /**
   * Update student data, when called
   */
  onFormSubmit(studentData: IStudent) {
    this.studentService.updateStudent(studentData).subscribe(
      (Response) => {
        // Redirect to student listing page after update
        this.router.navigate(['/students'])
      }
    );
  }

}
