import { Kafka } from "kafkajs";

const Topic_Name = "zap-events";

const kafka = new Kafka({
    clientId: "outbox processor",
    brokers: ["localhost:9092"]
});


(async function main() {
    const consumer = kafka.consumer({groupId:"main-worker"});

    await consumer.connect().then(() => console.log("consumer connected"));

    await consumer.subscribe({topic:Topic_Name,fromBeginning:true});

    await consumer.run({
        autoCommit:false,
        eachMessage: async ({topic,partition,message}) => {
            console.log({
                partition,
                offset : message.offset,
                message : message.value?.toString()
            });

            await new Promise(r => setTimeout(r,5000));

            console.log("processing done!");

            await consumer.commitOffsets([{
                topic,
                partition,
                offset:(parseInt(message.offset) + 1).toString(),
            }]);
        },
    });
})()