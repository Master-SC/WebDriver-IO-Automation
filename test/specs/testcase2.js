const chaiexpect = require('chai').expect
describe("Different UI Control", ()=>{

    it("Login Page Validation part 1", ()=>{
        browser.url("/loginpagePractise/")
        browser.maximizeWindow()
        
        const userName = $("input#username")
        const pwd = $("//input[@name='password']")
        const userRadio = $("input[value=user]")
        const adminRadio = $("input[value=admin]")
        const cancelPpoup = $("button#cancelBtn")
        const okPopup = $("button#okayBtn")
        const popupModal = $("div.modal-body")
        userRadio.click()
        expect(popupModal).toBeDisplayed()
        cancelPpoup.click()
        console.log(userRadio.isSelected())
        userRadio.click()
        expect(popupModal).toBeDisplayed()
        okPopup.click()
        adminRadio.click()
        expect(popupModal).not.toBeDisplayed()
    })

    it("Login Page Validation part 2", ()=>{
        browser.url("/loginpagePractise/")
        browser.maximizeWindow()

        //Select Drop Down
        const selectDrop = $("select.form-control")
        selectDrop.selectByAttribute('value', 'teach')
        selectDrop.getValue()//teach
        chaiexpect(selectDrop.getValue()).to.equal('teach')
        browser.pause(4000)
        selectDrop.selectByVisibleText('Consultant')
        selectDrop.getValue()//consult
        chaiexpect(selectDrop.getValue()).to.equal('consult')
        browser.pause(4000)
        selectDrop.selectByIndex(0)
        selectDrop.getValue()//stud
        browser.pause(4000)
        chaiexpect(selectDrop.getValue()).to.equal('stud')
        //chai is an assertion libary
    })

    it("Dynamic DropDowns", ()=>{
        browser.url("/AutomationPractice/#/")
        browser.maximizeWindow()
        const dynamicbox = $("input#autocomplete")
        dynamicbox.setValue("ind")
        browser.pause(5000)
        let autolocator = $$("[class='ui-menu-item'] div")
        console.log(autolocator.length)

/*         for(var i=0; i<autolocator.length; i++){
            console.log(autolocator[i].getText())
        } */

        const desiredLoc = autolocator.filter(autolocator=>autolocator.getText()==='India')
        desiredLoc[0].click()
        browser.pause(2000)
        chaiexpect(dynamicbox.getValue()).to.equal("India")
    })

    it("Checkboxes Example",()=>{
        browser.url("/AutomationPractice/#/")
        browser.maximizeWindow()
        const checkboxlist = $$("label input[type=checkbox]")
        //click on first checkbox 
        checkboxlist[0].click()
        chaiexpect(checkboxlist[0].isSelected()).to.equal(true)
        chaiexpect(checkboxlist[2].isSelected()).to.equal(false)
        //take screenshot
        browser.saveScreenshot("screenshot.png")
    })
})