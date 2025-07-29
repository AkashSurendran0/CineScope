import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

export const sequelize=new Sequelize(process.env.POSTGRES_URL as string, {
    dialect: 'postgres',
    logging: false
}) 

export const connectDb = async() =>{
    try {
        await sequelize.authenticate()
        console.log('Postgres connected successfully')
    } catch (err) {
        console.log('Postgres connection failes', err)
    }
}