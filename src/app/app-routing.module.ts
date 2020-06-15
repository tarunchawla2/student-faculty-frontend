import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from 'src/app/student/student.component';
import { FacultyComponent } from 'src/app/faculty/faculty.component';
import { SubjectComponent } from 'src/app/subject/subject.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/subject', pathMatch: 'full' },
  { path: 'student', component: StudentComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'subject', component: SubjectComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
