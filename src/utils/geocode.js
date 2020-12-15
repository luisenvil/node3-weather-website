const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVpc2VudmlsOTYiLCJhIjoiY2tpa3dscDdiMGUzbDJycXI1MHlpc2VldyJ9.-kfKH5ruWXKgR-zhUxgLrg&limit=1'
    const options = {
        url,
        json : true
    }

    request(options, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geocoding service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode