import axios from 'axios';
import dotenv from "dotenv";
import  { GoogleSpreadsheet } from 'google-spreadsheet';
import informationTokensStatus from './credentials/credenciales_definitivas.json' assert { type: "json" };
import { exportSheet, dateToday, llamadaAPI, pasteGS, savingDataPreguntasYRespuestas, getDataCSV_PreguntasYRespuestas } from './funciones.js';

dotenv.config({path: "./.env"})

async function AllCategories(){
    const arrayContenedorTotal   = [];
    const arrayContenedorCategory1   = [];
    const arrayContenedorCategory2   = [];
    const arrayContenedorCategory3   = [];
    const arrayContenedorCategory4   = [];
    const arrayContenedorCategory5   = [];
    const arrayContenedorCategory6   = [];
    const arrayContenedorCategory7   = [];

    const apiCall = await llamadaAPI("get", process.env.ALL_CATEGORIES)
    /* const apiCall = await axios({
        method: "get",
        url: process.env.ALL_CATEGORIES,       //Se pasa por la url el número de offset actualizado, acorde a cada vuelta "https://api.mercadolibre.com/sites/MLA/search?seller_id=394109866"
    }).catch(function (error) { 
        console.log("Nada por aquí mi loco");
    });  */
    const respuestaAPI = apiCall.data
    for (let i = 0; i < respuestaAPI.length; i++) {

        arrayContenedorCategory1.push({
            categoryID_1: respuestaAPI[i].id,
            categoryName_1: respuestaAPI[i].name
        }) 
    }

    /* Acá hacer un for con los id del category padre, para obtener las categorías hijas con el siguiente endpoint:
     https://api.mercadolibre.com/categories/MLA79242
     */
    //Crear arrays para c/level y dsp concatenar los arrays
    for (let i = 0; i < arrayContenedorCategory1.length; i++) {
        console.log("Primera vuelta: N°" + i + "de " + arrayContenedorCategory1.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory1[i].categoryID_1}`)
        const respuestaData = apiCallCategoryDetail.data.children_categories
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {
            //const element = array[indexChikito];
            arrayContenedorCategory2.push({
                categoryID_2: respuestaData[indexChikito]?.id,
                categoryName_2: respuestaData[indexChikito]?.name,
                itemsPorCategoria2: respuestaData[indexChikito]?.total_items_in_this_category
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory2.length; i++) {
        console.log("Primera vuelta: N°" + i + "de " + arrayContenedorCategory2.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory2[i].categoryID_2}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData?.length; indexChikito++) {
            //const element = array[indexChikito];
            arrayContenedorCategory3.push({
                categoryID_3: respuestaData[indexChikito]?.id,
                categoryName_3: respuestaData[indexChikito]?.name,
                itemsPorCategoria3: respuestaData[indexChikito]?.total_items_in_this_category
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory3.length; i++) {
        console.log("Primera vuelta: N°" + i + "de " + arrayContenedorCategory3.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory3[i].categoryID_3}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData?.length; indexChikito++) {
            //const element = array[indexChikito];
            arrayContenedorCategory4.push({
                categoryID_4: respuestaData[indexChikito]?.id,
                categoryName_4: respuestaData[indexChikito]?.name,
                itemsPorCategoria4: respuestaData[indexChikito]?.total_items_in_this_category
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory4.length; i++) {
        console.log("Primera vuelta: N°" + i + "de " + arrayContenedorCategory4.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory4[i].categoryID_4}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData?.length; indexChikito++) {
            //const element = array[indexChikito];
            arrayContenedorCategory5.push({
                categoryID_5: respuestaData[indexChikito]?.id,
                categoryName_5: respuestaData[indexChikito]?.name,
                itemsPorCategoria5: respuestaData[indexChikito]?.total_items_in_this_category
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory5.length; i++) {
        console.log("Primera vuelta: N°" + i + "de " + arrayContenedorCategory5.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory5[i].categoryID_5}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData?.length; indexChikito++) {
            //const element = array[indexChikito];
            arrayContenedorCategory6.push({
                categoryID_6: respuestaData[indexChikito]?.id,
                categoryName_6: respuestaData[indexChikito]?.name,
                itemsPorCategoria6: respuestaData[indexChikito]?.total_items_in_this_category
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory6.length; i++) {
        console.log("Primera vuelta: N°" + i + "de " + arrayContenedorCategory6.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory6[i].categoryID_6}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData?.length; indexChikito++) {
            //const element = array[indexChikito];
            arrayContenedorCategory7.push({
                categoryID_7: respuestaData[indexChikito]?.id,
                categoryName_7: respuestaData[indexChikito]?.name,
                itemsPorCategoria7: respuestaData[indexChikito]?.total_items_in_this_category
            })
            
        }
    }

    const fusionPrimerSegundoArray = arrayContenedorCategory1.concat(arrayContenedorCategory2)
    const fusionTercerArray = fusionPrimerSegundoArray.concat(arrayContenedorCategory3)
    const fusionCuartoArray = fusionTercerArray.concat(arrayContenedorCategory4)
    const fusionQuintoArray = fusionCuartoArray.concat(arrayContenedorCategory5)
    const fusionSextoArray = fusionQuintoArray.concat(arrayContenedorCategory6)
    const largoTotalArray = fusionSextoArray.concat(arrayContenedorCategory7)
    
    
    console.log("Largo total:");
    console.log(fusionPrimerSegundoArray);
    
    for (let i = 0; i < largoTotalArray.length; i++) {
        arrayContenedorTotal.push({
            categoryID_1: arrayContenedorCategory1[i]?.categoryID_1,
            categoryName_1: arrayContenedorCategory1[i]?.categoryName_1,
            categoryID_2: arrayContenedorCategory2[i]?.categoryID_2,
            categoryName_2: arrayContenedorCategory2[i]?.categoryName_2,
            itemsPorCategoria2: arrayContenedorCategory2[i]?.itemsPorCategoria2,
            categoryID_3: arrayContenedorCategory3[i]?.categoryID_3,
            categoryName_3: arrayContenedorCategory3[i]?.categoryName_3,
            itemsPorCategoria3: arrayContenedorCategory3[i]?.itemsPorCategoria3,
            categoryID_4: arrayContenedorCategory4[i]?.categoryID_4,
            categoryName_4: arrayContenedorCategory4[i]?.categoryName_4,
            itemsPorCategoria4: arrayContenedorCategory4[i]?.itemsPorCategoria4,
            categoryID_5: arrayContenedorCategory5[i]?.categoryID_5,
            categoryName_5: arrayContenedorCategory5[i]?.categoryName_5,
            itemsPorCategoria5: arrayContenedorCategory5[i]?.itemsPorCategoria5,
            categoryID_6: arrayContenedorCategory6[i]?.categoryID_6,
            categoryName_6: arrayContenedorCategory6[i]?.categoryName_6,
            itemsPorCategoria6: arrayContenedorCategory6[i]?.itemsPorCategoria6,
            categoryID_7: arrayContenedorCategory7[i]?.categoryID_7,
            categoryName_7: arrayContenedorCategory7[i]?.categoryName_7,
            itemsPorCategoria7: arrayContenedorCategory7[i]?.itemsPorCategoria7,
        })
    }

    await exportSheet(process.env.GOOGLE_ID,informationTokensStatus,"main",arrayContenedorTotal)
    
    return arrayContenedorTotal;
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