import pg from "pg";

export const pool = new pg.Pool({
    port: 5433,
    host: "localhost",
    user: "postgres",
    password: "contraseña",
    database: "PERN",
});

pool.on("connect",() =>{
    console.log("conectando a la BDD")
});