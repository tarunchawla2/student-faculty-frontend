import { Component, OnInit } from '@angular/core';
import { Faculty } from './faculty.model';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  constructor(private facultyService: FacultyService) { }
  faculties: [Faculty]
  faculty;
  subjectArray;

  ngOnInit(): void {
    this.facultyService.getAllFaculties()
      .subscribe(faculties => {
        this.faculties = faculties;
      })
    this.facultyService.addedFaculty.subscribe(faculty => {
      this.faculties.push(faculty)
    })
    this.facultyService.updatedFaculty.subscribe(updatedFaculty => {
      console.log('updated faculty ', updatedFaculty)
      this.faculties.filter((student, index) => {
        if (student._id === updatedFaculty._id) {
          this.faculties[index].name = updatedFaculty.name;
          this.faculties[index].subjects = updatedFaculty.subjects;
        }
      })
    })
    this.facultyService.deletedFacultyId.subscribe(_id => {
      console.log('id ', _id)
      this.faculties.filter((student, index) => {
        if (student._id === _id) {
          this.faculties.splice(index, 1);
        }
      })
    })
  }
  onEditFaculty(faculty) {
    this.facultyService.startedEditing.next(faculty);
  }
}
