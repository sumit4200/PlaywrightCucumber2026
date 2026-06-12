import { Page } from "@playwright/test";
import { CartPage } from "./CartPage";
import { DashBoardPage } from "./DashBoardPage";
import { LoginPage } from "./LoginPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { ThankYouPage } from "./ThankYouPage";

export class POManager{

page:Page;
loginPage:LoginPage;
dashBoardPage:DashBoardPage;
cartPage:CartPage;
ordersHistoryPage:OrdersHistoryPage;
ordersReviewPage:OrdersReviewPage;
thankYouPage:ThankYouPage;


constructor(page:Page)
{
    this.page=page;
    this.loginPage=new LoginPage(page);
    this.dashBoardPage=new DashBoardPage(page);
    this.cartPage= new CartPage(page);
    this.ordersHistoryPage= new OrdersHistoryPage(page);
    this.ordersReviewPage=new OrdersReviewPage(page);
    this.thankYouPage = new ThankYouPage(page);


}

getLoginPage():LoginPage
{
    return this.loginPage;
}

getDashboardPage():DashBoardPage
{
    return this.dashBoardPage;
}

getCartPage():CartPage
{
    return this.cartPage;
}

getOrdersHistoryPage():OrdersHistoryPage
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage():OrdersReviewPage
{
    return this.ordersReviewPage;
}

getThankYouPage():ThankYouPage
{
    return this.thankYouPage;
}

}