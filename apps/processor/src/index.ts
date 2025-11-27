import { Kafka } from "kafkajs";
import { prisma } from "@repo/database";

const Topic_Name = "zap-events";
const kafka = new Kafka({
    clientId: "outbox processor",
    brokers: ["localhost:9092"]
});


(async function main(){
    
    const producer = kafka.producer();
    await producer.connect().then(()=>console.log("producer connected"));

    console.log("DB URL:", process.env.DATABASE_URL);


    while (1){
        const pendingrows = await prisma.zapRunOutbox.findMany({
            where:{},
            take:10
        });

        await producer.send({
            topic:Topic_Name,
            messages:pendingrows.map(r=>({
                value:r.zapRunId,
            }))
        })

        await prisma.zapRunOutbox.deleteMany({
            where:{
                id:{
                    in:pendingrows.map(r=>r.id)
                }
            }
        })
    }
})()