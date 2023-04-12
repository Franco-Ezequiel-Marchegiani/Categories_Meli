import fs from "fs";
import pkg from 'pg';
const { Client } = pkg;

const data = JSON.parse(fs.readFileSync('./prueba.json'));
const client = new Client({ 
    user: "postgres",
    host: "192.168.1.231",
    database: "disbyte_testing",
    password: "123456"
}); //Si el código no funciona, el error está por acá

//const Client = new Client({ connectionString: 'postgres://user:password@localhost/mydatabase' });

console.log(data);
client.connect((err, client) =>{
    if(err){
        return console.error("Error acquiring client", err.stack)
    }
    console.log("Connected to database");

    client.query('SELECT NOW()', (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Current time in the database:', result.rows[0].now);
        //client.release();
    })
})
async function insertData(){

    /* Primero que todo, pasar la info y almacenarla en un CSV
    Luego, cambiar y poner todo minúsculas la info que recibo
    Y por último, implementar un insert Bulk */

    /* text: `BULK INSERT categories 
            FROM './data/CategoriesData.csv' 
            WITH (
                FIELDTERMINATOR= ' | ',
                ROWTERMINATOR = '\n',
                FIRSTROW = 1
            ); 
            `, */
        const query = {
            text: `COPY categories(categoryID_1, categoryName_1, catalog_domain1, categoryID_2, categoryName_2, itemsPorCategoria2, catalog_domain2, root2, rootName2, categoryID_3, categoryName_3, itemsPorCategoria3, catalog_domain3, root3, rootName4, categoryID_4, categoryName_4, itemsPorCategoria4, catalog_domain4, root4, categoryID_5, categoryName_5, itemsPorCategoria5, catalog_domain5, root5, rootName5, categoryID_6, categoryName_6, itemsPorCategoria6, catalog_domain6, root6, rootName6, categoryID_7, categoryName_7, itemsPorCategoria7, catalog_domain7, root7, rootName7, timestamp)
            FROM './data/CategoriesData.csv'
            DELIMITER '|'
            CSV HEADER;`,
        };
        await client.query(query);


  await client.end();
}

/* Comando creacion Tabla

CREATE TABLE public.ml_all_categories (
    id VARCHAR(255) PRIMARY KEY,
    categoryID_1 VARCHAR(100),
	categoryName_1 VARCHAR(100),
	catalog_domain1 VARCHAR(100),
	categoryID_2 VARCHAR(200),
	categoryName_2 VARCHAR(200),
	itemsPorCategoria2 VARCHAR(200),
	catalog_domain2 VARCHAR(200),
	root2 VARCHAR(200),
	rootName2 VARCHAR(200),
	categoryID_3 VARCHAR(255),
	categoryName_3 VARCHAR(255),
	itemsPorCategoria3 VARCHAR(255),
	catalog_domain3 VARCHAR(255),
	root3 VARCHAR(255),
	rootName4 VARCHAR(255),
	categoryID_4 VARCHAR(255),
	categoryName_4 VARCHAR(255),
	itemsPorCategoria4 VARCHAR(255),
	catalog_domain4 VARCHAR(255),
	root4 VARCHAR(255),
	categoryID_5 VARCHAR(255),
	categoryName_5 VARCHAR(255),
	itemsPorCategoria5 VARCHAR(255),
	catalog_domain5 VARCHAR(255),
	root5 VARCHAR(255),
	rootName5 VARCHAR(255),
	categoryID_6 VARCHAR(255),
	categoryName_6 VARCHAR(255),
	itemsPorCategoria6 VARCHAR(255),
	catalog_domain6 VARCHAR(255),
	root6 VARCHAR(255),
	rootName6 VARCHAR(255),
	categoryID_7 VARCHAR(255),
	categoryName_7 VARCHAR(255),
	itemsPorCategoria7 VARCHAR(255),
	catalog_domain7 VARCHAR(255),
	root7 VARCHAR(255),
	rootName7 VARCHAR(255),
	timestamp DATE
);

*/
insertData().catch(error => console.error('Error inserting data:', error));

/* 
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

*/
/* const database = {
    username: "postgres",
    password: "123456",
    database: "disbyte_testing",
    host: "192.168.1.231"
}
export default database  */








/* import express from "express";
import projectsRoutes from './routes/project.routes.js'

const app = express();

app.use(projectsRoutes)

export default app */