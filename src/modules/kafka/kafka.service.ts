/* eslint-disable @typescript-eslint/require-await */
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({ brokers: ["localhost:9092"] });
  private producer: Producer;
  private consumer: Consumer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();

    this.consumer = this.kafka.consumer({ groupId: "news-group" });
    await this.consumer.connect();
  }

  async sendMessage(topic: string, message: any) {
    // console.log(`Sending message to topic ${topic}:`, message);

    await this.producer.send({ topic, messages: [{ value: JSON.stringify(message) }] });
  }

  async consumeMessages(topic: string, callback: (message: any) => void) {
    if (!this.consumer) {
      throw new Error("Consumer has not been initialized");
    }

    await this.consumer.subscribe({ topic, fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        callback(message.value?.toString());
      },
    });
  }
}
