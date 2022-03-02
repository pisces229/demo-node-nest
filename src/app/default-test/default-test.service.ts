import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { ExtractJwt } from 'passport-jwt';
import { of } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class DefaultTestService {
  private readonly logger = new Logger(DefaultTestService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.log('DefaultTestService');
    this.logger.log(
      `DefaultTestService this.configService.get<string>('PORT'):
      ${this.configService.get<number>('PORT')}`,
    );
    this.logger.log(
      `DefaultTestService this.configService.get<string>('ENVIRONMENT'):
      ${this.configService.get<string>('ENVIRONMENT')}`,
    );
  }
  get = () => of({ service: 'DefaultTestService', method: 'get' });
  public encrypt(): void {
    const value = '1qaz@WSX';
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(value, salt, 1000, 64, 'sha256').toString('hex');
    this.logger.log(`encrypt:${hash}`);
  }
  jwt(): void {
    const payload = { id: '1234567890', username: 'Pete' };
    const jwtEncode = this.jwtService.sign(payload);
    this.logger.log(`jwtEncode:${jwtEncode}`);
    const jwtDecode = this.jwtService.decode(jwtEncode);
    this.logger.log(`jwtDecode:${JSON.stringify(jwtDecode)}`);
    try {
      const jwtVerify = this.jwtService.verify(jwtEncode, {
        // ignoreExpiration: true,
      });
      this.logger.log(`jwtVerify:${JSON.stringify(jwtVerify)}`);
    } catch (e) {
      this.logger.log(e);
    }
  }
}
