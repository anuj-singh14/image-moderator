const imageForm = document.querySelector('form')
const imageurl = document.querySelector('input')
const output = document.querySelector('#output');
const img = document.querySelector('.portrait')

imageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = imageurl.value;
    img.style.display='none';
    output.innerHTML='Loading...';
    fetch('/moderator?imageurl=' + url).then((response) => {
        response.json().then((data) => {
            output.innerHTML='';
            if (data.error) {
               output.innerHTML=data.error;
                img.src=null;
            }
            else{
            img.src = url;
            img.style.display='';
            data.map(result=>{
                const newptag=document.createElement('p');
                newptag.innerHTML=result;
                output.appendChild(newptag);
            })
        }
        })
    })
})
