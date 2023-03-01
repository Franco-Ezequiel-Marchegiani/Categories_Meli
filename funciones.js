import  { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
import fs, {promises} from 'fs'; 
import {readFile} from 'fs/promises'

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
const exportSheetMKTShare = async (google_id,credencialesOrder, sheetTitle1, sheetTitle2, sheetTitle3, sheetTitle4, arrayData) =>{
    const documento = new GoogleSpreadsheet(google_id);
    await documento.useServiceAccountAuth(credencialesOrder);
    await documento.loadInfo();

    const app_VentasSheet =documento.sheetsByTitle[sheetTitle1];
    const r1Sheet =documento.sheetsByTitle[sheetTitle2];
    const forecastSheet =documento.sheetsByTitle[sheetTitle3];
    const consolidadoSheet =documento.sheetsByTitle[sheetTitle4];
    
    //Plasmamos info en el App_Ventas
    await app_VentasSheet.clearRows();
    await app_VentasSheet.addRows(arrayData);                                            //importa array de objetos en sheets

    /* Proceso Añadir Fecha a una sola celda */
    await r1Sheet.loadCells("A1");                                                          //Cargamos la celda a la que modificaremos
    const celdaR1 = r1Sheet.getCellByA1("A1");                                              //Obtenemos el rango de la celda a modificar, en este caso, solo el A1
    celdaR1.value = dateToday().date;                                                                     //Pisamos el valor y le colocamos el valor que nosotros queremos
    await r1Sheet.saveUpdatedCells();                                                       //Guardamos los cambios y los subimos al Sheet
    
    await forecastSheet.loadCells("A:B")                                                    //Cargamos la celda a la que modificaremos
    const celdaForecast = forecastSheet.getCellByA1("A1:B2");                               //Obtenemos el rango de la celda a modificar, en este caso, solo el A1
    celdaForecast.value = dateToday().date;                                                             //Pisamos el valor y le colocamos el valor que nosotros queremos
    await forecastSheet.saveUpdatedCells();                                                 //Guardamos los cambios y los subimos al Sheet
    
    await consolidadoSheet.loadCells("A2");                                                 //Cargamos la celda a la que modificaremos
    const celdaConsolidado = consolidadoSheet.getCellByA1("A2");                            //Obtenemos el rango de la celda a modificar, en este caso, solo el A1
    celdaConsolidado.value = dateToday().date;                                                          //Pisamos el valor y le colocamos el valor que nosotros queremos
    await consolidadoSheet.saveUpdatedCells();                                              //Guardamos los cambios y los subimos al Sheet
     
    console.log('***finalizando impotacion de COL del Mes anterior ***');
    console.log('***Proceso de COL del Mes anterior finalizado correctamente***');
}
const pasteGS = async(sheetId,googleCred,wSheetName,flag,value)=>{
    try{
        const documento = new GoogleSpreadsheet(sheetId);
        await documento.useServiceAccountAuth(googleCred);
        await documento.loadInfo();
        
        const sheet = documento.sheetsByTitle[wSheetName];
        await sheet.loadCells()
        const celda = sheet.getCellByA1(flag)
        celda.value=value
        await sheet.saveUpdatedCells()
        console.log(flag)
        //await sheet.                                      
        }
        catch(error){
    
        }
}
const savingDataPreguntasYRespuestas = async(arrayConDatos, nombreArchivoCSV)=>{
    let headers = Object.keys(arrayConDatos[0] || {}).join(' | ');

    let respuestaData = arrayConDatos?.map ((elementos) => { //solo accedemos a id y name de la respuesta a traves de map
            return {
                NombreCanal: elementos?.NombreCanal,
                User_ID: elementos?.User_ID,
                total: elementos?.total,
                "Lun a Vie de 9 a 18 hs": elementos?.weekdays_working_hours,
                "Lun a Vie de 18 a 00 hs": elementos?.weekdays_extra_hours,
                "Sabado_y_Domingo": elementos?.weekend,
                sales_percent_increaseWeekend: elementos?.sales_percent_increaseWeekend,
                sales_percent_increaseWeekdays: elementos?.sales_percent_increaseWeekdays,
                weekdays_extra_hours_tiempoRespuesta: elementos?.weekdays_extra_hours_tiempoRespuesta,
                Timestamp: elementos?.Timestamp,
            }
    }).map((elementos) => Object?.values(elementos)?.join(' | ')) // tomamos solos los valores y los separamos con comas
    .join('\n'); // le damos un salto de linea
    //En este array sumamos los headers, un salto de linea, y los productos

    //En este array sumamos un salto de linea, y los productos 
    const arrayInCSVFormat = ['\n',respuestaData];
    await fs.promises.appendFile(`../data/${nombreArchivoCSV}.csv`, arrayInCSVFormat);
}
const getDataCSV_PreguntasYRespuestas = async (nombreArchivoCSV) =>{
    let nombreArrayConInfo = []
    const readingFile = (await readFile(`../data/${nombreArchivoCSV}.csv`)).toString();  //Obtenemos la info del archivo CSV y se pasa a String
    const splitFile = readingFile.split("\n")                               //Separamos los objetos con un espacio
    const [header, ...files] =splitFile                                     //Obtenemos la info guardada en un array
    for(const i of files){                                                  //Recorremos el largo de "files"
    const splitFiles = i.split("|")                                     //Usamos el separador de "|" para obtener cada dato certero
    
    nombreArrayConInfo.push({
        //Y acá va la info a extraer
        NombreCanal: splitFiles[0],
        User_ID: splitFiles[1],
        total: splitFiles[2],
        "Lun a Vie de 9 a 18 hs": splitFiles[3],
        "Lun a Vie de 18 a 00 hs": splitFiles[4],
        "Sabado_y_Domingo": splitFiles[5],
        sales_percent_increaseWeekdays: splitFiles[6],
        weekdays_extra_hours_tiempoRespuesta: splitFiles[7],
        weekdays_extra_hours: splitFiles[8],
        Timestamp: splitFiles[9],
    })
    }
    return nombreArrayConInfo
    };
//Exportamos un objeto, y adentro mencionamos las variables con funciones las cuales exportamos
export {exportSheet, dateToday, llamadaAPI, exportSheetMKTShare, pasteGS, savingDataPreguntasYRespuestas, getDataCSV_PreguntasYRespuestas}