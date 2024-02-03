const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express()

const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Set up handlebars engine and views location
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve


app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Ishara Maduranga'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name:'Ishara Maduranga'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help Page',
        helpText:'This is some help full text .',
        name:'Ishara Maduranga'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'You must provide an Address!'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, {forecastData}={}) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req, res)=>{
    if (!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:'404',
        name:'Ishara Maduranaga',
        errorMessage:'Help Article Not Found !'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title:'404',
        name:'Ishara Maduranaga',
        errorMessage:'Page Not Found !'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})