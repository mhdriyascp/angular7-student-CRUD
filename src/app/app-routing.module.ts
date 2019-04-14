import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'students', pathMatch: 'full'}, // To redirect / to students route
  {path: 'students', component: StudentListComponent}, // To List all students
  {path: 'create-student', component: StudentCreateComponent}, // To Create student
  {path: 'edit-student/:id', component: StudentEditComponent}, // To Edit student
  {path: 'student/:id', component: StudentViewComponent}, // To view a student details
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
