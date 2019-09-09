import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ProductForMatches} from '../../models/product-for-matches';
import{ProductService} from '../../services/product.service';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
productId:number;
matches:ProductForMatches[]=[];
flag=0;//משתנה שמציין האם להראות הרבהה פרטים על ההתאמות
//לפי האם המשתמש הוא מנהל או מוקדן או שההתאמות הם מסוג אבידה
roleId:number=+localStorage.getItem("RoleId");
  constructor(private route: ActivatedRoute,private ProductService:ProductService) { 
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
  }

  ngOnInit() {
    this.ProductService.getMatches(this.productId).subscribe((res:ProductForMatches[])=>{
      if(res)
      {
        if(this.roleId==1||this.roleId==2||res.length>0&&res[0].LostOrFound==true)
        this.flag=1;
        this.matches=res;
      }
    })
  }

}
