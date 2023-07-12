import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { JwtPayload } from "../types/jwt.payload";
class JwtService {
  constructor() {}
  generateTokens(payload) {
    const { jwtSecret, accessTokenExpiration , refreshTokenExpiration } = config.getJWTConfig();
    const accessToken = jwt.sign({
      ...payload,
      type: 'access',
    }, jwtSecret, { expiresIn: accessTokenExpiration });
    const refreshToken = jwt.sign({
      ...payload,
      type: 'refresh',
    }, jwtSecret, { expiresIn: refreshTokenExpiration });
    return {
      accessToken,
      refreshToken
    }
  }
  verify(token): JwtPayload {
    const { jwtSecret } = config.getJWTConfig();
    return jwt.verify(token, jwtSecret);
  }
}

export default new JwtService()
