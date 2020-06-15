import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Faculty } from '../faculty.model';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./faculty-edit.component.css']
})
export class FacultyEditComponent implements OnInit {
  facultyForm: FormGroup;
  editMode = false;
  manipSubjects;
  editedFaculty: Faculty;

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.facultyForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      subjects: new FormControl(null, Validators.required)
    })
    this.facultyService.startedEditing.subscribe(faculty => {
      this.editedFaculty = faculty;
      this.manipSubjects = faculty.subjects.map(subject => subject.name).join(',')
      this.editMode = true;
      this.facultyForm.setValue({
        name: faculty.name,
        subjects: this.manipSubjects
      })
    })
  }
  onSubmit() {
    const name = this.facultyForm.value.name;
    const subjects = this.facultyForm.value.subjects;
    console.log('onsubmit')
    if (!this.editMode) {
      this.facultyService.addFaculty(name, subjects);
      this.facultyForm.reset()
    } else {
      this.facultyService.updateFaculty(this.editedFaculty._id, name, subjects);
      this.facultyForm.reset()
    }
    this.editMode = false
  }
  onDelete() {
    this.facultyService.deleteFaculty(this.editedFaculty._id);
    this.facultyForm.reset()
    this.editMode = false;
  }
  onClear() {
    this.facultyForm.reset()
    this.editMode = false;
  }
}
