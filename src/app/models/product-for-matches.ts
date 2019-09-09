export class ProductForMatches {
constructor(
public ProductId ?:number ,
public UserName?: string, 
public CategoryName?:string, 
public ProductName?:string , 
public ProductDescription?:string, 
public AddressPointX ?:number,
public AddressPointY ?:number,
public AddressDescription?:string,
public DateFound?:Date,
public LostOrFound ?:boolean,
public UserPhone?: string,
public UserEmail?: string
){}
}
