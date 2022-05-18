## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

[NestJS 帶你飛](https://ithelp.ithome.com.tw/users/20119338/ironman/3880)

Git 的 core.autocrlf 參數

`git config --global core.autocrlf false`

## Package

File Package

`npm install @types/multer --save-dev`

HTTP Package

`npm install @nestjs/axios --save`

JWT Package

`npm install @nestjs/jwt --save`

`npm install passport-jwt --save`

`npm install @types/passport-jwt --save-dev`

Swagger Package

`npm install @nestjs/swagger swagger-ui-express --save`

Typeorm Package

`npm install @nestjs/typeorm typeorm  --save`

`npm install sqlite3 --save`

Winston Package

`npm install winston --save`

`npm install winston-daily-rotate-file --save`

Jest-Cli Package

`npm install -g jest-cli`

Production Command

`set NODE_ENV=production`

`set NODE_PORT=9000`

`node dist/main`

IISNODE(Web.Config)

```xml
<configuration>
  <appSettings>
    <add key="NODE_ENV" value="production" />
    <add key="NODE_PORT" value="9000" />
  </appSettings>
</configuration>
```

## Self-certification

[Install Chocolatey with PowerShell](https://docs.chocolatey.org/en-us/choco/setup)

`choco --version`

`choco install mkcert`

`mkcert -install`

`mkcert -help`

`mkcert localhost 127.0.0.1 ::1`