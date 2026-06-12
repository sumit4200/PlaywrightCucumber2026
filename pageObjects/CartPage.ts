import { Page ,Locator,expect} from "@playwright/test";

export class CartPage{

    page:Page;
    checkoutProd:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.checkoutProd =  page.locator("text=Checkout");

    }

    async verifyProductIsDisplayed(productName:string) :Promise<void>
    {

        
        await this.page.locator(`h3:has-text("${productName}")`).waitFor({state:'visible',timeout:4000});
        let visibleCoat:boolean = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
        console.log(visibleCoat+"----------------");
        expect(visibleCoat).toBeTruthy();


    }


    async checkout():Promise<void>
    {
        await this.checkoutProd.click();

    }









}