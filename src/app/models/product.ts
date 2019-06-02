export class Product {
    ProductId:number;
    UserId:number;
    CategoryId:number;
    ProductName:String;
    ProductDescription:String;
    AddressPointX:number;
    AddressPointY:number;
    DateFound:Date;
    LostOrFound:boolean;
    WasDone:boolean;
    CleverAgent:boolean;
    
    constructor(ProductId?,UserId?,CategoryId?,ProductName?,ProductDescription?,AddressPointX?,AddressPointY?,DateFound?,LostOrFound?,WasDone?,CleverAgent?) {
      this.ProductId=ProductId,
      this.UserId=UserId,
      this.CategoryId=CategoryId,
      this.ProductName=ProductName,
      this.ProductDescription=ProductDescription,
      this.AddressPointX=AddressPointX,
      this.AddressPointY=AddressPointY,
      this.DateFound=DateFound,
      this.LostOrFound=LostOrFound,
      this.WasDone=WasDone,
      this.CleverAgent=CleverAgent
    }
}
