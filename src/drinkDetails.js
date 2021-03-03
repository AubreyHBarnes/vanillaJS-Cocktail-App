// 1. Collect all drinks with the class drinkDetails 
// 2. After the page finishes loading, add an event listener to each drink in the array
// 2a. On click, I should be able to retrieve the id of a drink, then get detailed info from 
//      the API



  window.addEventListener('load', (event) => {
    let grabDrinks = document.getElementsByClassName('drinkDetails');

    console.log(grabDrinks)
    console.log(grabDrinks[9])

});