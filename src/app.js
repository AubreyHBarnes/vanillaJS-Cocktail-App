fetch(`/.netlify/functions/fetch-recent`)
    .then(res => {
        console.log(res.json())
    })
