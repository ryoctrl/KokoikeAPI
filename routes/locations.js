const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', async (req, res, next) => {
    const uid = req.query.uid;
    if(!uid) {
        res.status(404);
        res.json({
            err: true,
            message: 'uid is not defined'
        });
        return;
    }

    const locations = await locationController.findAllByUserId(uid).catch((err) => {
        console.error(err);
        return null;
    });

    if(locations) {
        res.json(locations);
    } else {
        res.status(500);
        res.json({
            err: true,
            message: 'unknown error occured when fetching location records'
        });
    }
});

router.delete('/', async (req, res, next) => {
    const locationID = req.body.id;

    const deletedLocation =  await locationController.deleteLocation(locationID).catch((err) => {
        console.error(err);
        return null;
    });

    const result = {};

    if(deletedLocation) {
        res.status(200);
        result.status = 200;
        result.message = 'succeeded';
    } else {
        res.status(500);
        result.status = 500;
        result.message = 'failed';
    }

    res.json(result);
    return;
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
