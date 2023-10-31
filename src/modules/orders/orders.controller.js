import { total } from "../../common/utils/multiplicacion.js"
import { catchAsync } from "../../errors/index.js"
import { MealsService } from "../meals/meals.services.js"
import { validateOrder } from "./orders.schema.js"
import { OrderService } from "./orders.services.js"

const orderService = new OrderService()
const mealService = new MealsService()

export const createOrder = catchAsync(async (req, res, next) => {
    const { errorMessages, hasError, orderData } = validateOrder(req.body)
    

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const meal = await mealService.findOneMeal(orderData.mealId)
    
    if (!meal) {
        return res.status(404).json({
            status: 'error',
            message: 'Order with id not found',
        })
    }

    orderData.totalPrice = total(meal.price, orderData.quantity)

    const order = await orderService.createOrder(orderData, {total})
    return res.status(201).json(order)

})

export const findAllOrders = catchAsync(async (req, res, next) => {
    const orders = await orderService.findAllOrder()
    return res.status(200).json(orders)
})

export const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    const orderUpdated = await orderService.updateOrder(order)

    return res.status(200).json(orderUpdated)

})

export const deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    await orderService.deleteOrder(order)

    return res.status(204).json(null)
})