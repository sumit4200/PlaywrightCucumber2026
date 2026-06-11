import {Page,Locator} from "@playwright/test";

export class DashBoardPage{

page:Page;
cart:Locator;
allProducts:Locator;


constructor(page:Page)
{
    this.page=page;
    this.allProducts = page.locator("[class='card-body']");
    this.cart = page.locator("[routerlink*='cart']");

}

async searchProductAddCart(productName:string):Promise<void>
{

    
    let allitems:Locator[] = await this.allProducts.all();
    
    for(let data of allitems)
    {
        let actual_text = await data.locator("b").textContent();
        if(actual_text === productName)
        {
            await data.locator(".fa.fa-shopping-cart").click();
           
            break;
        }
    }
}

async navigateToCart():Promise<void>
{
    await this.cart.click();

}








}