import fs from "fs";
import pkg from 'pg';
const { Client } = pkg;
import { parse } from 'fast-csv';


const data = JSON.parse(fs.readFileSync('./prueba.json'));
const client = new Client({ 
    user: "postgres",
    host: "192.168.1.231",
    database: "disbyte_testing",
    password: "123456"
}); //Si el código no funciona, el error está por acá

//const Client = new Client({ connectionString: 'postgres://user:password@localhost/mydatabase' });
const stream = fs.createReadStream('./data/CategoriesData_copy.csv');
console.log(stream);
//console.log(data);
// Read the CSV file
(async () =>{
    client.connect((err, client) =>{
        if(err){
            return console.error("Error acquiring client", err.stack)
        }
        console.log("Connected to database");
    
        try{

        }finally{
            client.release();
        }
    })
    
})
//const stream = fs.createReadStream('./data/CategoriesData.csv');
//console.log(stream);
const csvStream = parse({ headers: true });
console.log("AH");
//console.log(csvStream);

/* client.connect((err, client) =>{
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
}) */

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
