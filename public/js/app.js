console.log('Client side js file loaded.')
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
*/


const weatherForm = document.querySelector('form')
const searchString = document.querySelector('input')
const paraOne = document.querySelector('#m1')
const paraTwo = document.querySelector('#m2')

paraOne.textContent = ''
paraTwo.textContent = ''

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = searchString.value
    paraOne.textContent = 'Loading ...'

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                //console.log(data.error)
                paraOne.textContent = data.error
                paraTwo.textContent = ''
            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                paraOne.textContent = data.location 
                paraTwo.textContent = data.forecast
            }
            
        })
    })
})