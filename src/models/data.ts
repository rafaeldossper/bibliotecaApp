import "reflect-metadata"
import { DataSource } from "typeorm"
import { Livro } from "./livro"
import { Usuario } from "./user"

export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "app_library",
    synchronize: true,
    logging: false,
    entities: [Livro, Usuario],
    migrations: [],
    subscribers: [],
})

export function dataStart(){
    MariaDBDataSource.initialize().then( ()=>{
        console.log("Banco de dados conectado...");
    }).catch((err)=>{
        console.error("Falha na inicialização do banco de dados.", err);
    }) 
}
