import  { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
import fs, {promises} from 'fs'; 
import {readFile} from 'fs/promises';
import dotenv from "dotenv";

dotenv.config({path: "./.env"})

const exportSheet = async (googleID, credencialesSheet, title, data) =>{
    const documento = new GoogleSpreadsheet(googleID);
    await documento.useServiceAccountAuth(credencialesSheet);                
    await documento.loadInfo();

    const sheet = documento.sheetsByTitle[title];                                               //Selecciona la hoja a la cual plasmará el contenido, el valor se lo pasa por parámetro para no repetir
    await sheet.clearRows();                                                                    //Limpia las columnas                
    //await sheet.clear("A2:I1291")

    await sheet.addRows(data);                                                            //Añade la información del array                
};
const dateToday = (paramPosibleFecha, numeroHorasARestar)=>{
    /* Horarios */
    let now         = new Date(paramPosibleFecha);
    let nowNumber   = now.getTime();
    let horas       = now.getHours();
    let minutos     = ("0" + now.getMinutes() ).slice(-2);                                      //Esto para que el formato de minuto sea "09" y no "9"
    let seconds     = ("0" + now.getSeconds() ).slice(-2);
    let horaMinuto  = " " + horas + ":" + minutos + ":" + seconds;
    let dia         = ("0" + now.getDate()).slice(-2);                                          //Esto para que el formato de hora sea "09" y no "9"
    let anio        = now.getFullYear();
    let mes         = now.getMonth() + 1;
    let hora_hoy    = dia + "/" + mes + "/" + anio;
    let date        = hora_hoy + " " + horaMinuto;
    let completeDate = hora_hoy + " " + date

    
    //Código por si se tiene que restar horas por diferencia horaria
    let horaMls     = (numeroHorasARestar * 60) * 60000
    let nowMenosHoras = new Date(nowNumber - horaMls);
    let horasMenosHoras       = nowMenosHoras.getHours();
    let minutosMenosHoras     = ("0" + nowMenosHoras.getMinutes() ).slice(-2);                                      //Esto para que el formato de minuto sea "09" y no "9"
    let secondsMenosHoras     = ("0" + nowMenosHoras.getSeconds() ).slice(-2);
    let horaMinutoMenosHoras  = " " + horasMenosHoras + ":" + minutosMenosHoras + ":" + secondsMenosHoras;
    let diaMenosHoras         = ("0" + nowMenosHoras.getDate()).slice(-2);                                          //Esto para que el formato de hora sea "09" y no "9"
    let anioMenosHoras        = nowMenosHoras.getFullYear();
    let mesMenosHoras         = nowMenosHoras.getMonth() + 1;
    let hora_hoyMenosHoras    = diaMenosHoras + "/" + mesMenosHoras + "/" + anioMenosHoras;
    let dateMenosHoras        = hora_hoyMenosHoras + "  " + horaMinutoMenosHoras;
    let completeDateMenosHoras = hora_hoyMenosHoras + " " + dateMenosHoras
    return {now, nowNumber, nowMenosHoras, horas, minutos, horaMinuto, dia, anio, mes, hora_hoy, date, completeDate, horasMenosHoras,minutosMenosHoras,secondsMenosHoras,horaMinutoMenosHoras,diaMenosHoras,anioMenosHoras,mesMenosHoras,hora_hoyMenosHoras,dateMenosHoras, completeDateMenosHoras}
    
}

const llamadaAPI = async(methodType, url, head, params)=>{
    let apiCall = await axios({
            method: methodType,
            url: url,       //Se pasa por la url el número de offset actualizado, acorde a cada vuelta "https://api.mercadolibre.com/sites/MLA/search?seller_id=394109866"
            headers: head, 
            params: params
    }).catch(function (error) { 
        console.log("Nada por aquí mi loco");
    }); 
    return apiCall;
}

const CategoriesBucle = async(numeroVuelta,i, url, primerArrayContenedor, categoryID_PrimerArray, categoryName_PrimerArray, segundoArrayContenedor)=>{
        console.log(`${numeroVuelta} Script, vuelta: N°` + i + "de " + primerArrayContenedor.length);
        
        console.log(url + "/" + categoryID_PrimerArray);
        const apiCallCategoryDetail = await llamadaAPI("get", `${url + categoryID_PrimerArray}`) //Primero recorro cada categoría del componente padre
        const respuestaData = apiCallCategoryDetail.data?.children_categories                                                        //Luego accedo a sus categorías hijas
        

        for (let indexChikito = 0; indexChikito < respuestaData.length; indexChikito++) {                                           //Luego recorro c/categoría hija 

            const callCatalog_domain = await llamadaAPI("get", `${url + respuestaData[indexChikito]?.id}`)         //Hago una llamada con el id de cada categoría hija para sacar el catalog_domain
            const responseCatalog_domain = callCatalog_domain.data;
            

            segundoArrayContenedor.push({
                categoryID: respuestaData[indexChikito]?.id,                                                      //Se obtiene el MLA
                categoryName: respuestaData[indexChikito]?.name,                                                  //Se extrae el Nombre y se almacena en el atributo "categoryName" para uso interno
                itemsPorCategoria: respuestaData[indexChikito]?.total_items_in_this_category,                      //Cantidad de items por categoría (mepa que se va a ir)
                catalog_domain: responseCatalog_domain?.settings?.catalog_domain,
                root: `${categoryID_PrimerArray} > ${respuestaData[indexChikito]?.id}`,          //Enrutamiento de MLA (id's)
                rootName: `${categoryName_PrimerArray} > ${respuestaData[indexChikito]?.name}`,    //Enrutamiento de Nombres
            })
            
        }
}
const savingData = async(arrayConDatos, nombreArchivoCSV)=>{
    let headers = Object.keys(arrayConDatos[0] || {}).join(' | ');

    let respuestaData = arrayConDatos?.map ((elementos) => { //solo accedemos a id y name de la respuesta a traves de map
            return {
                categoryID_1: elementos?.categoryID_1,
                categoryName_1: elementos?.categoryName_1,
                catalog_domain1: elementos?.catalog_domain1,
                categoryID_2: elementos?.categoryID_2,
                categoryName_2: elementos?.categoryName_2,
                itemsPorCategoria2: elementos?.itemsPorCategoria2,
                catalog_domain2: elementos?.catalog_domain2,
                root2: elementos?.root2,
                rootName2: elementos?.rootName2,
                categoryID_3: elementos?.categoryID_3,
                categoryName_3: elementos?.categoryName_3,
                itemsPorCategoria3: elementos?.itemsPorCategoria3,
                catalog_domain3: elementos?.catalog_domain3,
                root3: elementos?.root3,
                rootName4: elementos?.rootName4,
                categoryID_4: elementos?.categoryID_4,
                categoryName_4: elementos?.categoryName_4,
                itemsPorCategoria4: elementos?.itemsPorCategoria4,
                catalog_domain4: elementos?.catalog_domain4,
                root4: elementos?.root4,
                rootName4: elementos?.rootName4,
                categoryID_5: elementos?.categoryID_5,
                categoryName_5: elementos?.categoryName_5,
                itemsPorCategoria5: elementos?.itemsPorCategoria5,
                catalog_domain5: elementos?.catalog_domain5,
                root5: elementos?.root5,
                rootName5: elementos?.rootName5,
                categoryID_6: elementos?.categoryID_6,
                categoryName_6: elementos?.categoryName_6,
                itemsPorCategoria6: elementos?.itemsPorCategoria6,
                catalog_domain6: elementos?.catalog_domain6,
                root6: elementos?.root6,
                rootName6: elementos?.rootName6,
                categoryID_7: elementos?.categoryID_7,
                categoryName_7: elementos?.categoryName_7,
                itemsPorCategoria7: elementos?.itemsPorCategoria7,
                catalog_domain7: elementos?.catalog_domain7,
                root7: elementos?.root7,
                rootName7: elementos?.rootName7,
                idPromotion: elementos?.idPromotion,
                typePromotion: elementos?.typePromotion,
                deadline_date: elementos?.deadline_date,
                name: elementos?.name,
                benefits_type: elementos?.benefits_type,
                benefits_meliPercent: elementos?.benefits_meliPercent,
                benefits_sellerPercent: elementos?.benefits_sellerPercent,
                idItem: elementos?.idItem,
                status: elementos?.status,
                price: elementos?.price,
                original_price: elementos?.original_price,
                offer_id: elementos?.offer_id,
                meli_percentage: elementos?.meli_percentage,
                seller_percentage: elementos?.seller_percentage,
                start_date: elementos?.start_date,
                end_date: elementos?.end_date,
                Timestamp: elementos?.timestamp,
            }
    }).map((elementos) => Object?.values(elementos)?.join('|')) // tomamos solos los valores y los separamos con comas
    .join('\n'); // le damos un salto de linea
    //En este array sumamos los headers, un salto de linea, y los productos

    //En este array sumamos un salto de linea, y los productos 
    const arrayInCSVFormat = [headers + '\n',respuestaData];
    await fs.promises.writeFile(`./data/${nombreArchivoCSV}.csv`, arrayInCSVFormat);
}
//Exportamos un objeto, y adentro mencionamos las variables con funciones las cuales exportamos
export {exportSheet, dateToday, llamadaAPI,CategoriesBucle, savingData}