const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('../public/js/utils/forecast')
const geocode = require('../public/js/utils/geocode')

const app = express();

// Define paths for Express config
const myPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(myPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bryce'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Bryce'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bryce'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must include an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return  res.send({ error }); 
        } 
        
        forecast(latitude, longitude, (error, data) => {
            if (error) {
               return  res.send({ error })
            } 
            res.send({
                location,
                address: req.query.address,
                forecast: data
            })
        });    
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error 404. Page not found.',
        message: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error 404. Page not found.',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
})