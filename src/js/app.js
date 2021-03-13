let currentPage = window.location.pathname;

let searchCocktail = document.getElementsByTagName('form');
// console.log(searchCocktail[0])

let loadrecentdrinks = document.querySelector('#card-container');

let buildDrinkCard = async (drink) => {
    const article = document.createElement('article')
    article.setAttribute('id', `${drink.idDrink}`)
    article.setAttribute('class', 'drinkDetails overflow-hidden rounded-lg shadow-lg')

    const img = document.createElement('img')
    img.setAttribute('alt', `${drink.strDrink}`)
    img.setAttribute('src', `${drink.strDrinkThumb}`)
    img.setAttribute('class', 'block h-auto w-full')

    const header = document.createElement('header')
    header.setAttribute('class', 'text-center leading-tight p-2 md:p-4')

    const p = document.createElement('p')
    p.setAttribute('class', 'text-lg')

    const drinkName = document.createTextNode(`${drink.strDrink}`)

    p.appendChild(drinkName)
    header.appendChild(p)
    article.appendChild(img)
    article.appendChild(header)

    loadrecentdrinks.appendChild(article)

    article.addEventListener('click', async (event) => {
        let selectedDrink = event.currentTarget.id

        let res = await fetch(`/.netlify/functions/fetchDetails?idQuery=${selectedDrink}`)
        let data = await res.json();

        passTheDetails = data.drinks[0]
        populateDetails(passTheDetails)

    })

}



let populateSearchName = async (searchTerm) => {
    loadrecentdrinks.textContent = ''
    if (searchTerm && typeof searchTerm !== 'undefined' && searchTerm !== "" && searchTerm.trim().length !== 0) { //!/\s/.test(searchTerm) && searchTerm !== null
        res = await fetch(`/.netlify/functions/searchCocktailName?nameQuery=${searchTerm}`)
        const data = await res.json();
        console.log(data)

        if (data.drinks == null) {
            const p = document.createElement('p')
            p.setAttribute('class', 'text-lg')
            p.textContent = `Search results not found`

            loadrecentdrinks.appendChild(p)
        } else {
            data.drinks.forEach(drink => {
                buildDrinkCard(drink)
            })
        }

        


    } else {
        const p = document.createElement('p')
        p.setAttribute('class', 'text-lg')
        p.textContent = `Search results not found`

        loadrecentdrinks.appendChild(p)
    }

    // return data;
}

let populateRecent = async () => { //async?
    res = await fetch(`/.netlify/functions/fetch-recent`);
    const data = await res.json();
    data.drinks.forEach(drink => {
        buildDrinkCard(drink)
    })

    return data;
}

let populateRandom = async () => {
    res = await fetch(`/.netlify/functions/fetchRandom`);
    const data = await res.json();
    data.drinks.forEach(drink => {
        buildDrinkCard(drink)
    })

    return data;
}

let populatePopular = async () => {
    res = await fetch(`/.netlify/functions/fetch-popular`);
    const data = await res.json();
    data.drinks.forEach(drink => {
        buildDrinkCard(drink)
    })

    return data;
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
}

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal()
    }
};

function toggleModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('hidden')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}

let populateDetails = async (passTheDetails) => {

    var ingredients = document.querySelector('#ingredients-container')
    ingredients.textContent = '';

    var modalTitle = document.querySelector('#modal-title')
    modalTitle.textContent = `${passTheDetails.strDrink}`

    var modalImg = document.querySelector('#modal-img')
    modalImg.src = `${passTheDetails.strDrinkThumb}`
    modalImg.setAttribute('class', 'rounded-md')

    var modalDesc = document.querySelector('#modal-desc')
    modalDesc.textContent = `${passTheDetails.strInstructions}`

    let ingredientName = [];
    let ingredientQty = [];

    for (var key in passTheDetails) {

        if (passTheDetails[key] !== null && passTheDetails[key] !== "" && key.includes('Ingredient')) {
            ingredientName.push(passTheDetails[key]);
        }

        if (passTheDetails[key] !== null && passTheDetails[key] !== "" && key.includes('Measure')) {
            ingredientQty.push(passTheDetails[key]);
        }
    }
    for (let i = 0; i < ingredientName.length; i++) {
        let button = document.createElement('button')
        button.textContent = `${ingredientQty[i] + ' ' + ingredientName[i]}`
        button.setAttribute('class', 'focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50')

        ingredients.appendChild(button)
    }

    toggleModal()

}

if (currentPage.includes('recent')) {
    populateRecent(); //receives drinks array, after populateRecent runs
} else if (currentPage.includes('random')) {
    populateRandom();
} else if (currentPage.includes('popular')) {
    populatePopular();
} else if (currentPage === '/') {
    // searchCocktail[0].addEventListener('submit', (event) => {
    //     event.preventDefault()
    //     let searchTerm = populateSearchName(document.getElementById('userInput').value)
    //     populateSearchName(searchTerm)


    // })
    searchCocktail[0].onsubmit = function (event) {
        let searchTerm = document.getElementById('userInput').value
        populateSearchName(searchTerm)

        return false
    }

}