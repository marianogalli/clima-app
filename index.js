require('dotenv').config()

const {leerConsola,mostrarMenu, pausa, listarLugares}=require('./helpers/inquirer')
const Busquedas=require('./models/busquedas')



console.log(process.env.MAPBOX_KEY);


const main=async()=>{

    let opc;
    const busquedas=new Busquedas();

    do{

        opc=await mostrarMenu();

        switch (opc) {
            
            case 1:
                //Mostrar Mensaje
                const termino=await leerConsola('Ingrese la ciudad')
                const lugares=await busquedas.ciudad(termino)
                
                //Buscar lugares
                const id=await listarLugares(lugares)
                

                //Seleccionar lugar
                const lugarSeleccionado=lugares.find(l=>l.id==id)
                const {lng,lat}=lugarSeleccionado;
                
                //Clima
                const infoClima=await busquedas.climarLugar(lat,lng);
                //console.log(infoClima);

                //Mostrar resultados
                console.log('\n Información de la ciudad \n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ',lugarSeleccionado.lng);
                console.log('Temperatura: ',infoClima.temp);
                console.log('Mínima: ',infoClima.temp_min);
                console.log('Máxima: ',infoClima.temp_max);
                console.log('Como está el clima: ', infoClima.desc.green);
            break;

            case 2:
                
            break;
        
            
        }
        
        if(opc!==0) await pausa();


    }while(opc!==0)

    
    
    

}


main();