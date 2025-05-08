import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
 courselist: Course[]=[];
 filteredCourses: Course[]=[];
 filterValue: String="";

 constructor(private courseservice: CourseService){}

 ngOnInit() {
  this.courseservice.getCourses().subscribe(data => {
    this.courselist=data;
    this.filteredCourses=data;
  })
 }

filterCourses():void {
  try {
  this.filteredCourses=this.courselist.filter((course) => 
    course.code.toLowerCase().includes(this.filterValue.toLowerCase())||course.coursename.toLowerCase().includes(this.filterValue.toLowerCase())||course.progression.toLowerCase().includes(this.filterValue.toLowerCase()))
}
catch (error) {
  console.error;

}
}

sortCodes():void {
  this.filteredCourses.sort((a, b) => a.code > b.code ? 1 : -1);

}

sortNames() {
  this.filteredCourses.sort((a, b) => a.coursename > b.coursename ? 1 : -1);
 
}

sortProgressions() {
  this.filteredCourses.sort((a, b) => a.progression > b.progression ? 1 : -1);
  
}
}
