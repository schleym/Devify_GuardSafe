import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] || 'devify_guardsafe_secret_key_12345!',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    if (!payload || !payload.sub || !payload.email) {
      throw new UnauthorizedException('Token no válido');
    }
    // Retorna { sub, email } accesible en req.user
    return { sub: payload.sub, email: payload.email };
  }
}
