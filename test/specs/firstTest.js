describe('This is our first test suite',()=>{

    it("This is our first test", () =>{
        // Web driver IO code
        browser.url('/loginpagePractise/')
        browser.fullscreenWindow()
        console.log(browser.getTitle())
        browser.pause(4000)
        expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
        //locator support xpath/css/linkedtext
        $("input#username").setValue("rahulshettyacademy")
        $("input#username.form-control").setValue("dataid")
        const password = $("//input[@name='password']")
        password.setValue("learning123")
        $("input#signInBtn").click()
        
        browser.waitUntil(()=> $("input#signInBtn").getAttribute('value')==='Sign In',
            { 
               timeout : 4000, 
               timeoutMsg :"Error Message Not found" 
            })
        const errormsg = $("div.alert.alert-danger.col-md-12").getText()
        console.log(errormsg)
        //Signing ..
        expect($("p.text-center.text-white")).toHaveTextContaining("rahulshettyacademy")
    })

    it("Successful Login", ()=>{
        browser.url('/loginpagePractise/')
        browser.maximizeWindow()
        $("input#username").setValue("rahulshettyacademy")
        $("//input[@name='password']").setValue("learning")
        $("input#signInBtn").click()
        const checkout=$("*=Checkout")
        checkout.waitForExist()

        expect(browser).toHaveTitleContaining("ProtoCommerce")
        expect(browser).toHaveUrlContaining("shop")
    })

});