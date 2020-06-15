
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectModel } from '../subject.model';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  subjectForm: FormGroup;
  editMode = false;
  manipSubjects;
  editedSubject: SubjectModel;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    })
    this.subjectService.startedEditing.subscribe(subject => {
      this.editedSubject = subject;
      this.editMode = true;
      this.subjectForm.setValue({
        name: subject.name,
      })
    })
  }
  onSubmit() {
    const name = this.subjectForm.value.name;
    if (!this.editMode) {
      this.subjectService.addSubject(name);
      this.subjectForm.reset()
    } else {
      this.subjectService.updateSubject(this.editedSubject._id, name);
      this.subjectForm.reset()
    }
    this.editMode = false
  }
  onDelete() {
    this.subjectService.deleteSubject(this.editedSubject._id);
    this.subjectForm.reset()
    this.editMode = false;
  }
  onClear() {
    this.subjectForm.reset()
    this.editMode = false;
  }
}
