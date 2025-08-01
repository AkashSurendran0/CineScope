import { Sequelize } from "sequelize";

let sequelize;

export const connectDb = async () => {
    sequelize = new Sequelize(process.env.POSTGRES_URL, {
        dialect: 'postgres',
        logging: false
    });

    try {
        await sequelize.authenticate();
        console.log('✅ Postgres connected successfully');
    } catch (err) {
        console.log('❌ Postgres connection failed', err);
    }

    return sequelize;
};

export const getSequelize = () => sequelize;
