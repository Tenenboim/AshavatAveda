import { Component, OnInit } from '@angular/core';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from '../../models/parameter';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {

  parameters: Parameter[] = [];
  categories: Category[] = [];
  categoryNameOfParameter: String[] = [];
  RoleId: number = +localStorage.getItem('RoleId');

  constructor(private ParameterService: ParameterService, private CategoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();

  }

  getCategories() {
    this.CategoryService.getAllAllCategories().subscribe((res: Category[]) => {
      if (res != null) {
        this.categories = res;
        this.getParameters();
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);

    });
  }

  getCategoriesNames() {
    this.parameters.forEach(param => {
      param["Category"] = this.categories.find(f => f.CategoryId == param.CategoryId);
    });
  }

  getParameters() {
    this.ParameterService.getAllParameters().subscribe((res: Parameter[]) => {
      if (res != null) {
        this.parameters = res;
        this.getCategoriesNames();
      }
      // this.parameters.forEach(p=>this.categoryNameOfParameter.push();
    }, (err: HttpErrorResponse) => {
      Swal.fire({
        type: 'error',
        title: 'אין פרמטרים!',
        text: 'הוסף בעצמך!',
      })
    });
  }

  deleteParameter(Parameter: Parameter) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: 'אתה בטוח במחיקה?',
      //text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן מחק!',
      cancelButtonText: 'לא סגור!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.ParameterService.deleteParameter(Parameter.ParameterId).subscribe((res: any) => {
          if (res != null) {
            swalWithBootstrapButtons.fire(
              'נמחק!',
              'הפרמטר נמחק בהצלחה!',
              'success'
            )
           this.parameters= this.parameters.filter(p=>p.ParameterId!=Parameter.ParameterId)
          }
        }, (err: HttpErrorResponse) => {
          Swal.fire({
            type: 'error',
            title: 'אופס...',
            text: 'המחיקה נכשלה! נסה בפעם אחרת'
          })
    
        });
        
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'בוטל',
          'המחיקה בוטלה בהצלחה',
          'error'
        )
      }
    })
  }
}
