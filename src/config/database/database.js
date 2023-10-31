import { Sequelize } from "sequelize";
import { envs } from "../env/enviroments.js";

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false,
})

export async function authenticated () {
    try {
        await sequelize.authenticate()
        console.log('db connection OK!')
    } catch (error) {
        throw new Error('Error al authenticar')
    }
}

export async function syncUp () {
    try {
        await sequelize.sync()
        console.log('db synced OK!')
    } catch (error) {
        throw new Error('Error al sincronizar')
    }
} 

export default sequelize;