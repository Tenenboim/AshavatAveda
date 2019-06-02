export class Category {
    CategoryId:number;
    CategoryName:String;
    ParentId:number;
    constructor(CategoryId?,CategoryName?,ParentId?)
    {
        this.CategoryId=CategoryId;
        this.CategoryName=CategoryName;
        this.ParentId=ParentId;
    }
}
