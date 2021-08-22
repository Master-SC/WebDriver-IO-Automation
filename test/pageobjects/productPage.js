class ProductPage{

    get chcekoutBtn(){ return $("*=Checkout")}
    get chcekoutBtnCss(){return $('a.nav-link.btn.btn-primary')}
    get listOfProducts(){ return $$("div.card.h-100")}
    get productTitle(){ return $("h4.card-title a")}
    get addBtn(){ return $("div.card-footer button")}



    waitForChcekoutBtn(){
        this.chcekoutBtnCss.waitForDisplayed() 
    }

    addToCart(nameOfBroduct){   
        this.listOfProducts.filter(s=>s.$("h4.card-title a").getText()===nameOfBroduct).map(s=>s.$("div.card-footer button").click())
        this.chcekoutBtn.scrollIntoView()
    }

    addtoCartFromProductList(productList){
        productList.map(s=>this.addToCart(s))
    }
}

module.exports = new ProductPage()