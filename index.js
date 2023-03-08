import dotenv from "dotenv";
import informationTokensStatus from './credentials/credenciales_definitivas.json' assert { type: "json" };
import { exportSheet, dateToday, llamadaAPI, CategoriesBucle } from './funciones.js';

dotenv.config({path: "./.env"})

async function AllCategories(){
    const now = new Date();
    const arrayContenedorTotal   = [];
    const arrayContenedorCategory1   = [];
    const arrayContenedorCategory2   = [];
    const arrayContenedorCategory3   = [];
    const arrayContenedorCategory4   = [];
    const arrayContenedorCategory5   = [];
    const arrayContenedorCategory6   = [];
    const arrayContenedorCategory7   = [];

    const apiCall = await llamadaAPI("get", process.env.ALL_CATEGORIES)
    
    const respuestaAPI = apiCall.data
    console.log(apiCall);
    for (let i = 0; i < respuestaAPI.length; i++) {
        const apiCallCatalog_domain = await llamadaAPI("get", `${process.env.CATEGORY + respuestaAPI[i].id}`)
        const respuestaData = apiCallCatalog_domain.data
        console.log(respuestaData.settings.catalog_domain);
        //console.log(respuestaAPI[i]);
        arrayContenedorCategory1.push({
            categoryID_1: respuestaAPI[i].id,
            categoryName_1: respuestaAPI[i].name,
            catalog_domain1: respuestaData.settings.catalog_domain,
        }) 
    }

        /* Parámetros:
        1°String indicando qué número de array está recorriendo
        2°Indice para recorrer el for
        3°El primer array, que da pie al próximo nivel de categorías (es decir, es la categoría anterior, o "padre")
        4°El Category ID de la categoría "padre"
        5°El Category Name de la categoría "padre" 
        6°El segundo array con categorías (hijo)
        */
    //Primer nivel
    for (let i = 0; i < arrayContenedorCategory1.length; i++) {
        await CategoriesBucle("Primer", i, process.env.CATEGORY, arrayContenedorCategory1, arrayContenedorCategory1[i].categoryID_1, arrayContenedorCategory1[i].categoryName_1, arrayContenedorCategory2);
    }
    console.log(arrayContenedorCategory2);
    const arrayContenedor2 = arrayContenedorCategory2.map(e =>{
        return {
            categoryID_2: e.categoryID,
            categoryName_2: e.categoryName,
            itemsPorCategoria2: e.itemsPorCategoria,
            catalog_domain2: e.catalog_domain,
            root2: e.root,
            rootName2: e.rootName,
        }
    })
    console.log(arrayContenedor2);
    //Segundo Nivel
    for (let i = 0; i < arrayContenedorCategory2.length; i++) {
        await CategoriesBucle("Segundo", i, process.env.CATEGORY, arrayContenedorCategory2, arrayContenedorCategory2[i].categoryID, arrayContenedorCategory2[i].categoryName, arrayContenedorCategory3);
    }
    const arrayContenedor3 = arrayContenedorCategory3.map(e =>{
        return {
            categoryID_3: e.categoryID,
            categoryName_3: e.categoryName,
            itemsPorCategoria3: e.itemsPorCategoria,
            catalog_domain3: e.catalog_domain,
            root3: e.root,
            rootName3: e.rootName,
        }
    })
    //Tercer Nivel
    for (let i = 0; i < arrayContenedorCategory3.length; i++) {
        await CategoriesBucle("Tercer", i, process.env.CATEGORY, arrayContenedorCategory3, arrayContenedorCategory3[i].categoryID, arrayContenedorCategory3[i].categoryName, arrayContenedorCategory4);
    }
    const arrayContenedor4 = arrayContenedorCategory4.map(e =>{
        return {
            categoryID_4: e.categoryID,
            categoryName_4: e.categoryName,
            itemsPorCategoria4: e.itemsPorCategoria,
            catalog_domain4: e.catalog_domain,
            root4: e.root,
            rootName4: e.rootName,
        }
    })
    //Cuarto Nivel
    for (let i = 0; i < arrayContenedorCategory4.length; i++) {
        await CategoriesBucle("Cuarto", i, process.env.CATEGORY, arrayContenedorCategory4, arrayContenedorCategory4[i].categoryID, arrayContenedorCategory4[i].categoryName, arrayContenedorCategory5);
    }
    const arrayContenedor5 = arrayContenedorCategory5.map(e =>{
        return {
            categoryID_5: e.categoryID,
            categoryName_5: e.categoryName,
            itemsPorCategoria5: e.itemsPorCategoria,
            catalog_domain5: e.catalog_domain,
            root5: e.root,
            rootName5: e.rootName,
        }
    })
    //Quinto Nivel
    for (let i = 0; i < arrayContenedorCategory5.length; i++) {
        await CategoriesBucle("Quinto", i, process.env.CATEGORY, arrayContenedorCategory5, arrayContenedorCategory5[i].categoryID, arrayContenedorCategory5[i].categoryName, arrayContenedorCategory6);
    }
    const arrayContenedor6 = arrayContenedorCategory6.map(e =>{
        return {
            categoryID_6: e.categoryID,
            categoryName_6: e.categoryName,
            itemsPorCategoria6: e.itemsPorCategoria,
            catalog_domain6: e.catalog_domain,
            root6: e.root,
            rootName6: e.rootName,
        }
    })
    //Sexto Nivel
    for (let i = 0; i < arrayContenedorCategory6.length; i++) {
        await CategoriesBucle("Sexto", i, process.env.CATEGORY, arrayContenedorCategory6, arrayContenedorCategory6[i].categoryID, arrayContenedorCategory6[i].categoryName, arrayContenedorCategory7);
    }
    const arrayContenedor7 = arrayContenedorCategory7.map(e =>{
        return {
            categoryID_7: e.categoryID,
            categoryName_7: e.categoryName,
            itemsPorCategoria7: e.itemsPorCategoria,
            catalog_domain7: e.catalog_domain,
            root7: e.root,
            rootName7: e.rootName,
        }
    })
       
    console.log(arrayContenedorCategory3);
    console.log("ESTÁ FUNCIONANDO");
   

    const fusionPrimerSegundoArray = arrayContenedorCategory1.concat(arrayContenedor2)
    const fusionTercerArray = fusionPrimerSegundoArray.concat(arrayContenedor3)
    const fusionCuartoArray = fusionTercerArray.concat(arrayContenedor4)
    const fusionQuintoArray = fusionCuartoArray.concat(arrayContenedor5)
    const fusionSextoArray = fusionQuintoArray.concat(arrayContenedor6)
    const largoTotalArray = fusionSextoArray.concat(arrayContenedor7)
    
    
    console.log("Largo total:");
    console.log(fusionPrimerSegundoArray);
    
    for (let i = 0; i < largoTotalArray.length; i++) {
        arrayContenedorTotal.push({
            categoryID_1: arrayContenedorCategory1[i]?.categoryID_1,
            categoryName_1: arrayContenedorCategory1[i]?.categoryName_1,
            catalog_domain1:arrayContenedorCategory1[i]?.catalog_domain1,

            categoryID_2:arrayContenedorCategory2[i]?.categoryID_2,
            categoryName_2:arrayContenedorCategory2[i]?.categoryName_2,
            itemsPorCategoria2:arrayContenedorCategory2[i]?.itemsPorCategoria2,
            catalog_domain2:arrayContenedorCategory2[i]?.catalog_domain2,
            root2:arrayContenedorCategory2[i]?.root2,
            rootName2:arrayContenedorCategory2[i]?.rootName2,

            categoryID_3:arrayContenedorCategory3[i]?.categoryID_3,
            categoryName_3:arrayContenedorCategory3[i]?.categoryName_3,
            itemsPorCategoria3:arrayContenedorCategory3[i]?.itemsPorCategoria3,
            catalog_domain3:arrayContenedorCategory3[i]?.catalog_domain3,
            root3:arrayContenedorCategory3[i]?.root3,
            rootName3:arrayContenedorCategory3[i]?.rootName3,

            categoryID_4:arrayContenedorCategory4[i]?.categoryID_4,
            categoryName_4:arrayContenedorCategory4[i]?.categoryName_4,
            itemsPorCategoria4:arrayContenedorCategory4[i]?.itemsPorCategoria4,
            catalog_domain4:arrayContenedorCategory4[i]?.catalog_domain4,
            root4:arrayContenedorCategory4[i]?.root4,
            rootName4:arrayContenedorCategory4[i]?.rootName4,

            categoryID_5:arrayContenedorCategory5[i]?.categoryID_5,
            categoryName_5:arrayContenedorCategory5[i]?.categoryName_5,
            itemsPorCategoria5:arrayContenedorCategory5[i]?.itemsPorCategoria5,
            catalog_domain5:arrayContenedorCategory5[i]?.catalog_domain5,
            root5:arrayContenedorCategory5[i]?.root5,
            rootName5:arrayContenedorCategory5[i]?.rootName5,

            categoryID_6:arrayContenedorCategory6[i]?.categoryID_6,
            categoryName_6:arrayContenedorCategory6[i]?.categoryName_6,
            itemsPorCategoria6:arrayContenedorCategory6[i]?.itemsPorCategoria6,
            catalog_domain6:arrayContenedorCategory6[i]?.catalog_domain6,
            root6:arrayContenedorCategory6[i]?.root6,
            rootName6:arrayContenedorCategory6[i]?.rootName6,

            categoryID_7:arrayContenedorCategory7[i]?.categoryID_7,
            categoryName_7:arrayContenedorCategory7[i]?.categoryName_7,
            itemsPorCategoria7:arrayContenedorCategory7[i]?.itemsPorCategoria7,
            catalog_domain7:arrayContenedorCategory7[i]?.catalog_domain7,
            root7:arrayContenedorCategory7[i]?.root7,
            rootName7:arrayContenedorCategory7[i]?.rootName7,

            timestamp: dateToday(now).date,
        })
    }

    //sequelize

 
    await exportSheet(process.env.GOOGLE_ID,informationTokensStatus,"Prueba",arrayContenedorTotal)
    
    return arrayContenedorTotal;
}

