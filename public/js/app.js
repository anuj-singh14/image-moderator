const imageForm = document.querySelector('form')
const imageurl = document.querySelector('input')
const pre = document.querySelector('#json')
const output = document.querySelector('#output');
const img = document.querySelector('.portrait')

imageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = imageurl.value
    // img.src = "data:,"

    output.innerHTML='Loading...';
    fetch('/moderator?imageurl=' + url).then((response) => {
        response.json().then((data) => {
            output.innerHTML='';
            if (data.error) {
               output.innerHTML=data.error;
            }

            img.src = url

            data.map(result=>{
                const newptag=document.createElement('p');
                newptag.innerHTML=result;
                output.appendChild(newptag);
            })

            // pre.textContent = JSON.stringify(data, undefined, 2)
        })
    })
})