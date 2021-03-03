
let loadpopulardrinks = document.querySelector('#popular-drinks');

loadpopulardrinks.addEventListener('click', (event) => {
    fetch(`/.netlify/functions/fetch-popular`)
    .then(res => res.json())
    .then(data => {        
        console.log(data.drinks)

    });
    
})

    