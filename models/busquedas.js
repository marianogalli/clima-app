const axios = require('axios')

class Busquedas{

    historial=[];

    constructor(){
        //TODO: leer BD si existe
    }

    get paramsMapbox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    async ciudad(lugar=''){

        try {

            
            const instance=axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const respuesta=await instance.get();
            return respuesta.data.features.map(lugar=>({

                id:lugar.id,
                nombre:lugar.place_name,
                lng:lugar.center[0],
                lat:lugar.center[1]                
             }))  
                
        } catch (error) {
            throw('error: ',error)
        }
    }

    get paramsWeather(){
        return {
            appid:process.env.OPENWEATHER_KEY,
            units:'metric',
            lang:'es'
        }
    }

    async climarLugar(lat,lon){

        try {
            
            const instance=axios.create({
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params:{ ...this.paramsWeather,lat,lon}                                    
            })
    
            const resultado=await instance.get();
            const desc=resultado.data.weather[0].description;
            const{temp, temp_min, temp_max}=resultado.data.main;

            return{
                desc,
                temp,
                temp_min,
                temp_max
            }
            
        } catch (error) {
            console.log('error: ',error);
        }     

    }



}


module.exports=Busquedas;