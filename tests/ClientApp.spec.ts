import {Locator, test,expect} from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { DashBoardPage } from "../pageObjects/DashBoardPage";
import { CartPage } from "../pageObjects/CartPage";
import { OrdersReviewPage } from "../pageObjects/OrdersReviewPage";
import  {OrdersHistoryPage} from  "../pageObjects/OrdersHistoryPage";

test.only("Client App Login",async({page})=>{


const productName = "ZARA COAT 3";
 
const countryDropdown:Locator = page.locator(".ta-results button span");
const grey_email:Locator = page.locator("[style*='gray']"); 
const place_order:Locator = page.locator("[class*='action__submit']");
const creditCard:Locator = page.locator("[class='input txt text-validated']")
const cvvCode:Locator = page.locator("[class='input txt']");
 
const orderSuccessMessage:Locator = page.locator("h1");
const orderId:Locator = page.locator("[class='em-spacer-1'] [class='ng-star-inserted']");
const ordersTab:Locator = page.locator("button:has-text('Orders')");
const orderIdAllList:Locator = page.locator("tbody tr th");
const orderIDHeader:Locator = page.locator("th:has-text('Order Id')");
const viewButton:Locator = page.locator("button:has-text('View')")

const userName:string = "goyalsumit319@gmail.com";
const password:string = "Subh@1987#!"; 
const cardNumber:string = "4542 9931 9292 2293";
const cvv:string = "587";
const cardName:string = "Sumit Goyal";
const expiryMonth:string = "04";
const expiryYear:string = "17";


const loginPage:LoginPage = new LoginPage(page);
await loginPage.goTo();
await loginPage.validLogin(userName,password);
//----------------------------------------------------------------------------------
 const dashBoardPage:DashBoardPage = new DashBoardPage(page);
 await dashBoardPage.searchProductAddCart(productName);
 await dashBoardPage.navigateToCart();
 //-----------------------------------------------------------------------
 const cartPage:CartPage = new  CartPage(page);
 await cartPage.verifyProductIsDisplayed(productName);
 await cartPage.checkout();
//-------------------------------------------------------------------
const ordersReviewPage:OrdersReviewPage = new OrdersReviewPage(page);
await ordersReviewPage.searchCountryAndSelect("ind","India");
await ordersReviewPage.fillCardDetails(cardNumber,cvv,cardName,expiryMonth,expiryYear);
await ordersReviewPage.placeOrderFinal();
//-----------------------------------------------------------------------------
await expect(orderSuccessMessage).toHaveText(" Thankyou for the order. ");

let orderIdProd:string|null = await orderId.textContent();
if(orderIdProd){

     
     orderIdProd = orderIdProd.split(" ")[2];
}
    console.log(orderIdProd);

//------------------------------------------------------------------------------
const ordersHistoryPage:OrdersHistoryPage = new OrdersHistoryPage(page);
if(orderIdProd)
await ordersHistoryPage.searchOrderAndSelect(orderIdProd);

await page.waitForTimeout(4000);

});

 