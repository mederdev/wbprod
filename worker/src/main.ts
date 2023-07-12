import * as amqp from 'amqplib';
import RmqService from "./services/rmq.service";
import { fastify } from "fastify";
import {rmqPlugin} from "./plugins/rmq.plugin";
import config from "./config/config";
async function main() {
  const server = fastify({});
  await server.register(rmqPlugin, {
    url: config.getRMConfig()
  })

  RmqService.handleMessages()
    .catch(console.error)

  await server.listen();
}
main();
