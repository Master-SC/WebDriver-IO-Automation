
const chaiexpect = require("chai").expect
const loginPage = require('../pageobjects/loginPage.js')
const productPage = require("../pageobjects/productPage.js")
const checkoutPage = require("../pageobjects/checkoutPage.js")
const purchasePage = require('../pageobjects/purchasePage.js')
const fs = require("fs")
const orderplacedata = JSON.parse(fs.readFileSync("test/testData/SuccessFullOrderPlaceTestData.json"))

describe("Validation of EndToEnd Order Place journey", ()=>{

    orderplacedata.forEach(({ productcount_0,productcount_1,productcount_2,productcount_6,
        productList,countrySuggestion,countrySelected,TermsAndCondition,OrderSuccessMsg,firstSelectedProd,SecondSelectedProd})=>{
    it("SuccessFull Order Place",()=>{

        browser.url("/loginpagePractise/#/")
        browser.maximizeWindow()
        loginPage.loginWithCred()
        
        productPage.waitForChcekoutBtn()
        chaiexpect(productPage.chcekoutBtn.getText()).to.be.include(productcount_0)
        productPage.addToCart(firstSelectedProd)
        chaiexpect(productPage.chcekoutBtn.getText()).to.be.include(productcount_1)
        productPage.addToCart(SecondSelectedProd)
        chaiexpect(productPage.chcekoutBtn.getText()).to.be.include(productcount_2)
        // let listMbl = ['Blackberry', 'iphone X', 'Nokia Edge', 'Samsung Note 8']
        productPage.addtoCartFromProductList(productList)
        expect(productPage.chcekoutBtn).toHaveTextContaining(productcount_6)
        productPage.chcekoutBtn.click()

        checkoutPage.waitForCheckoutBasketButton()
        let expectedtotalPrice =checkoutPage.expectedTotalPrice()
        let actualtotalPrice = checkoutPage.actualTotalPrice()
        chaiexpect(expectedtotalPrice).to.be.eq(actualtotalPrice)
        checkoutPage.checkoutbtnBasket.click()

        purchasePage.waiForPurchaseBtnToExists()
        purchasePage.giveValueInCountryDropdown(countrySuggestion)
        purchasePage.waitForCountrySugestionDropDownToExists()
        purchasePage.selectCountryFromDropDown(countrySelected)
        purchasePage.waitForTncCheckbox()
        purchasePage.tncCheckbox.click()
        purchasePage.tncPopUpLink.click()
        purchasePage.waitForTncPop()
        let TncMsg = purchasePage.getTncPopUpMsg()
        chaiexpect(TncMsg).to.be.equal(TermsAndCondition)
        purchasePage.tncPopUpAlertCloseBtn.click()
        purchasePage.purchaseButton.waitForExist()
        purchasePage.purchaseButton.click()
        let successMsg = purchasePage.getOrderSucessMsg()
        chaiexpect(successMsg).to.be.equal(OrderSuccessMsg)
    })
  })
})