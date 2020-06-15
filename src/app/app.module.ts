import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { FacultyComponent } from './faculty/faculty.component';
import { SubjectComponent } from './subject/subject.component';
import { HeaderComponent } from './header/header.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FacultyEditComponent } from './faculty/faculty-edit/faculty-edit.component';
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    FacultyComponent,
    SubjectComponent,
    HeaderComponent,
    StudentEditComponent,
    FacultyEditComponent,
    SubjectEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
