const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);

});

router.post('/', async (req, res, next) => {
    const uid = req.body.user_id;
    const name = req.body.name;
    const comments = req.body.comments;
    const address = req.body.address;
    const imageURL = req.body.image_url;
    const url = req.body.url;
    const tel = req.body.tel;
    const lat = req.body.lat;
    const lon = req.body.lon;

    const newLocation = await locationController.createLocation(uid, name, comments, address, url, tel, lat, lon, imageURL).catch((err) => {
        console.error(err);
        return null;
    });

    console.log(newLocation);

    if(!newLocation) {
        res.status(500);
        res.json({
            err: true,
            message: 'unknown error occured when create new location'
        });
        return;
    }

    res.status(200);
    res.json(newLocation);
    return;
});

module.exports = router;
