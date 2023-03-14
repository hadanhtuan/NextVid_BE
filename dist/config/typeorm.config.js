"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.HOST,
    username: process.env.USERNAME,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.URL,
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map