import axios from 'axios';
import dotenv from "dotenv";
import  { GoogleSpreadsheet } from 'google-spreadsheet';
import informationTokensStatus from './credentials/credenciales_definitivas.json' assert { type: "json" };
import { exportSheet, dateToday, llamadaAPI, pasteGS, savingDataPreguntasYRespuestas, getDataCSV_PreguntasYRespuestas } from './funciones.js';

dotenv.config({path: "./.env"})

async function AllCategories(){
    const arrayContenedor   = [];
    const objetoContenedor  = {};

    const apiCall = await llamadaAPI("get", process.env.ALL_CATEGORIES)
    /* const apiCall = await axios({
        method: "get",
        url: process.env.ALL_CATEGORIES,       //Se pasa por la url el número de offset actualizado, acorde a cada vuelta "https://api.mercadolibre.com/sites/MLA/search?seller_id=394109866"
    }).catch(function (error) { 
        console.log("Nada por aquí mi loco");
    });  */
    const respuestaAPI = apiCall.data
    for (let i = 0; i < respuestaAPI.length; i++) {

        arrayContenedor.push({
            categoryID_1: respuestaAPI[i].id,
            categoryName_1: respuestaAPI[i].name
        }) 
    }

    /* Acá hacer un for con los id del category padre, para obtener las categorías hijas con el siguiente endpoint:
     https://api.mercadolibre.com/categories/MLA79242
     */
    for (let i = 0; i < arrayContenedor.length; i++) {
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedor[i].categoryID_1}`)
        console.log(apiCallCategoryDetail.data.children_categories);
    }


    await exportSheet(process.env.GOOGLE_ID,informationTokensStatus,"main",arrayContenedor)
    
    return arrayContenedor;
}

AllCategories()


/* const exportSheet = async () =>{
        const documento = new GoogleSpreadsheet(process.env.GOOGLE_ID);
        await documento.useServiceAccountAuth(informationTokensStatus);                
        await documento.loadInfo();
    
        const sheet = documento.sheetsByTitle["main"];                                               //Selecciona la hoja a la cual plasmará el contenido, el valor se lo pasa por parámetro para no repetir
        await sheet.clearRows();                                                                    //Limpia las columnas                
        //await sheet.clear("A2:I1291")
    
        await sheet.addRows(arrayContenedor);                                                            //Añade la información del array                
    };
    exportSheet() */