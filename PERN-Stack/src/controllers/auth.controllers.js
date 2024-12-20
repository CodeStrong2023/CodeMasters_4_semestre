import { pool } from "../db.js";
import bcrypt from "bcrypt";
import {createAccessToken} from "../libs/jwt.js";

export const signin = (req, res)=> res.send("Ingresando");

export const signup = async (req, res)=> {
    const {name, email, password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const result = await pool.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);

        const token = await createAccessToken({id: result.rows[0].id})
        console.log(result);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "nono",
            maxAge: 60 * 60 * 24 *1000});

        return res.json(result.rows[0]);
       
    } catch (error) {
        if(error.code === "23585"){
            return res.status(400).json({menssage: "El correo ya está registrado"});
        }
        
    };
      
};

export const signout =(req, res)=> res.send("Cerrando sesión");

export const profile = (req, res)=> res.send("Perfil de usuario");
