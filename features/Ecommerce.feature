Feature: Ecommerce validations

Scenario: Placing the Order

  Given A login to Ecommerce application with "goyalsumit319@gmail.com" and "Subh@1987#!"
  When Add "ZARA COAT 3" to Cart
  Then Verify "ZARA COAT 3" is displayed in the Cart
  When Enter valid details and place the Order
  Then Verify order is present in the OrderHistory