import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Faculty } from './Faculty.model';
import { tap } from 'rxjs/operators'

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  addedFaculty = new Subject<Faculty>();
  Faculties: [Faculty];
  updatedFaculty = new Subject<Faculty>();
  startedEditing = new Subject<Faculty>();
  deletedFacultyId = new Subject()
  constructor(private httpClient: HttpClient) {
  }
  getAllFaculties() {
    return this.httpClient.get<[Faculty]>(BACKEND_URL + '/faculty')
      .pipe(tap(faculties => {
        this.Faculties = faculties
      }))
  }
  addFaculty(name: string, subjects: string) {
    const subjectsArray = subjects.split(',');
    console.log('subjects Array', subjectsArray)
    console.log('subscribe out')
    this.httpClient.post<Faculty>(BACKEND_URL + '/faculty', { name: name, subjects: subjectsArray })
      .subscribe(faculty => {
        console.log('subscribe in')
        this.addedFaculty.next(faculty)
      })
  }
  updateFaculty(_id: string, name: string, subjects: string) {
    const subjectsArray = subjects.split(',');
    console.log('subjects Array in update', subjectsArray)
    this.httpClient.put<Faculty>(BACKEND_URL + '/faculty/' + _id, { name: name, subjects: subjectsArray })
      .subscribe(faculty => {
        this.updatedFaculty.next(faculty)
      })
  }
  deleteFaculty(_id: string) {
    this.httpClient.delete(BACKEND_URL + '/Faculty/' + _id)
      .subscribe(result => {
        this.deletedFacultyId.next(_id);
      })
  }
}
