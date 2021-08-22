class PurchasePage{
    get purchaseButton(){return $("input[value=Purchase]")}
    get countryDropDown(){return  $("input#country")}
    get countrySuggestionsDropDown(){ return $("div.suggestions")}
    get countrySuggestionList(){ return $$("div.suggestions ul li a")}
    get tncCheckbox(){return $("label[for=checkbox2]")}
    get tncPopUpLink(){return $("label[for=checkbox2] a")}
    get tncPopUpAlertCloseBtn(){ return $("button.btn.btn-info")}
    get tncPopUpMsg(){ return $("div h1")}
    get orderSuccessMsg(){return $("div.alert.alert-success strong")}



    waiForPurchaseBtnToExists(){
        this.purchaseButton.waitForExist()
    }

    giveValueInCountryDropdown(country){
        this.countryDropDown.setValue(country)
    }

    waitForCountrySugestionDropDownToExists(){
        this.countrySuggestionsDropDown.waitForExist()
    }

    selectCountryFromDropDown(country){
        this.countrySuggestionList.filter(s=>s.getText()===country).map(s=>s.click())
        this.countrySuggestionsDropDown.waitForExist({reverse:true})
    }

    waitForTncCheckbox(){
        this.tncCheckbox.waitForClickable()
    }

    waitForTncPop(){
        this.tncPopUpAlertCloseBtn.waitForExist()
    }

    getTncPopUpMsg(){
       return this.tncPopUpMsg.getText()
    }

    getOrderSucessMsg(){
        return this.orderSuccessMsg.getText()
    }







}

module.exports= new PurchasePage()