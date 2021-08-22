class LoginPage{

    get userName(){  return $("input#username")}
    get passWord(){  return $("//input[@name='password']")}
    get signInBtn(){ return $("input#signInBtn")}
    get errorMsg(){ return $("div.alert.alert-danger.col-md-12")}
    get credText(){ return $("p.text-center.text-white")}
    get chcekoutButton(){ return $("*=Checkout")}

    login(user, pwd){
        this.userName.setValue(user)
        this.passWord.setValue(pwd)
        this.signInBtn.click()
    }

    loginWithCred(){
        let text = this.credText.getText()
        let textArray = text.split(" ")
        this.userName.setValue(textArray[2])
        this.passWord.setValue((textArray[6].split(")"))[0])
        this.signInBtn.click()
    }

    getErrorMsg(){
        return this.errorMsg.getText()
    }

    waitforElementToAppear(attribute,value){
        browser.waitUntil(()=> this.signInBtn.getAttribute(attribute)===value,
        { 
           timeout : 4000, 
           timeoutMsg :"Error Message Not found" 
        })
    }

}

module.exports = new LoginPage()