AllCategories()

/* const apiCall = await axios({
        method: "get",
        url: process.env.ALL_CATEGORIES,       //Se pasa por la url el número de offset actualizado, acorde a cada vuelta "https://api.mercadolibre.com/sites/MLA/search?seller_id=394109866"
    }).catch(function (error) { 
        console.log("Nada por aquí mi loco");
    });  */
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
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
    /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
        /* Dentro de este for, tengo que hacer otro for con el largo que devuelve el "children_Categories" 
        Plasmar la info en arrays separados, y dsp hacer un for con el largo total, y poner toda la data ahí, creando los objetos y todo*/
           /* Crear un nuevo campo que se llame "pathRoot"  
    Añadir la categoría "catalog_domain" (está en settings)
    MLA5725>MLA4711
    MLA5725>MLA417044

    Por otro lado, hacer lo mismo pero con los nombres de las categorías
    Accesorios para Vehículos>Acc. para Motos y Cuatriciclos
    Accesorios para Vehículos

    Hacer lo mismo con el catalog_domain ( < )
    */

    /* Acá hacer un for con los id del category padre, para obtener las categorías hijas con el siguiente endpoint:
     https://api.mercadolibre.com/categories/MLA79242
     */
    //Crear arrays para c/level y dsp concatenar los arrays
    //const CategoriesBucle = async(primerArrayContenedor, categoryID_PrimerArray, categoryName_PrimerArray, segundoArrayContenedor, categoryID, categoryName,itemsPorCategoria, catalog_domain, root,rootName )=>{
    
    /* 
     for (let i = 0; i < arrayContenedorCategory2.length; i++) {
        console.log("Segundo Script vuelta: N°" + i + "de " + arrayContenedorCategory2.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory2[i].categoryID_2}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {                                           //Luego recorro c/categoría hija 

            const callCatalog_domain = await llamadaAPI("get", `${process.env.CATEGORY + respuestaData[indexChikito]?.id}`)         //Hago una llamada con el id de cada categoría hija para sacar el catalog_domain
            const responseCatalog_domain = callCatalog_domain.data;
            

            arrayContenedorCategory3.push({
                categoryID_3: respuestaData[indexChikito]?.id,                                                      //Se obtiene el MLA
                categoryName_3: respuestaData[indexChikito]?.name,                                                  //Se extrae el Nombre y se almacena en el atributo "categoryName" para uso interno
                itemsPorCategoria3: respuestaData[indexChikito]?.total_items_in_this_category,                      //Cantidad de items por categoría (mepa que se va a ir)
                catalog_domain3: responseCatalog_domain?.settings?.catalog_domain,
                root3: `${arrayContenedorCategory2[i].root2} > ${respuestaData[indexChikito]?.id}`,          //Enrutamiento de MLA (id's)
                rootName3: `${arrayContenedorCategory2[i].rootName2} > ${respuestaData[indexChikito]?.name}`,    //Enrutamiento de Nombres
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory3.length; i++) {
        console.log("Tercer Script vuelta: N°" + i + "de " + arrayContenedorCategory3.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory3[i].categoryID_3}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {                                           //Luego recorro c/categoría hija 

            const callCatalog_domain = await llamadaAPI("get", `${process.env.CATEGORY + respuestaData[indexChikito]?.id}`)         //Hago una llamada con el id de cada categoría hija para sacar el catalog_domain
            const responseCatalog_domain = callCatalog_domain.data;
            

            arrayContenedorCategory4.push({
                categoryID_4: respuestaData[indexChikito]?.id,                                                      //Se obtiene el MLA
                categoryName_4: respuestaData[indexChikito]?.name,                                                  //Se extrae el Nombre y se almacena en el atributo "categoryName" para uso interno
                itemsPorCategoria4: respuestaData[indexChikito]?.total_items_in_this_category,                      //Cantidad de items por categoría (mepa que se va a ir)
                catalog_domain4: responseCatalog_domain?.settings?.catalog_domain,
                root4: `${arrayContenedorCategory3[i].root3} > ${respuestaData[indexChikito]?.id}`,          //Enrutamiento de MLA (id's)
                rootName4: `${arrayContenedorCategory3[i].rootName3} > ${respuestaData[indexChikito]?.name}`,    //Enrutamiento de Nombres
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory4.length; i++) {
        console.log("Cuarto Script vuelta: N°" + i + "de " + arrayContenedorCategory4.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory4[i].categoryID_4}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {                                           //Luego recorro c/categoría hija 

            const callCatalog_domain = await llamadaAPI("get", `${process.env.CATEGORY + respuestaData[indexChikito]?.id}`)         //Hago una llamada con el id de cada categoría hija para sacar el catalog_domain
            const responseCatalog_domain = callCatalog_domain.data;
            

            arrayContenedorCategory5.push({
                categoryID_5: respuestaData[indexChikito]?.id,                                                      //Se obtiene el MLA
                categoryName_5: respuestaData[indexChikito]?.name,                                                  //Se extrae el Nombre y se almacena en el atributo "categoryName" para uso interno
                itemsPorCategoria5: respuestaData[indexChikito]?.total_items_in_this_category,                      //Cantidad de items por categoría (mepa que se va a ir)
                catalog_domain5: responseCatalog_domain?.settings?.catalog_domain,
                root5: `${arrayContenedorCategory4[i].root4} > ${respuestaData[indexChikito]?.id}`,          //Enrutamiento de MLA (id's)
                rootName5: `${arrayContenedorCategory4[i].rootName4} > ${respuestaData[indexChikito]?.name}`,    //Enrutamiento de Nombres
            })
            
        }
    }

    for (let i = 0; i < arrayContenedorCategory5.length; i++) {
        console.log("Quinto Script vuelta: N°" + i + "de " + arrayContenedorCategory5.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory5[i].categoryID_5}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories
        
        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {                                           //Luego recorro c/categoría hija 

            const callCatalog_domain = await llamadaAPI("get", `${process.env.CATEGORY + respuestaData[indexChikito]?.id}`)         //Hago una llamada con el id de cada categoría hija para sacar el catalog_domain
            const responseCatalog_domain = callCatalog_domain.data;
            

            arrayContenedorCategory6.push({
                categoryID_6: respuestaData[indexChikito]?.id,                                                      //Se obtiene el MLA
                categoryName_6: respuestaData[indexChikito]?.name,                                                  //Se extrae el Nombre y se almacena en el atributo "categoryName" para uso interno
                itemsPorCategoria6: respuestaData[indexChikito]?.total_items_in_this_category,                      //Cantidad de items por categoría (mepa que se va a ir)
                catalog_domain6: responseCatalog_domain?.settings?.catalog_domain,
                root6: `${arrayContenedorCategory5[i].root5} > ${respuestaData[indexChikito]?.id}`,          //Enrutamiento de MLA (id's)
                rootName6: `${arrayContenedorCategory5[i].rootName5} > ${respuestaData[indexChikito]?.name}`,    //Enrutamiento de Nombres
            })
            
        }
    }

    

    for (let i = 0; i < arrayContenedorCategory6.length; i++) {
        console.log("Último Script vuelta: N°" + i + "de " + arrayContenedorCategory6.length);
        const apiCallCategoryDetail = await llamadaAPI("get", `${process.env.CATEGORY + arrayContenedorCategory6[i].categoryID_6}`)
        const respuestaData = apiCallCategoryDetail?.data?.children_categories

        //console.log(respuestaData);
        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {                                           //Luego recorro c/categoría hija 

            const callCatalog_domain = await llamadaAPI("get", `${process.env.CATEGORY + respuestaData[indexChikito]?.id}`)         //Hago una llamada con el id de cada categoría hija para sacar el catalog_domain
            const responseCatalog_domain = callCatalog_domain.data;
            

            arrayContenedorCategory7.push({
                categoryID_7: respuestaData[indexChikito]?.id,                                                      //Se obtiene el MLA
                categoryName_7: respuestaData[indexChikito]?.name,                                                  //Se extrae el Nombre y se almacena en el atributo "categoryName" para uso interno
                itemsPorCategoria7: respuestaData[indexChikito]?.total_items_in_this_category,                      //Cantidad de items por categoría (mepa que se va a ir)
                catalog_domain7: responseCatalog_domain?.settings?.catalog_domain,
                root7: `${arrayContenedorCategory6[i].root6} > ${respuestaData[indexChikito]?.id}`,          //Enrutamiento de MLA (id's)
                rootName7: `${arrayContenedorCategory6[i].rootName6} > ${respuestaData[indexChikito]?.name}`,    //Enrutamiento de Nombres
            })
            
        }
    }

        De acá en adelante son los nombres de las propiedades de los objetos que habrán en las categorías:
        7°categoryID
        8°categoryName
        9°itemsPorCategoria
        10°catalog_domain
        11°root
        12°rootName
        import axios from 'axios';
import  { GoogleSpreadsheet } from 'google-spreadsheet';

    */
