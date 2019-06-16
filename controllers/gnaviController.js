const axios = require('axios');
const GNAVI_API_KEY = process.env.GNAVI_API_KEY;
const ENDPOINTS = {
    DOMAIN: 'https://api.gnavi.co.jp/',
    SHOPS: 'RestSearchAPI/v3/',
    LARGEAREA: 'master/GAreaLargeSearchAPI/v3/',

}

const invokeRequest = async function(endpoint, params) {
    const url = ENDPOINTS.DOMAIN + endpoint;
    return await axios.get(url, params);
}

module.exports = {
    shopSearch: async function(word, largeArea) {
        const parameters = {
            params: {
                keyid: GNAVI_API_KEY,
                name: word,
            }
        };

        if(largeArea) {
            parameters.params.areacode_l = largeArea;
        }
        const res = await invokeRequest(ENDPOINTS.SHOPS, parameters);
        return res.data;
    },
    getLeargeAreaKey: async function(area) {
        const parameters = {
            params: {
                keyid: GNAVI_API_KEY,
            }
        };

        let results = await invokeRequest(ENDPOINTS.LARGEAREA, parameters);
        results = results.data.garea_large
        for(result of results) {
            if (result.areaname_l.indexOf(area) != -1) {
                return result;
            }
        }
        return null;
    }
}
