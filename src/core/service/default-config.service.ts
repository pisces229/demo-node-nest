import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DefaultConfigService {
  constructor(private readonly configService: ConfigService) {
    console.log('DefaultConfigService');
  }
  environment = () => this.configService.get<string>('environment');
  port = () => this.configService.get<number>('port');
  database = () => this.configService.get<string>('database');
  destUpload = () => this.configService.get<string>('dest.upload');
  destTemp = () => this.configService.get<string>('dest.temp');
  casbinModel = () => this.configService.get<string>('casbin.model');
  casbinPolicy = () => this.configService.get<string>('casbin.policy');
  jwtSecret = () => this.configService.get<string>('jwt.secret');
  jwtExpiresIn = () => this.configService.get<string>('jwt.expiresIn');
}
