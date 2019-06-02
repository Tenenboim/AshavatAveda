

export class User {
    UserId:number;
    UserFullName:String;
    UserAddress:String;
    UserEmail:String;
    UserPhone:String;
    UserPassword:String;
    UserRecognizeName:string;
    RoleId:number;
    
    constructor(UserId?,UserFullName?,UserAddress?,UserEmail?,UserPhone?,UserPassword?,UserRecognizeName?,RoleId?) {
      this.UserId=UserId,
      this.UserFullName=UserFullName,
      this.UserAddress=UserAddress,
      this.UserEmail=UserEmail,
      this.UserPhone=UserPhone,
      this.UserPassword=UserPassword,
      this.UserRecognizeName=UserRecognizeName,
      this.RoleId=RoleId;
    }
    
    
}
