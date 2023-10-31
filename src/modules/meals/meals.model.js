import { DataTypes } from "sequelize";
import sequelize from "../../config/database/database.js";

const Meals = sequelize.define('meals', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('active', 'disable'),
        allowNull: false,
        defaultValue: 'active'
    }
})

export default Meals;