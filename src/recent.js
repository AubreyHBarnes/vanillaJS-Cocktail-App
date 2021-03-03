let loadrecentdrinks = document.querySelector('#card-container');

window.addEventListener('load', (event) => {
    fetch(`/.netlify/functions/fetch-recent`)
    .then(res => res.json())
    .then(data => {        
        data.drinks.forEach(element => {
            
            var drinkcard = 
          `<!-- Article -->
          <article id="${element.idDrink}" class="drinkDetails overflow-hidden rounded-lg shadow-lg">

              <a href="#">
                  <img alt="Placeholder" class="block h-auto w-full" src="${element.strDrinkThumb}">
              </a>

              <header class="text-center leading-tight p-2 md:p-4">
                  <h1 class="text-lg">
                      <a class="no-underline hover:underline text-black" href="#">
                          ${element.strDrink}
                      </a>
                  </h1>
              </header>
          </article>
          <!-- END Article -->`

          loadrecentdrinks.innerHTML += drinkcard
        });

    });
    
})