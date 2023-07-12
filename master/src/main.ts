import { fastify } from "fastify";
import { rmqPlugin } from "./plugins/rmq.plugin";

import config from "./config/config";
import userRoutes from "./routes/user.routes";

async function main() {
  const server = fastify({});
  await server.register(rmqPlugin, {
    url: config.getRMConfig()
  })

  userRoutes(server);

  await server.listen({
    port: config.getPort(),
    host: config.getHost(),
  });
}
main()
  .then(e => console.log(`Server started on port: ${config.getPort()}`));
