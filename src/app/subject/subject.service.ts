import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { SubjectModel } from './subject.model';

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  addedSubject = new Subject<SubjectModel>();
  subjects: [SubjectModel];
  updatedSubject = new Subject<SubjectModel>();
  startedEditing = new Subject<SubjectModel>();
  deletedSubjectId = new Subject()
  constructor(private httpClient: HttpClient) {
  }
  getAllSubject() {
    return this.httpClient.get<[SubjectModel]>(BACKEND_URL + '/subject')
      .pipe(tap(subjects => {
        this.subjects = subjects
      }))
  }
  addSubject(name: string) {
    this.httpClient.post<SubjectModel>(BACKEND_URL + '/subject', { name: name })
      .subscribe(subject => {
        this.addedSubject.next(subject)
      })
  }
  updateSubject(_id: string, name: string) {
    this.httpClient.put<SubjectModel>(BACKEND_URL + '/subject/' + _id, { name: name })
      .subscribe(subject => {
        this.updatedSubject.next(subject)
      })
  }
  deleteSubject(_id: string) {
    this.httpClient.delete(BACKEND_URL + '/subject/' + _id)
      .subscribe(result => {
        this.deletedSubjectId.next(_id);
      })
  }
}
