const {Router, application} = require('express')
const Cat = require('../models/Cats')
const router = Router()
const mdlw = require('../middlewares')

var catList = [{name: 'Baltas'}, {name: 'Suskis'}, {name: 'Pienius'}]
var dogPicture = [{name: 'dog.jpg', dogName: 'Pufis', likes: 0 }, 
                {name: 'dog1.jpg', dogName: 'Lora', likes: 0}, 
                {name: 'dog2.jpg', dogName: 'Lotas', likes: 0}, 
                {name: 'dog3.jpg', dogName: 'Smelius', likes: 0}, 
                {name: 'dog4.jpg', dogName: 'Lokis', likes: 0} ]


router.get('/', (req, res) => {
    res.render('home', {
        isHome: true
    })
})
router.get('/cats', (req, res) => {
    res.render('cats', {
        title: 'Cat List',
        isCats: true,
        catList
    })
})

router.get('/dog', (req, res) => {
    // Get all pictures
    // const allDogPictures = dogPicture;
      // Get a random set of 3 pictures
      const randomDogPictures = dogPicture.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.render('dog', {
        isDog: true,
        dogPicture: randomDogPictures,
        // dogPicture: allDogPictures,
        typeImg: true,
        showRandomButton: true
    });
});

router.post('/dog/:name/like', (req, res) => {
    const name = req.params.name;
    const picture = dogPicture.find(picture => picture.name === name);
    picture.likes++;
    res.send({ status: picture.likes });
});

router.post('/dog/:name/dislike', (req, res) => {
    const name = req.params.name;
    const picture = dogPicture.find(picture => picture.name === name);
    picture.likes--;
    res.send({ status: picture.likes } );
});
router.get('/remove/:name', (req, res) => {
    const name = req.params.name

    catList = catList.filter(function(el) { return el.name != name; });
    
    res.redirect('/cats')
})
router.get('/cats/create', async (req, res) => {
    const cat2 = new Cat({
        name: 'Laikas',
        owner: 'Asta'
    })

    await cat2.save()

    res.send('ok')
})
router.get('/cats', async (req, res) => {

    const catList = await Cat.find({}).lean()


    res.render('cats', {
        title: 'Cat List',
        isCats: true,
        catList
    })
})



module.exports = router