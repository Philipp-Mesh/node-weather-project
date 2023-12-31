const request = require('request')

const geocode = (address,callback) =>{

    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGhsZWUiLCJhIjoiY2w3ZXVkNGptMDBnYzN2czgxeXlqMzcxcyJ9.ZN-FqdtzooDqEifpCntKcA&limit=1'

    request({url, json:true}, (error,{body}) => {

        if (error) {
            callback('Unable to connect.',undefined)
        } else if (body.features.length == 0) {
            callback('Cannot find location!',undefined)
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
        
}

module.exports = geocode