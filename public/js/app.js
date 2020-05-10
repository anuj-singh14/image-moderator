const imageForm = document.querySelector('form')
const imageurl = document.querySelector('input')
const pre = document.querySelector('#json')
// console.log('Hello')

imageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = imageurl.value

    pre.textContent = 'Loading...'
    
    fetch('/moderator?imageurl=' + url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return pre.textContent = data.error
            }

            pre.textContent = JSON.stringify(data, undefined, 2)
        })
    })
})

// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const loc = search.value
    
//     messageOne.textContent = 'Loading...'
//     messageTwo.textContent = ''

//     fetch('/weather?address=' + loc).then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 return messageOne.textContent = data.error
//             }
    
//             messageOne.textContent = data.location
//             messageTwo.textContent = data.forecast
//         })
//     })
// })