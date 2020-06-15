import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  editMode = false;
  manipSubjects;
  editedStudent: Student;
  imagePreview='';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      subjects: new FormControl(null, Validators.required),
      image: new FormControl(null)
    })
    this.studentService.startedEditing.subscribe(student => {
      this.editedStudent = student;
      this.manipSubjects = student.subjects.map(subject => subject.name).join(',')
      this.editMode = true;
      this.studentForm.patchValue({
        name: student.name,
        subjects: this.manipSubjects,
      })
      this.imagePreview=student.imagePath
    })
  }
  onSubmit() {
    const name = this.studentForm.value.name;
    const subjects = this.studentForm.value.subjects;
    const image = this.studentForm.value.image;
    console.log('Image ', image)
    if (!this.editMode) {
      this.studentService.addStudent(name, subjects, image);
      this.studentForm.reset()
    } else {
      this.studentService.updateStudent(this.editedStudent._id, name, subjects, image);
      this.studentForm.reset()
    }
    this.editMode = false;
    this.imagePreview=''
  }
  onDelete() {
    this.studentService.deleteStudent(this.editedStudent._id);
    this.studentForm.reset()
    this.editMode = false;
    this.imagePreview=''
  }
  onClear() {
    this.studentForm.reset()
    this.editMode = false;
    this.imagePreview=''
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.studentForm.patchValue({ image: file });
    this.studentForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.studentForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
