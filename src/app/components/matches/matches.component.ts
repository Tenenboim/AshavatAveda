import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductForMatches } from "../../models/product-for-matches";
import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Product } from "../../models/product";
import Swal from "sweetalert2";
//עדיין לא שלחנו מייל בפועל
@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit {
  productId: number;
  product: Product;
  matches: ProductForMatches[] = [];
  addressesProduct: string[] = [];
  s: string;
  allowToSendEmail: boolean = false;
  displayedColumns = ["product", "category", "name", "phone", "email"];
  flag: boolean = false; //משתנה שמציין האם להראות הרבהה פרטים על ההתאמות
  //לפי האם המשתמש הוא מנהל או מוקדן או שההתאמות הם מסוג אבידה
  roleId: number = +localStorage.getItem("RoleId");

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private UserService: UserService
  ) {
    this.product = this.ProductService.product;
    if (this.roleId == 1 || this.roleId == 2 || this.product.LostOrFound)
      this.flag = true;
    this.displayedColumns = [
      "product",
      "category",
      "name",
      "phone",
      "email",
      "description",
      "date",
      "place"
    ];
  }

  ngOnInit() {
    if (this.roleId != 0) this.allowToSendEmail = true;
    if (this.product != null) {
      if (this.product.ProductId)
        this.ProductService.getMatches(this.product.ProductId).subscribe(
          (res: ProductForMatches[]) => {
            if (res) {
              this.matches = res;
              this.findAddress();
            }
          }
        );
      else
        this.ProductService.getMatchesWithoutParameters(this.product).subscribe(
          (res: ProductForMatches[]) => {
            if (res) {
              this.matches = res;
              this.findAddress();
            }
          }
        );
    }
  }
  findAddress() {
    this.matches.forEach(e => {
      if (e.AddressDescription) this.s = e.AddressDescription;
      else
        this.s = this.ProductService.getAddressByCoord(
          e.AddressPointX,
          e.AddressPointY
        );
      this.addressesProduct.push(this.s);
    });
  }

  async sendEmail(Email: string) {
    const { value: formValues } = await Swal.fire({
      title: "שליחת מייל",
      imageUrl: "../../../assets/logo.png",
      imageHeight: 100,
      html:
        '<input id="subject" placeholder="נושא" class="swal2-input">' +
        '<input id="body" placeholder="כתוב הודעה" class="swal2-input">',

      focusConfirm: false,
      preConfirm: () => {
        return [
          Email,
          document.getElementById("subject"),
          document.getElementById("body")
        ];
      }
    });

    if (formValues) {
      this.UserService.sendMail(formValues).subscribe(
        (res: string) => {
          if (res) {
            Swal.fire({
              type: "success",
              title: "המייל נשלח בהצלחה",
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        (err: HttpErrorResponse) => {
          Swal.fire({
            type: "error",
            title: "אופססס",
            text: "שליחת המייל נכשלה"
          });
        }
      );
    }
  }
}
