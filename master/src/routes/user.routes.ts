import { FastifyInstance } from "fastify";
import tokenHandler from "../middlewares/tokenHandler";
import userController from "../controllers/user.controller";

export default function userRoutes(server: FastifyInstance) {
  server.post("/api/signup", userController.signUp);
  server.post("/api/login", userController.login);
  server.get('/api/info',{ preHandler: tokenHandler }, userController.info);
  server.post('/api/logout',{ preHandler: tokenHandler }, userController.logout)
}
