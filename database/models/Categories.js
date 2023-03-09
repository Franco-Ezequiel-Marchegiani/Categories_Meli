import { DataTypes } from "sequelize";
import { sequelize } from '../db.js';

/* Se coloca los valores de la tabla de Categorías */
export const Proyect = sequelize.define("categories", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryID_1: {
        type: DataTypes.STRING
    },
    categoryName_1: {
        type: DataTypes.STRING
    },
    catalog_domain1: {
        type: DataTypes.STRING
    },
    categoryID_2: {
        type: DataTypes.STRING
    },
    categoryName_2: {
        type: DataTypes.STRING
    },
    itemsPorCategoria2: {
        type: DataTypes.STRING
    },
    catalog_domain2: {
        type: DataTypes.STRING
    },
    root2: {
        type: DataTypes.STRING
    },
    rootName2: {
        type: DataTypes.STRING
    },
    categoryID_3: {
        type: DataTypes.STRING
    },
    categoryName_3: {
        type: DataTypes.STRING
    },
    root3: {
        type: DataTypes.STRING
    },
    rootName3: {
        type: DataTypes.STRING
    },
    itemsPorCategoria3: {
        type: DataTypes.STRING
    },
    catalog_domain3: {
        type: DataTypes.STRING
    },
    categoryID_4: {
        type: DataTypes.STRING
    },
    categoryName_4: {
        type: DataTypes.STRING
    },
    root4: {
        type: DataTypes.STRING
    },
    rootName4: {
        type: DataTypes.STRING
    },
    itemsPorCategoria4: {
        type: DataTypes.STRING
    },
    catalog_domain4: {
        type: DataTypes.STRING
    },
    categoryID_5: {
        type: DataTypes.STRING
    },
    categoryName_5: {
        type: DataTypes.STRING
    },
    root5: {
        type: DataTypes.STRING
    },
    rootName5: {
        type: DataTypes.STRING
    },
    itemsPorCategoria5: {
        type: DataTypes.STRING
    },
    catalog_domain5: {
        type: DataTypes.STRING
    },
    categoryID_6: {
        type: DataTypes.STRING
    },
    categoryName_6: {
        type: DataTypes.STRING
    },
    root6: {
        type: DataTypes.STRING
    },
    rootName6: {
        type: DataTypes.STRING
    },
    itemsPorCategoria6: {
        type: DataTypes.STRING
    },
    catalog_domain6: {
        type: DataTypes.STRING
    },
    categoryID_7: {
        type: DataTypes.STRING
    },
    categoryName_7: {
        type: DataTypes.STRING
    },
    root7: {
        type: DataTypes.STRING
    },
    rootName7: {
        type: DataTypes.STRING
    },
    itemsPorCategoria7: {
        type: DataTypes.STRING
    },
    catalog_domain7: {
        type: DataTypes.STRING
    },
    timestamp: {
        type: DataTypes.DATE
    },
})
/* 	

root7	
rootName7	
itemsPorCategoria7	
catalog_domain7	
timestamp

*/
/* Para conectar y relacionar tablas, por ej:
Tabla: Proyecto & Tareas
Hay muchas tareas en un proyecto, entonces:
Proyecto.hasMany(Tareas, {
    foreignKey: "keyForanea",
    sourceKey: "id"
}) 

&
Tarea pertenece a Proyecto
Tarea.belongsTo(Proyecto,{
    foreignKey: "keyForanea",
    targetId: "id"
})
*/