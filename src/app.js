fetch(`/.netlify/functions/fetch-recent`)
    .then(res => {
        // console.log(res.json())
        return res.json()
        
    })
    .then(data => {
        console.log(data.drinks)
    })

    // function fetchDemo() {
    //     return fetch(countriesUrl).then(function(response) {
    //         return response.json();
    //     }).then(function(json) {
    //         return json;
    //     });
    // }

    // fetchDemo().then(function(result) {
    //     console.log(result);
    // });