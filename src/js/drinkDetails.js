// 1. Collect all drinks with the class drinkDetails 
// 2. After the page finishes loading, add an event listener to each drink in the array
// 2a. On click, I should be able to retrieve the id of a drink, then get detailed info from 
//      the API



//   window.addEventListener('load', (event) => {
//     let grabDrinks = document.getElementsByClassName('drinkDetails');

//     console.log(grabDrinks)
//     console.log(grabDrinks[0])

// });

// let drinkID = 11007;

// fetch(`/.netlify/functions/fetchDetails?idQuery=${drinkID}`)
// .then(res => res.json())
// .then(data => console.log(data.drinks[0]))


// const fetchCountry = async (alpha3Code) => {
//     try {
//       const res = await fetch(
//         `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
//       );
  
//       const data = await res.json();
  
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   const fetchCountryAndNeigbors = async () => {
//     const columbia = await fetchCountry("col");
  
//     const neighbors = await Promise.all(
//       columbia.borders.map((border) => fetchCountry(border))
//     );
  
//     console.log(neighbors);
//   };
  
//   fetchCountryAndNeigbors();

