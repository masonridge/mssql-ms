npm i @nestjs/microservices
npm i amqplib amqp-connection-manager
npm i @nestjs/jwt @nestjs/passport bcrypt cookie-parser passport passport-jwt passport-local
npm i -D @types/cookie-parser @types/passport-jwt @types/passport-local

## generate for monorepo

nest g mo users/users -p auth --flat --dry-run
