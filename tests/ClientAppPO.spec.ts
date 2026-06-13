import { Locator, test, expect } from "@playwright/test";
import { POManager } from "../pageObjects/POManager";
import { LoginPage } from "../pageObjects/LoginPage";
import { DashBoardPage } from "../pageObjects/DashBoardPage";
import { CartPage } from "../pageObjects/CartPage";
import { OrdersReviewPage } from "../pageObjects/OrdersReviewPage";
import { OrdersHistoryPage } from "../pageObjects/OrdersHistoryPage";
import { ThankYouPage } from "../pageObjects/ThankYouPage";
import {customTest} from "../utils/test-base";
import dataSet_Main from "../utils/ClientAppTestData.json";

for(const dataSet of dataSet_Main)
{

test(`Client App Login ${dataSet.productName}`, async ({ page }) => {

    const poManager = new POManager(page);

    const loginPage: LoginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.userName, dataSet.password);
    //----------------------------------------------------------------------------------
    const dashBoardPage: DashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(dataSet.productName);
    await dashBoardPage.navigateToCart();
    //-----------------------------------------------------------------------
    const cartPage: CartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(dataSet.productName);
    await cartPage.checkout();
    //-------------------------------------------------------------------
    const ordersReviewPage: OrdersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    await ordersReviewPage.fillCardDetails(dataSet.cardNumber, dataSet.cvv, dataSet.cardName,dataSet.expiryMonth, dataSet.expiryYear);
    await page.waitForTimeout(4000);
    await ordersReviewPage.placeOrderFinal();
    //-----------------------------------------------------------------------------
    const thankYouPage: ThankYouPage = poManager.getThankYouPage();
    await thankYouPage.validateThankYouMsg();

    const orderIdProd: string | null = await thankYouPage.fetchAndReturnOrderId();

    //------------------------------------------------------------------------------
    const ordersHistoryPage: OrdersHistoryPage = poManager.getOrdersHistoryPage();
   
    if (orderIdProd)
        await ordersHistoryPage.searchOrderAndSelect(orderIdProd);

    await page.waitForTimeout(4000);

});

}


customTest(`Client App Login Data From Test Fixtures`, async ({ page,testDataForOrder }) => {

    const poManager = new POManager(page);

    const loginPage: LoginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);
    //----------------------------------------------------------------------------------
    const dashBoardPage: DashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
    //-----------------------------------------------------------------------
    const cartPage: CartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.checkout();
    //-------------------------------------------------------------------
    const ordersReviewPage: OrdersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    await ordersReviewPage.fillCardDetails(testDataForOrder.cardNumber, testDataForOrder.cvv, testDataForOrder.cardName,testDataForOrder.expiryMonth, testDataForOrder.expiryYear);
    
    await ordersReviewPage.placeOrderFinal();
    //-----------------------------------------------------------------------------
    const thankYouPage: ThankYouPage = poManager.getThankYouPage();
   await thankYouPage.validateThankYouMsg();

    const orderIdProd: string | null = await thankYouPage.fetchAndReturnOrderId();

    //------------------------------------------------------------------------------
    const ordersHistoryPage: OrdersHistoryPage = poManager.getOrdersHistoryPage();
    if (orderIdProd)
        await ordersHistoryPage.searchOrderAndSelect(orderIdProd);

    await page.waitForTimeout(4000);

});
