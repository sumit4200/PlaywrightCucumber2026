import { Given, When, Then } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";

import { POManager } from "../../pageObjects/POManager";
import { LoginPage } from "../../pageObjects/LoginPage";
import { CartPage } from "../../pageObjects/CartPage";
import { DashBoardPage } from "../../pageObjects/DashBoardPage";
import { OrdersHistoryPage } from "../../pageObjects/OrdersHistoryPage";
import { OrdersReviewPage } from "../../pageObjects/OrdersReviewPage";
import { ThankYouPage } from "../../pageObjects/ThankYouPage";
import { CustomWorld } from "../../utils/CustomWorld";

console.log("Steps Loaded Successfully");

Given(
    "A login to Ecommerce application with {string} and {string}",{timeout:100*1000},
    async function (
        this: CustomWorld,
        userName: string,
        password: string
    ) {
        const browser: Browser = await chromium.launch({
            channel: "chrome",
            headless: false,
        });

        const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();

        this.page = page;
        this.poManager = new POManager(page);
        this.browser = browser;

        const loginPage: LoginPage = this.poManager.getLoginPage();

        await loginPage.goTo();
        await loginPage.validLogin(userName, password);
    }
);

When(
    "Add {string} to Cart",
    async function (this: CustomWorld, productName: string) {
        const dashBoardPage: DashBoardPage =
            this.poManager.getDashboardPage();

        await dashBoardPage.searchProductAddCart(productName);
        await dashBoardPage.navigateToCart();
    }
);

Then(
    "Verify {string} is displayed in the Cart",
   
    async function (this: CustomWorld, productName: string) {
        const cartPage: CartPage = this.poManager.getCartPage();
        
        await cartPage.verifyProductIsDisplayed(productName);
        await cartPage.checkout();
    }
);

When("Enter valid details and place the Order",async function (this: CustomWorld) {
        const ordersReviewPage: OrdersReviewPage =
            this.poManager.getOrdersReviewPage();

        await ordersReviewPage.searchCountryAndSelect("ind", "India");

        await ordersReviewPage.fillCardDetails(
            "4542993192922293",
            "587",
            "Sumit Goyal",
            "04",
            "17"
        );

         

        await ordersReviewPage.placeOrderFinal();

        const thankYouPage: ThankYouPage =
            this.poManager.getThankYouPage();

        await thankYouPage.validateThankYouMsg();

        this.orderIdProd = await thankYouPage.fetchAndReturnOrderId();    }
);

Then(
    "Verify order is present in the OrderHistory",
    async function (this: CustomWorld) {
        const ordersHistoryPage: OrdersHistoryPage =
            this.poManager.getOrdersHistoryPage();

        if (this.orderIdProd) {
            await ordersHistoryPage.searchOrderAndSelect(this.orderIdProd);
        }
         await this.page.close();
         await this.browser.close();
    }
   
);