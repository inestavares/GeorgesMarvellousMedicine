"use strict";function Product(r,t){var o=this;this.el=r,this.ethic=t,this.name=r.find("h4").text(),this.addToCart=function(){cart.counter=1,$(this).text("Item in Cart"),$(".current-cart").append('<li id="'+o.id+'" class="product-in-cart">'+o.name+"</li>"),r.off("click.cart"),cart.updateScores(o)},this.notInCart=function(){r.find("button").text("Add to Cauldron"),r.on("click.cart",".cart",this.addToCart)},this.el.on("click.cart",".cart",this.addToCart)}var cart={scoreGood:0,scoreBad:0,counter:0,removeFromCart:function(){var r=$(this).text();$(this).remove(),cart.counter=-1;for(var t=0;t<productArray.length;t++)if(productArray[t].name===r){var o=productArray[t];cart.updateScores(o),o.notInCart()}},updateScores:function(r){"good"===r.ethic?cart.scoreGood=cart.scoreGood+cart.counter:cart.scoreBad=cart.scoreBad+cart.counter,$("#number").text(cart.scoreGood+cart.scoreBad)},calcFinalScore:function(r){r.stopPropagation(),cart.scoreGood+cart.scoreBad<3?$(".error").removeClass("hide"):($("#results h3").toggleClass("hide"),$(".calc-score").addClass("hide"),$(".error").addClass("hide"),cart.disableClicks(),cart.scoreGood>cart.scoreBad?$(".results-message").find("div.good").toggleClass("hide"):$(".results-message").find("div.bad").toggleClass("hide"))},disableClicks:function(){$(".product").find("button").remove(),$(".current-cart").off("click")}},productArray=[new Product($("#internationalAid"),"bad"),new Product($("#retirementAge"),"bad"),new Product($("#trident"),"good"),new Product($("#livingWage"),"good"),new Product($("#taxThreshold"),"bad"),new Product($("#houseWarm"),"good"),new Product($("#robinhoodTax"),"good"),new Product($("#subsidiesBanks"),"good"),new Product($("#benefitsCap"),"bad"),new Product($("#taxAvoidance"),"good")];$(document).ready(function(){$("#results").on("click.calcScore",".calc-score",cart.calcFinalScore),$(".current-cart").on("click.removeFromCart",".product-in-cart",cart.removeFromCart)});