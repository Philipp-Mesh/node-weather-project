const request = require('request')

const forecast = (lat,long,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4fc417b8fc2e2d28599d8a5fdb15e66a&query='+lat+','+long

    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service.',undefined)
        } else if (body.error) {
            callback('Cannot find location on weather service.',undefined)
        } else {

            callback(undefined,'The current temperature is '+ body.current.temperature +' and it is '+ body.current.weather_descriptions[0] +'. It feels like: '+ body.current.feelslike+' degrees Celsius. The wind speed is '+ body.current.wind_speed+' mph and it is coming from the '+ body.current.wind_dir+'.')

            // callback(undefined,{
            //     ct : response.body.current.temperature,
            //     wdesc: response.body.current.weather_descriptions[0],
            //     fl: response.body.current.feelslike
            // })
        }
    }
    
    )
}

// const geocode = (address,callback) =>{

//     const map_url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGhsZWUiLCJhIjoiY2w3ZXVkNGptMDBnYzN2czgxeXlqMzcxcyJ9.ZN-FqdtzooDqEifpCntKcA&limit=1'

//     request({url:map_url, json:true}, (error,response) => {

//         if (error) {
//             callback('Unable to connect.',undefined)
//         } else if (response.body.features.length == 0) {
//             callback('Cannot find location!',undefined)
//         } else {
//             callback(undefined,{
//                 latitude : response.body.features[0].center[1],
//                 longitude : response.body.features[0].center[0],
//                 location : response.body.features[0].place_name
//             })

//         }
//      })
        
// }



module.exports = forecast