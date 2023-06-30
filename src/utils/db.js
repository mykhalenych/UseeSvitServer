import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_DB_LINK,
    database: process.env.POSTGRES_DB_DATABASE,
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    logging: false,
    ssl: {
        rejectUnauthorized: false,
    },
});
