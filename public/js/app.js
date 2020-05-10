const imageForm = document.querySelector('form')
const imageurl = document.querySelector('input')
const pre = document.querySelector('#json')

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