import { Component, OnInit } from '@angular/core';
import {Category} from 'src/app/models/category';
import {CategoryService} from 'src/app/services/category.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
category:Category=new Category();
categories:Category[]=[];
  constructor(private CategoryService:CategoryService,private router:Router) { }
  OnAddCategory()
  {
    if(this.category.ParentId==-1)
    this.category.ParentId=null;
    this.CategoryService.AddCategory(this.category).subscribe((res:Category)=>{
      if(res)
      {
        console.log(res);
        this.router.navigate(['/category']); 
      }
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
  }
    );
}

  ngOnInit() {

    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      if (res != null) {

        this.categories = res;
        // if (this.categories != null)
        //   this.mainCategoryID = this.categories[0].CategoryId;
        // this.onCategoryChanged(true);

      }
    }, (err: HttpErrorResponse) => {
    });
    //השורה הבאה גורמת שבהתחלה יהיה בחר בסלקט של האב קטגוריה
    this.category.ParentId=-1;
  }

}
