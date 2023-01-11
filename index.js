const express = require('express')
const mongoose = require('mongoose')
walk = require('walk'),
app = express(),
ALLfiles = [];
const path = require('path')
const catRoutes = require('./routes/cats')
const exphbs = require('express-handlebars')
const mdl = require('./middlewares')



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running')

})
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(catRoutes)

app.get('/users', mdl.logger, (req, res) => {
    res.send('User List')
})

app.use(express.static('uploads'));

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://AstaM:Iv9eV1FxPmGZ9eZZ@cluster0.jjjtq1f.mongodb.net/cats', {
                useNewUrlParser: true
            }
        )
            console.log('Server is running')
        
    } catch (e) {
        console.log(e)
    }
}

start()


