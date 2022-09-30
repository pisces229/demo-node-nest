import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { newEnforcer } from 'casbin';
import { DefaultLogger } from './logger/default.logger';
import { DefaultCasbinService } from './guard/default-casbin.service';
import { DefaultConfigService } from './service/default-config.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      inject: [DefaultConfigService],
      useFactory: (defaultConfigService: DefaultConfigService) => {
        return {
          secret: defaultConfigService.jwtSecret(),
          signOptions: {
            expiresIn: defaultConfigService.jwtExpiresIn(),
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
    // MulterModule.register({
    //   //dest: './upload',
    //   dest: process.env.APP_DEST_UPLOAD,
    // }),
    MulterModule.registerAsync({
      inject: [DefaultConfigService],
      useFactory: async (defaultConfigService: DefaultConfigService) => {
        return {
          dest: defaultConfigService.destUpload(),
        };
      },
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
      provide: 'DEFAULT_CASBIN_ENFORCER',
      inject: [DefaultConfigService],
      useFactory: async (defaultConfigService: DefaultConfigService) => {
        return await newEnforcer(
          defaultConfigService.casbinModel(),
          defaultConfigService.casbinPolicy(),
        );
      },
    },
    DefaultCasbinService,
    DefaultConfigService,
    DefaultLogger,
  ],
  exports: [
    JwtModule,
    HttpModule,
    MulterModule,
    DefaultCasbinService,
    DefaultConfigService,
    DefaultLogger,
  ],
})
export class CoreModule {}
