import { Locator, Page , expect } from "@playwright/test";
export class OrdersHistoryPage {

    ordersTab: Locator;
    orderIDHeader: Locator;
    orderIdAllList: Locator;
    viewButton:Locator;
    page: Page;
    constructor(page: Page) {
        this.page = page;
        this.ordersTab = page.locator("button:has-text('Orders')");
        this.orderIDHeader = page.locator("th:has-text('Order Id')");
        this.orderIdAllList = page.locator("tbody tr th");
        this.viewButton = page.locator("button:has-text('View')");
    }


    async searchOrderAndSelect(orderIdProd:string): Promise<void> {

        await this.ordersTab.click();

        await expect(this.orderIDHeader).toBeVisible();
        await this.orderIDHeader.waitFor({ state: 'visible', timeout: 4000 });

        let ordersIDList: Locator[] = await this.orderIdAllList.all();
        // for(let order of ordersIDList)
        // {
        //    let order_text_id:string|null =  await order.locator("th[scope='row']").textContent();
        //    if(order_text_id===orderIdProd)
        //    {
        //         await order.locator("button:has-text('View')").click();
        //         break;
        //    }
        //  }

        let allVieWBtn: Locator[] = await this.viewButton.all();
        for (let i = 0; i < ordersIDList.length; ++i) {
            let order_text_id: string | null = await ordersIDList[i].textContent();
            if (order_text_id === orderIdProd) {
                await allVieWBtn[i].click();
                break;
            }
        }
        if (orderIdProd)
            await expect(this.page.locator("[class='col-title']+div")).toHaveText(orderIdProd);


    }






}