import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  userId: number;
  roleId: number = +localStorage.getItem("RoleId");
  userName: string = localStorage.getItem("UserName");
  constructor(
    private route: ActivatedRoute,
    private UserService: UserService,
    private ProductService: ProductService,
    private router: Router
  ) {
    route.params.subscribe(params => {
      this.userId = params["userId"];
    });
  }

  ngOnInit() {}
  directToAddProduct() {
    this.ProductService.userOfTheProduct = this.userId;
    this.router.navigate(["/product"]);
  }
}
