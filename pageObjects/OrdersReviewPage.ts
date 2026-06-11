import {Locator, Page,expect} from "@playwright/test";

export class OrdersReviewPage{


    page:Page;
    countryDropdown:Locator;
    countryDropdownTextBox:Locator;
    grey_email:Locator;
    creditCard:Locator;
    cvvCode:Locator;
    cardName:Locator;
    expiryMonth:Locator;
    expiryYear:Locator;
    placeOrder:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.countryDropdownTextBox = page.locator("[placeholder='Select Country']");
        this.countryDropdown = page.locator(".ta-results button span");
        this.grey_email = page.locator("[style*='gray']"); 
        this.creditCard = page.locator("[class='input txt text-validated']")
        this.cvvCode = page.locator("[class='input txt']");
        this.cardName =  page.locator("[class='input txt']");
        this.expiryMonth= page.locator("[class='input ddl']");
        this.expiryYear = page.locator("[class='input ddl']");
        this.placeOrder=   page.locator("[class*='action__submit']");


    }



    async searchCountryAndSelect(countryCode:string,countryName:string)
    {

        
        await this.countryDropdownTextBox.pressSequentially(countryCode,{delay:200});
        
        //await page.locator('section button > span').getByText('India', { exact: true }).click();
        await this.countryDropdown.first().waitFor({state:'visible',timeout:3000});
        let country:Locator[]= await this.countryDropdown.all();
        
        console.log("count is ="+country.length)
        
        for(let data of country)
        {
            let country_txt:string|null = await data.textContent();
            if(country_txt)
            {
                country_txt=country_txt.trim();
               
                if(country_txt===countryName)
            {
        
                await data.click();
                break;
            }
            }
           
        }
        
        await expect(this.grey_email).toHaveText("goyalsumit319@gmail.com");
        

    }



    async fillCardDetails(creditCard:string,cvv:string,cardName:string,expiryMonth:string,expiryYear:string):Promise<void>
    {

        await this.creditCard.first().fill("4542 1111 9111 2111");
        await this.cvvCode.first().fill("987");
        await this.cardName.last().fill("Sumit Goyal");
        await this.expiryMonth.first().selectOption("09");
        await this.expiryYear.last().selectOption("30");
    

    }

    async placeOrderFinal():Promise<void>
    {
        await this.placeOrder.click();
    }

}