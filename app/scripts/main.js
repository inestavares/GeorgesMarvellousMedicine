/* jshint devel:true */
'use strict';
// TODO: Refactor to Objects - Product Methods are a bit meh 
// TODO: Write scoring logic - which one is which



var cart = {
  scoreGood: 0,
  scoreBad: 0,
  counter: 0, // counter is either 1 or -1
  removeFromCart: function() {
    var curName = $(this).text();
    $(this).remove();
    cart.counter = -1;
    for(var i = 0; i < productArray.length; i++) {
      if(productArray[i]['name'] === curName) {
        var curProduct = productArray[i];
        cart.updateScores(curProduct);
        curProduct.notInCart();
      }
    }
  },
  updateScores: function(obj) { // take in the current object as a param
    if(obj.ethic === 'good') {
      cart.scoreGood = cart.scoreGood + cart.counter;
    } else {
      cart.scoreBad = cart.scoreBad + cart.counter;
    }
    $('#number').text(cart.scoreGood + cart.scoreBad);
  },
  calcFinalScore: function(e) {
    e.stopPropagation();
    if(cart.scoreGood + cart.scoreBad < 3) {
      $('.error').removeClass('hide');
    } else { 
        $('#results h3').toggleClass('hide');
        $('.calc-score').addClass('hide');
        $('.error').addClass('hide');
        cart.disableClicks();
      if (cart.scoreGood > cart.scoreBad) {
        $('.results-message').find('div.good').toggleClass('hide');
      } else {
        $('.results-message').find('div.bad').toggleClass('hide');
      }
    }
  },
  disableClicks: function() {
    // el.off('click.cart');
    $('.product').find('button').remove();
    $('.current-cart').off('click');
  }
};
// the product

function Product(el, ethic) {
  var product = this;
  this.el = el;
  this.ethic = ethic;
  this.name = el.find('h4').text();
  this.addToCart = function() {
    cart.counter = 1;
    $(this).text('Item in Cart');
    $('.current-cart').append('<li id="'+ product.id +'" class="product-in-cart">' + product.name + '</li>');
    el.off('click.cart');  
    cart.updateScores(product);
  };
  this.notInCart = function() {
    el.find('button').text('Add to Cauldron');
    el.on('click.cart', '.cart', this.addToCart);
  };
  this.el.on('click.cart', '.cart', this.addToCart);
}

var productArray = [ 
      new Product($('#internationalAid'), 'bad'),
      new Product($('#retirementAge'), 'bad'),
      new Product($('#trident'),'good'),
      new Product($('#livingWage'), 'good'),
      new Product($('#taxThreshold'), 'bad'),
      new Product($('#houseWarm'), 'good'),
      new Product($('#robinhoodTax'), 'good'),
      new Product($('#subsidiesBanks'), 'good'),
      new Product($('#benefitsCap'), 'bad'),
      new Product($('#taxAvoidance'), 'good')
      ];

$(document).ready(function() {
$('#results').on('click.calcScore', '.calc-score', cart.calcFinalScore);
$('.current-cart').on('click.removeFromCart', '.product-in-cart', cart.removeFromCart);
});

