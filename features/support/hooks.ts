import { AfterStep, Before } from "@cucumber/cucumber";
import { Browser,chromium, BrowserContext, Page } from "@playwright/test";
import { POManager } from "../../pageObjects/POManager";

Before(async function(){

    const browser: Browser = await chromium.launch({
            channel: "chrome",
            headless: false,
        });

        const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();

        this.page = page;
        this.poManager = new POManager(page);
        this.browser = browser;

})

 
AfterStep(async function ({ result }) {
  if (result?.status === "FAILED") {
    const screenshot = await this.page.screenshot({
       
      path: `${Date.now()}.png`
    });
     console.log("hiiiiiiiiiiiiiiiiiiiiii"),
    this.attach(screenshot, "image/png");
  }
});



