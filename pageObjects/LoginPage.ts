import { Locator, Page } from "@playwright/test";

export class LoginPage{

page:Page;
signInButton:Locator;
userName:Locator;
password:Locator;
homePageProducts:Locator;

constructor(page:Page)
{
    this.page=page;
    this.signInButton = page.locator("[value='Login']");
  
    this.userName =  page.locator("#userEmail");
    
    this.password =  page.locator("#userPassword");
    this.homePageProducts = page.locator("[class='card-body']");
}

async goTo():Promise<void>
{
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

}

async validLogin(userName:string,password:string):Promise<void>
{
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.homePageProducts.first().waitFor({state:'visible'});

}






}