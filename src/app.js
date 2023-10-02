const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// express path configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// handlebars setup
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// static directory 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Dynamic Weather',
        location: 'Toronto',
        author:'Gruezi Consulting'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        location: 'Toronto',
        author:'Gruezi Consulting'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        content: 'This is the text of the help page ...',
        location:'Toronto',
        author:'Gruezi Consulting'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Pls provide an address!'
        }) 
    }

    geocode (req.query.address,(error,{latitude,longitude,location} = {})=>{

        if(error) {
            return res.send({
                error:'Cannot geocode this address!'
            })
        }
    
        forecast(latitude,longitude, (error, fcData) => {
            if(error) {
                return res.send({
                error:'Cannot get a forecast for this address!'
                })
            }

            res.send({
                location: location,
                forecast: fcData,
                address: req.query.address
            })
        
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Pls provide a search term!'
        }) 
    }
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        author:'Gruezi Consulting',
        pageContent:'Sorry, there is no such Help Page'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        author:'Gruezi Consulting',
        pageContent:'Sorry, this page does not exist'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})