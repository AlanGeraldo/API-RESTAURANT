import { AppError, catchAsync } from "../../errors/index.js";
import { OrderService } from "./orders.services.js";

const orderService = new OrderService()

export const validateExistOrderId = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const order = await orderService.findOneOrder(id)

    if (!order) {
        return next(new AppError(`Order with id: ${id} not found`))
    }

    req.order = order
    next()
})