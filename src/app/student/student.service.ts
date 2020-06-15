import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Student } from './student.model';
import { tap } from 'rxjs/operators'

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  addedStudent = new Subject<Student>();
  students: [Student];
  updatedStudent = new Subject<Student>();
  startedEditing = new Subject<Student>();
  deletedStudentId = new Subject()
  constructor(private httpClient: HttpClient) {
  }
  getAllStudents() {
    return this.httpClient.get<[Student]>(BACKEND_URL + '/student')
      .pipe(tap(students => {
        this.students = students
      }))
  }
  addStudent(name: string, subjects: string, image: File) {
    const subjectsArray = subjects.split(',');
    console.log('image in add', image)

    const postData = new FormData();
    postData.append("name", name);
    postData.append("subjects", JSON.stringify(subjectsArray));
    postData.append("image", image);

    console.log('subjects Array', subjectsArray)
    this.httpClient.post<Student>(BACKEND_URL + '/student', postData)
      .subscribe(student => {
        this.addedStudent.next(student)
      })
  }
  updateStudent(_id: string, name: string, subjects: string, image:File) {
    const subjectsArray = subjects.split(',');
    console.log('image in update', image)
    const postData = new FormData();
    postData.append("name", name);
    postData.append("subjects", JSON.stringify(subjectsArray));
    postData.append("image", image);

    this.httpClient.put<Student>(BACKEND_URL + '/student/' + _id, postData)
      .subscribe(student => {
        this.updatedStudent.next(student)
      })
  }
  deleteStudent(_id: string) {
    this.httpClient.delete(BACKEND_URL + '/student/' + _id)
      .subscribe(result => {
        this.deletedStudentId.next(_id);
      })
  }
}
