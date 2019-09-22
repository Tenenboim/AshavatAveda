
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-every-one-options",
  templateUrl: "./every-one-options.component.html",
  styleUrls: ["./every-one-options.component.css"]
})
export class EveryOneOptionsComponent implements OnInit {
  public roleId: number = +localStorage.getItem("RoleId");
  userId: number;
  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.userId = params["userId"];
    });
  }

  ngOnInit() {}
}
