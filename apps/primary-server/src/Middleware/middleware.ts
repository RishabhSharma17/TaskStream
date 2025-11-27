import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config.js";
import type { Apiresponse } from "../Types/Apiresponse.js";


interface JwtPayload{
    id?:number;
}

export const Middleware = (req:Request,res:Response<Apiresponse>,next:NextFunction) => {
    const token = req.headers.authorization as string;
    
    if (!token) {
        return res.status(403).json({
        message: "Token missing from header",
        success: false,
        });
    }

    try {
        const payload = jwt.verify(token,JWT_PASSWORD) as JwtPayload;
        req.userId = payload?.id ?? 0;
        next();
    } catch (error) {
        return res.status(403).json({
            message:"You are not Logged In",
            success:false
        })   
    }
}