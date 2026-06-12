import { Locator, Page , expect } from "@playwright/test";

export class ThankYouPage{

    page:Page;
    orderSuccessMessage:Locator;
    orderIdThankYouPage:Locator;
    
    constructor(page:Page)
    {
        this.page=page;
        this.orderSuccessMessage = page.locator("h1");
        this.orderIdThankYouPage = page.locator("[class='em-spacer-1'] [class='ng-star-inserted']");
    }


    async validateThankYouMsg():Promise<void>
    {
        await expect(this.orderSuccessMessage).toHaveText(" Thankyou for the order. ");
        
    }



    async fetchAndReturnOrderId():Promise<string|null>
    {
        
        let orderIdProd:string|null = await this.orderIdThankYouPage.textContent();
        if(orderIdProd){
        
             
             orderIdProd = orderIdProd.split(" ")[2];
        }
            console.log(orderIdProd);
            return orderIdProd;
    }



}