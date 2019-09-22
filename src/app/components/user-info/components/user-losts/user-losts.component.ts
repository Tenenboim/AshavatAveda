import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { User } from '../../../../models/user';
import { Product } from '../../../../models/product';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-losts',
  templateUrl: './user-losts.component.html',
  styleUrls: ['./user-losts.component.css']
})
export class UserLostsComponent implements OnInit {
  user: User = new User();
  losts: Product[] = [];
  displayColumns = ["name", "description", "date", "edit", "matches"];
  constructor(route: ActivatedRoute, private ProductService: ProductService
    , private router: Router) {
    route.parent.params.subscribe(params => {
      this.user.UserId = params['userId'];
    });
  }
  ngOnInit() {
    this.ProductService.getLosts(this.user.UserId).subscribe((res: Product[]) => {
      if (res != null) {
        this.losts = res;
        if (this.losts.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'אופססס',
            text: 'אין לך אבידות!'
          })
        }
      }
    }, (err: HttpErrorResponse) => {

    });
  }
  showMatches(product: Product) {
    this.ProductService.product = product;
    this.router.navigate(['/matches']);
  }

}
