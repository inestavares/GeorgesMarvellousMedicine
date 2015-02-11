/* jshint devel:true */
'use strict';
// TODO: Refactor to Objects - Product Methods are a bit meh 
// TODO: Write scoring logic - which one is which



$(document).ready(function() {
var totalCart = 0,
    totalGood = 0,
    totalBad  = 0;

// cart logic 

var updateCart = function() {
  $('#number').text(totalCart);
}

var addToCart = function() { // the largest function ever
  var productName = $(this).parent('div').find('h4').text(),
      productButton = $(this);
  totalCart++;
  updateCart();
  productButton.text('Item in Cart');
  $('.current-cart').append('<li class="product-in-cart">' + productName + '</li>');
  productButton.removeClass('cart');
}

var removeFromCart = function() {
  var productName = $(this).text(),
      productInList = $('.product').find("h4:contains("+ productName +")");
      console.log(productInList);
      totalCart--;
      $(this).remove();
      updateCart();
      productInList.parent('div').find('button').addClass('cart').text('Add Item to Cart');
}


// score logic 
var calcScore = function() {
    if(!totalBad && !totalGood) {
      console.log("You haven't selected any products");
    } 
}

var showImage = function() {
  var productLegend = $(this).parent('div').find('.legend'),
      productImage = $(this).parent('div').find('img');
  productImage.toggleClass('op');
  productLegend.toggleClass('invisible');
}

  $('.product').on('click.cart', '.cart', addToCart);
  $('.current-cart').on('click.product', '.product-in-cart', removeFromCart );
  $('.product').on('click.showImage', 'img', showImage);
  $('#results').on('click.calcScore', '.calc-score', calcScore);
});
