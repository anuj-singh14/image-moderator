const imageForm = document.querySelector('form')
const imageurl = document.querySelector('input')
const pre = document.querySelector('#json')
const output = document.querySelector('#output');

imageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = imageurl.value

    // pre.textContent = 'Loading...'
    output.innerHTML='Loading...';
    fetch('/moderator?imageurl=' + url).then((response) => {
        response.json().then((data) => {
            output.innerHTML='';
            if (data.error) {
               output.innerHTML=data.error;
            }
            data.map(result=>{
                const newptag=document.createElement('p');
                newptag.innerHTML=result;
                output.appendChild(newptag);
            })

            // pre.textContent = JSON.stringify(data, undefined, 2)
        })
    })
})