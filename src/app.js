const path = require('path')
const express = require('express')
const hbs = require('hbs')
const clarifai = require('clarifai')

const clarifaiApi = new clarifai.App({
    apiKey: '641529200e4742079d67230d6c230abc'
})

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Image Moderator'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/moderator', (req, res) => {
    if (!req.query.imageurl) {
        return res.send({ error: 'You must provide an image url!' })
    }

    const url = req.query.imageurl
    const result = []
    clarifaiApi.models
    .predict('d16f390eb32cad478c7ae150069bd2c6', url)
    .then(data => {
        obj = data.outputs[0].data.concepts;
        Object.keys(obj).forEach(key => {
            let s = `Probability of `+ obj[key].name 
                    + ' is ' + obj[key].value;
            result.push(s);
        })
        res.send(result);
    })
    .catch(err => res.send({ error: 'Image url is invalid!' }))
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
    })
})

app.listen(port, () => { 
    console.log('Server is up on port ' + port + '.')
})
