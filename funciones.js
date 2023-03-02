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

//Exportamos un objeto, y adentro mencionamos las variables con funciones las cuales exportamos
export {exportSheet, dateToday, llamadaAPI}