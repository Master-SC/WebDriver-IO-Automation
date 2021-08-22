const chaiexpect = require("chai").expect


describe("Windows and Frame Switching", ()=>{

    it("Parent and Child Window Switching", ()=>{
        browser.url("/AutomationPractice/#/")
        browser.maximizeWindow()
        const windowButton = $("button[onclick*=openWindow]")
        windowButton.click()
        let windowList = browser.getWindowHandles()
        browser.switchToWindow(windowList[1])
        browser.maximizeWindow()
        expect(browser).toHaveTitleContaining("QA Click Academy")
        browser.closeWindow()
        browser.switchToWindow(windowList[0])
        expect(browser).toHaveTitleContaining("Practice")
        browser.pause(3000)

       // Open new Window using Webdriver IO

       let titleParent = browser.getTitle()
       browser.newWindow("http://www.qaclickacademy.com/")
       let titelchild = browser.getTitle()
       driver.pause(3000)
       browser.switchWindow(titleParent)
       driver.pause(3000)
       expect(browser).toHaveTitle(titleParent)
       driver.switchWindow(titelchild)
       driver.pause(3000)
       expect(browser).toHaveTitle(titelchild)
       browser.closeWindow()
       browser.switchWindow(titleParent)
       $("input[placeholder*='Your Name']").setValue(titelchild)
       expect(browser).toHaveTitle(titleParent)
       browser.pause(3000)
    })

    it("Frame Handling using WebDriver IO-smoke",()=>{
        browser.url("/AutomationPractice/#/")
        browser.maximizeWindow()
        let titleofParent = browser.getTitle()
        let expectedLinkCountParentPage = $$("a").length
        browser.newWindow("https://www.rahulshettyacademy.com/")
        expect(browser).toHaveTitle("Rahul Shetty Academy")
        let expectedCountOfframePageLinks = $$("a").length
        let expectedTagname=$("=Courses").getTagName()
        browser.closeWindow()
        browser.switchWindow(titleofParent)

        //iframes 
        const frameLocator= $("iframe#courses-iframe")
        frameLocator.scrollIntoView()
        browser.switchToFrame(frameLocator)
        let actualCountOfframePageLinks=$$("a").length
        let actualTagName=$("=Courses").getTagName()

        chaiexpect(expectedCountOfframePageLinks).to.be.equal(actualCountOfframePageLinks)
        chaiexpect(expectedTagname).to.be.equal(actualTagName)

        browser.switchToFrame(null)
        let actualLinkCountParentPage = $$("a").length
        expect(browser).toHaveTitle(titleofParent)
        chaiexpect(expectedLinkCountParentPage).to.be.equal(actualLinkCountParentPage)


    })
})