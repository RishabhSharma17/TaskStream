import { Router, type Request, type Response } from "express";
import { Middleware } from "../Middleware/middleware.js";
import type { Apiresponse } from "../Types/Apiresponse.js";
import { zapCreateSchema } from "../Types/Types.js";
import { prisma } from "@repo/database";

export const zapRouter = Router();

zapRouter.post("/",Middleware,async (req:Request,res:Response<Apiresponse>) => {
    const body = req.body;
    const userId = req.userId ?? 0;
    const parsedData = zapCreateSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect inputs!",
            success:false
        });
    }

    const zapId = await prisma.$transaction(async tx => {
        const zap = await tx.zap.create({
            data:{
                userId:userId,
                triggerId:"",
                action:{
                    create:parsedData.data.actions.map((x,index)=>({
                        actionId:x.AvailableactionId,
                        sortingOrder:index
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data:{
                triggerId:parsedData.data.AvailabletriggerId,
                zapId:zap.id
            }
        });

        await tx.zap.update({
            where:{
                id:zap.id
            },
            data:{
                triggerId:trigger.id
            }
        });

        return zap.id;
    });

    return res.status(200).json({
        message:"Zap created successfully!!",
        success:true,
        zapId,
    })
});

zapRouter.get("/",Middleware,async (req:Request,res:Response<Apiresponse>) => {
    const userId = req.userId ?? 0;

    const zap = await prisma.zap.findMany({
        where:{
            userId:userId
        },
        include:{
            action:{
                include:{
                    type:true
                }
            },
            trigger:{
                include:{
                    type:true
                }
            }
        }
    });

    return res.status(200).json({
        message:"All Zaps",
        success:true,
        zap
    });
});

zapRouter.get("/:zapId",Middleware,async (req,res) => {
    const userId = req.userId ?? 0;
    const zapId = req.params.zapId ?? "";

    const zap = await prisma.zap.findFirst({
        where:{
            userId:userId,
            id:zapId
        },
        include:{
            action:{
                include:{
                    type:true
                }
            },
            trigger:{
                include:{
                    type:true
                }
            }
        }
    });

    return res.status(200).json({
        message:"All Zaps",
        success:true,
        zap
    });
});