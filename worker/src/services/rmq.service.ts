import { Connection } from 'amqplib';

import { Channel } from "../types/interfaces/channel.interface";
import userService from "./user.service";
import config from "../config/config";

class RmqService {
  protected connection: Connection;
  protected channel: Channel;
  private queueName = 'default'

  init(connection, channel) {
    this.connection = connection;
    this.channel = channel;
    this.queueName = config.getRmqQueue();
  }

  async handleMessages(): Promise<void> {
    await this.channel.assertQueue(this.queueName, { durable: true });
    this.channel.prefetch(1);

    console.log('Waiting for RPC requests...');

    this.channel.consume(this.queueName, async (msg) => {
      let response = '';
      try {
        const request = JSON.parse(msg.content.toString());

        const result = await userService[request.event](request.data);

        response = JSON.stringify(result);

        this.channel.ack(msg);
      } catch (err) {
        response = err.message
      } finally {
        this.channel.sendToQueue(msg.properties.replyTo, Buffer.from(response), {
          correlationId: msg.properties.correlationId
        });
      }
    }, {});
  }
}

export default new RmqService()
