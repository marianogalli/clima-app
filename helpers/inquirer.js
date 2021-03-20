const inquirer=require('inquirer');
require('colors')

const preguntas=[
    {
        type:'list',
        name:'opc',
        message:'Qué desea hacer?',
        choices:[
            {
                name:`${'1.'.green} Buscar ciudad`,
                value:1
            },
            {
                name:`${'2.'.green} Historial`,
                value:2
            },
            {
                name:`${'0.'.green} Salir`,
                value:0
            }
            

        ]
    }
]

const mostrarMenu=async()=>{

    console.clear();
    
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.gray);
    console.log('===========================\n'.green);

    
    const {opc}= await inquirer.prompt(preguntas)
    return opc;
}


const pausa=async()=>{

    const input={
        type:'input',
        message:`Presiona ${'Enter'.green} para continuar`,
        name:'enter'
    }

    console.log('\n');
    await inquirer.prompt(input);
}


const leerConsola=async(message='')=>{

    const question=[
        {
            type:'input',
            message,
            name:'entrada',
            validate(value){
                if(value.length===0){
                    return 'Ingrese un valor'
                }
                return true;
            }
        }
    ]

    const {entrada}=await inquirer.prompt(question)
    return entrada;
}


const listarLugares=async(lugares=[])=>{

    const choices=lugares.map((lugar,i)=>{

        const idx=`${i+1}.`.green

        return{
           value:lugar.id,
           name:`${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value:'0',
        name:`${'0.'.green} Cancelar`
    })

    const question=[
        {
            type:'list',
            name:'id',
            message:'Seleccione una ciudad',
            choices
        }
    ]


    const {id}=await inquirer.prompt(question)
    return id;

}

const confirmar=async(message)=>{

    const question=[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]

    const {ok}=await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList=async(tareas=[])=>{

    const choices=tareas.map((tarea,i)=>{

        const idx=`${i+1}.`.green

        return{
           value:tarea.id,
           name:`${idx} ${tarea.desc}`,
           checked:(tarea.completadoEn) ? true : false
        }
    })
    
    const question=[
        {
            type:'checkbox',
            name:'ids',
            message:'selecciona una tarea',
            choices
        }
    ]
    const {ids}=await inquirer.prompt(question)
    return ids;

}


module.exports={
    mostrarMenu,
    pausa,
    leerConsola,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}