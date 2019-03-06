const models = require('../models');


module.exports = {
    findAll: async function() {

    },
    findAllByUserId: async function(uid) {
        if(!uid) {
            console.error('uid is not passed');
            return null;
        }

        const q = {
            where: {
                user_id: uid
            }
        };

        const locations = await models.locations.findAll(q)
            .catch(() => null);

        return locations;
    },
    createLocation: async function(uid, name, comments, address, url, tel, lat, lon, imageURL) {
        if(!uid) {
            return;
        }

        if(!lat || !lon) {
            return;
        }

        if(!name || !address || !url || !tel) {
            return;
        }

        const newLocation = {
            user_id: uid,
            name: name,
            comments: comments,
            address: address,
            url: url,
            tel: tel,
            lat: lat,
            lon: lon,
            image_url: imageURL
        };

        const newLocationObj = await models.locations.create(newLocation).catch((err) => { 
            console.error(err);
            return null
        });

        if(!newLocationObj) {
            return null;
        }

        console.log('returning new location object');
        console.log(newLocationObj);
        return newLocationObj;
    },
    deleteLocation: async function(locationID) {
        const q = {
            where: {
                id: locationID
            }
        };

         return await models.locations.destroy(q);
    }
}
