const chaiexpect = require("chai").expect

describe("E2E Ecommerce Journey", ()=>{

    it("End to End Test",function(){
        this.retries(2)
        const usernameField = $("input#username")
        const pwdField = $("input#password")
        const signInBtn = $("input[name=signin]")
        const textLogin = $("div.form-group p")


        browser.url("/loginpagePractise/#/")
        browser.fullscreenWindow()
        let text = textLogin.getText()
        let arraytext = text.split(" ")
        usernameField.setValue(arraytext[2])
        pwdField.setValue((arraytext[6].split(")"))[0])
        signInBtn.click()

        const chcekoutBtn = $("*=Checkout")
        chcekoutBtn.waitForClickable()


        chaiexpect(chcekoutBtn.getText()).to.be.include("0")

        function addToCart(nameOfBroduct){
            const items = $$("div.card.h-100")
            items.filter(s=>s.$("h4.card-title a").getText()===nameOfBroduct).map(s=>s.$("div.card-footer button").click())
            chcekoutBtn.scrollIntoView()
        }

        chaiexpect(chcekoutBtn.getText()).to.be.include("0")
        
        addToCart("Blackberry")
        chaiexpect(chcekoutBtn.getText()).to.be.include("1")

        addToCart("iphone X")
        chaiexpect(chcekoutBtn.getText()).to.be.include("2")

        let listMbl = ['Blackberry', 'iphone X', 'Nokia Edge', 'Samsung Note 8']

        listMbl.map(s=>addToCart(s))
        console.log(chcekoutBtn.getText())

        chcekoutBtn.click()

        const checkoutbtnBasket = $("button.btn.btn-success")
        checkoutbtnBasket.waitForExist()

        const totalPriceArray = $$("tbody tr td:nth-child(4) strong")
        let expectedtotalPrice= totalPriceArray.map(s=>(s.getText().split(" "))[1]).map(s=>parseInt(s)).reduce((s,num)=>s+num,0)
        //.reduce((s,num)=>s+num,0)
        console.log(expectedtotalPrice)

        let actualtotalPrice = parseInt(($("h3 strong").getText().split(" "))[1])

        chaiexpect(expectedtotalPrice).to.be.eq(actualtotalPrice)
        checkoutbtnBasket.click()

        const purchseBtn = $("input[value=Purchase]")
        purchseBtn.waitForExist()

        const countryDropdown = $("input#country")
        countryDropdown.setValue("Ind")
        const countrySuggestionsField = $("div.suggestions")
        countrySuggestionsField.waitForExist()
        const countrySuggestions = $$("div.suggestions ul li a")

        function countrySelect(country){
            countrySuggestions.filter(s=>s.getText()===country).map(s=>s.click())
            countrySuggestionsField.waitForExist({reverse:true})
        }
        countrySelect("India")
        const chcekbox=$("label[for=checkbox2]")
        chcekbox.waitForClickable()
        chcekbox.click()
        
        const TnCOption = $("label[for=checkbox2] a")
        TnCOption.click()
        let alertClose = $("button.btn.btn-info")
       alertClose.waitForExist()

        let TncMsg = $("div h1").getText()
        chaiexpect(TncMsg).to.be.equal("Terms And Conditions")

        
        alertClose.click()
        purchseBtn.waitForExist()
        purchseBtn.click()

        let successMsg = $("div.alert.alert-success strong").getText()
        chaiexpect(successMsg).to.be.equal("Success!")
    })
})