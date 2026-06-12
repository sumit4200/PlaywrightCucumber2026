import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
  userName: string;
  password: string;
  productName: string;
  cardNumber: string;
  cvv: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
  testDataForOrder: {
    userName: "goyalsumit319@gmail.com",
    password: "Subh@1987#!",
    productName: "ZARA COAT 3",
    cardNumber: "4542993192922293",
    cvv: "587",
    cardName: "Pankaj Goyal",
    expiryMonth: "04",
    expiryYear: "17"
  }
});