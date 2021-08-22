const loginPage = require('../pageobjects/loginPage.js')
const productPage = require('../pageobjects/productPage.js')
const fs = require('fs')
const wrongLoginData=JSON.parse(fs.readFileSync('test/testData/loginScreenTestDataWrongCred.json'))
const validLoginData=JSON.parse(fs.readFileSync('test/testData/loginScreenTestWithValidCred.json'))

describe("Login Page Validation",()=>{

    wrongLoginData.forEach(({username, password, pageTitle, attributeValue, errorMsg, credText,signInBtnValue }) => {
    it("Not Successful Login Error Validation-smoke", ()=>{
        browser.url('/loginpagePractise/')
        browser.maximizeWindow()
        console.log(browser.getTitle())
        expect(browser).toHaveTitleContaining(pageTitle)
        loginPage.login(username,password)
        loginPage.waitforElementToAppear(attributeValue,signInBtnValue)
        const errormsg = loginPage.getErrorMsg()
        console.log(errormsg)
        expect(loginPage.errorMsg).toHaveTextContaining(errorMsg)
        expect(loginPage.credText).toHaveTextContaining(credText)
    })
    });

    validLoginData.forEach(({username, password, title, pageurl})=>{
    it("Successful Login", ()=>{
        browser.url('/loginpagePractise/')
        browser.maximizeWindow()
        loginPage.login(username,password)
        productPage.waitForChcekoutBtn()
        expect(browser).toHaveTitleContaining(title)
        expect(browser).toHaveUrlContaining(pageurl)
    })
    })
})