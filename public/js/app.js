console.log('Client side JS file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')


weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(forecastData => {
            if(forecastData.error) {
                messageOne.textContent = forecastData.error
                console.log(forecastData.error);
            } else {
                messageOne.textContent = forecastData.location
                messageTwo.textContent = forecastData.forecast
                console.log(forecastData);
            }
        })
    })
})
