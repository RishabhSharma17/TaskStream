import { Router, type Request, type Response } from "express";
import { signinSchema, signupSchema } from "../Types/Types.js";
import type { Apiresponse } from "../Types/Apiresponse.js";
import { prisma } from "@repo/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_PASSWORD } from "../config.js";
import { Middleware } from "../Middleware/middleware.js";

const userRouter = Router();

userRouter.post("/signup",async (req:Request,res:Response<Apiresponse>) => {
    const body = req.body;
    const validate = signupSchema.safeParse(body);

    if(!validate.success){
        return res.status(411).json({
            message:"invalid credentials",
            success:false,
        });
    }

    const userExist = await prisma.user.findFirst({
        where:{
            email:body.username,
        }
    });

    if(userExist){
        return res.json({
            message:"User already exists",
            success:false
        });
    }

    const hashpassword = await bcrypt.hash(validate.data.password,10);

    const newUser = await prisma.user.create({
        data:{
            email:validate.data.username,
            password:hashpassword,
            name:validate.data.name
        }
    });

    const token = jwt.sign({
        id:newUser.id
    },JWT_PASSWORD);

    return res.status(200).json({
        message:"User created successfully!",
        success:true,
        token:token
    });
});

userRouter.post("/signin",async (req:Request,res:Response<Apiresponse>) => {
    const body = req.body;
    const validate = signinSchema.safeParse(body);

    if(!validate.success){
        return res.status(411).json({
            message:"invalid credentials",
            success:false,
        });
    }

    const userExist = await prisma.user.findFirst({
        where:{
            email:body.username,
        }
    });

    if(!userExist){
        return res.status(404).json({
            message:"User not found",
            success:false
        });
    }

    const passwordcheck = await bcrypt.compare(validate.data.password,userExist?.password ?? "");

    if(!passwordcheck){
        return res.status(401).json({
            message:"password is wrong !",
            success:false,
        })
    }

    const token = jwt.sign({
        id:userExist?.id
    },JWT_PASSWORD);

    return res.status(200).json({
        message:"User Loggedin !",
        success:true,
        token:token
    });

});

userRouter.get("/me",Middleware,async (req:Request,res:Response<Apiresponse>) => {
    const id = req.userId ?? 0;

    const user = await prisma.user.findFirst({
        where:{
            id,
        },
        select:{
            name:true,
            email:true,
        }
    });

    return res.json({
        message:"user found successfully !!",
        success:true,
        data:{
            username:user?.email,
            name:user?.name
        }
    })
});

export default userRouter;