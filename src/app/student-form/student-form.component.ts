import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IStudent } from '../student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  // Input property to receives student subscription data from edit page(parent)
  // https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding
  // Note: variables used for storing observables are ending a $ sign. its just for identification
  @Input() studentSub$: Observable<IStudent>;

  // Action Type passed by the parent to recognize the action
  // The value will be either 'create' or 'update'
  @Input() actionType: string;

  /**
   * Creating Reactive Form
   * https://angular.io/guide/reactive-forms#introduction-to-reactive-forms
   * https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public studentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(5), // Min age
      Validators.max(20) // Max age
    ]),
    dob: new FormControl('', [Validators.required]),
    _id: new FormControl('')
  });

  // Output property to pass data to the parent component(creat and edit)
  // https://angular.io/guide/component-interaction#parent-listens-for-child-event
  @Output() public studentFormData = new EventEmitter<IStudent>();

  /**
   * To store the initial student state on edit functionality
   */
  private studentData: {
    _id: string,
    name: string,
    age: number,
    dob: string
  };

  constructor() { }

  /**
   * JavaScript getter function
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
   */
  get name() { return this.studentForm.get('name'); }
  get age() { return this.studentForm.get('age'); }
  get dob() { return this.studentForm.get('dob'); }
  get _id() { return this.studentForm.get('_id'); }

  /**
   * Student form submit event
   */
  onStudentFormSubmit() {
    // emit function will pass the current form data to the parent component(create/delete)
    // https://angular.io/api/core/EventEmitter
    this.studentFormData.emit(this.studentForm.value);
  }

  ngOnInit() {
    // studentSub is an output property and has an observable as its value
    // The variable name has $ symbol to identify that its an observable
    if (this.studentSub$ && this.actionType == 'update') {
      this.studentSub$.subscribe(
        (student: IStudent) => {
          this.studentForm.patchValue({
            name: student.name,
            age: student.age,
            dob: student.dob,
            _id: student._id
          });
          this.studentData = this.studentForm.value;
        }
      );
    }
  }

  /**
   * To reset student form
   */
  resetForm() {
    if (this.actionType == 'update') {
      this.studentForm.reset(this.studentData);
    } else {
      this.studentForm.reset();
    }
  }

}
