import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js';

export const authRequired = ( req, res, next)=>{
    console.log('Validando el token');
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({ message : "No hay token, acceso no autorizado."});
    jwt.verify(token, TOKEN_SECRET, (err,user) =>{
        if(err)
            return res.status(401).json({ message : "Token inválido"});
        // console.log(user);
        req.user = user;
        next();
    })
}