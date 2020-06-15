import { Component, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { SubjectModel } from './subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }
  subjects: [SubjectModel]
  subject;
  subjectArray;

  ngOnInit(): void {
    this.subjectService.getAllSubject()
      .subscribe(subjects => {
        this.subjects = subjects;
      })
    this.subjectService.addedSubject.subscribe(subject => {
      this.subjects.push(subject)
    })
    this.subjectService.updatedSubject.subscribe(updatedSubject => {
      this.subjects.filter((subject, index) => {
        if (subject._id === updatedSubject._id) {
          this.subjects[index].name = updatedSubject.name;
        }
      })
    })
    this.subjectService.deletedSubjectId.subscribe(_id => {
      console.log('id ', _id)
      this.subjects.filter((subject, index) => {
        if (subject._id === _id) {
          this.subjects.splice(index, 1);
        }
      })
    })
  }
  onEditSubject(subject) {
    this.subjectService.startedEditing.next(subject);
  }

}
