import express from "express";
import { sequelize } from "./database/db.js";
import './database/models/Categories.js'      //Se exporta la estructura de la tabla
const app = express()
const port = 3000


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//Esto inicializa el Sequelize
//    await sequelize.sync()  Este comando crea la tabla en caso de que no esté creada
//Se le puede pasar por parámetro el "force:true" para eliminar alguna existente, o "alter:true" en caso de algún cambio
async function main(){
  try{
    await sequelize.sync()
    console.log("Todo ok");
    app.listen(3000)
    console.log("So far so good");
  }catch(err){
    console.log("Hubo un error " + err);
  }
}
main()
/* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  sequelize.authenticate().then(()=>{
    console.log("Todo ok");
  }).catch(error =>{
    console.log("Hubo un error: " + error);
  })
}) */