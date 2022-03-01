import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { newEnforcer } from 'casbin';
import { DemoCasbinService } from './demo-casbin.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // const secret = config.get<string>('secrets.jwt');
        const secret = 'qwertyuiop';
        return {
          secret,
          signOptions: {
            expiresIn: '60s',
            // expiresIn: '0s',
          },
        };
      },
    }),
    HttpModule,
    // HttpModule.register({
    //   timeout: 5000,
    //   maxRedirects: 5,
    //   httpsAgent: new Agent({ rejectUnauthorized: false }),
    // }),
    // HttpModule.registerAsync({
    //   useFactory: () => ({
    //     timeout: 5000,
    //     maxRedirects: 5,
    //     httpsAgent: new Agent({ rejectUnauthorized: false }),
    //   }),
    // }),
    // HttpModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     timeout: configService.get('HTTP_TIMEOUT'),
    //     maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
    //     httpsAgent: new Agent({ rejectUnauthorized: false }),
    //   }),
    //   inject: [ConfigService],
    // }),
    MulterModule.register({
      //dest: './upload',
      dest: 'd:/workSpace/demo-node-nest/upload',
    }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: (
    //       request: Request,
    //       file: Express.Multer.File,
    //       callback: (error: Error | null, destination: string) => void,
    //     ) => {
    //       //callback(null, join(__dirname, '/upload/'));
    //       callback(null, 'd:/workSpace/demo-node-nest/upload');
    //     },
    //     filename: (
    //       request: Request,
    //       file: Express.Multer.File,
    //       callback: (error: Error | null, destination: string) => void,
    //     ) => {
    //       callback(null, `${new Date().getTime()}-${file.originalname}`);
    //     },
    //   }),
    // }),
  ],
  providers: [
    {
      provide: 'DEMO_CASBIN_ENFORCER',
      useFactory: async () =>
        await newEnforcer('casbin/model.conf', 'casbin/policy.csv'),
    },
    DemoCasbinService,
  ],
  exports: [JwtModule, HttpModule, MulterModule, DemoCasbinService],
})
export class CoreModule {}
