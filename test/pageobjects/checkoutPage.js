
class CheckoutPage{

    get checkoutbtnBasket(){ return $("button.btn.btn-success")}
    get totalPriceArray(){return $$("tbody tr td:nth-child(4) strong")}
    get actualPrice(){return $("h3 strong")}


    waitForCheckoutBasketButton(){
        this.checkoutbtnBasket.waitForExist()
    }

    expectedTotalPrice(){
        return this.totalPriceArray.map(s=>(s.getText().split(" "))[1]).map(s=>parseInt(s)).reduce((s,num)=>s+num,0)
    }

    actualTotalPrice(){
        return parseInt((this.actualPrice.getText().split(" "))[1])
    }

    









}

module.exports= new CheckoutPage()