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
    shopSearch: async function(word) {
        const parameters = {
            params: {
                keyid: GNAVI_API_KEY,
                name: word,
            }
        };
        const res = await invokeRequest(ENDPOINTS.SHOPS, parameters);
        return res.data;
    },
    getLeargeAreas: async function(word) {
        return await invokeRequest(ENDPOINTS.LARGEAREA, {});
    }


}
