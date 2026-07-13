import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('orders_db', 'postgres', 'senha_secreta', {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
});

export async function connectDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('🐘 PostgreSQL conectado com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao Postgres:', err);
        process.exit(1);
    }
}