import Meals from "../meals/meals.model.js";
import Restaurant from "../restaurant/user.model.js";
import Order from "./orders.model.js";

export class OrderService {

    async createOrder (data) {
        return await Order.create(data)
    }

    async findAllOrder () {
        return await Order.findAll({
            where: {
                status: 'active'
            },
            include: [
                {
                    model: Meals,
                }
            ]
        })
    }

    async findOneOrder (id) {
        return await Order.findOne({
            where: {
                id,
                status: 'active',
            }
        })
    }

    async updateOrder (order) {
        return await order.update({status: 'completed'})
    }

    async deleteOrder (order) {
        return await order.update({status: 'cancelled'})
    }
}