import { IWorldOptions, World } from "@cucumber/cucumber";
import { Browser, Page } from "@playwright/test";
import { POManager } from "../pageObjects/POManager";

export class CustomWorld extends World {
    page!: Page;
    browser!:Browser;
    poManager!: POManager;
    orderIdProd: string | null = null;


    constructor(options: IWorldOptions) {
        super(options);
    }
}