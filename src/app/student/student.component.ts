import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService) { }
  students: [Student]
  student;
  subjectArray;

  ngOnInit(): void {
    this.studentService.getAllStudents()
      .subscribe((students:[Student])=> {
        this.students = students;
        console.log('Students ', students)
      })
    this.studentService.addedStudent.subscribe(student => {
      this.students.push(student)
    })
    this.studentService.updatedStudent.subscribe(updatedStudent => {
      this.students.filter((student, index) => {
        if (student._id === updatedStudent._id) {
          this.students[index].name = updatedStudent.name;
          this.students[index].subjects = updatedStudent.subjects;
          this.students[index].imagePath=updatedStudent.imagePath
        }
      })
    })
    this.studentService.deletedStudentId.subscribe(_id => {
      console.log('id ', _id)
      this.students.filter((student, index) => {
        if (student._id === _id) {
          this.students.splice(index, 1);
        }
      })
    })
  }
  onEditStudent(student) {
    this.studentService.startedEditing.next(student);
  }

}
