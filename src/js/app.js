let loadrecentdrinks = document.querySelector('#card-container');

let populateDrinks = async () => { //async?
    res = await fetch(`/.netlify/functions/fetch-recent`);
    const data = await res.json();
    data.drinks.forEach(drink => {

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
    })

    return data;

}

let attachDetailsEvent = async () => {
    await populateDrinks(); //receives drinks array, after populateDrinks runs


    let detailEvent = loadrecentdrinks.querySelectorAll('.drinkDetails');

    detailEvent.forEach(drink => {
        drink.addEventListener('click', async (event) => {
            let selectedDrink = event.currentTarget.id

            let res = await fetch(`/.netlify/functions/fetchDetails?idQuery=${selectedDrink}`)
            let data = await res.json();

            // event.preventDefault()

            passTheDetails = data.drinks[0]
            populateDetails(passTheDetails)

        })
    })

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
    console.log(passTheDetails)

    var modalTitle = document.querySelector('#modal-title')
    modalTitle.textContent = `${passTheDetails.strDrink}`

    var modalImg = document.querySelector('#modal-img')
    modalImg.src = `${passTheDetails.strDrinkThumb}`

    var modalDesc = document.querySelector('#modal-desc')
    modalDesc.textContent = `${passTheDetails.strInstructions}`

    toggleModal()

}

attachDetailsEvent();