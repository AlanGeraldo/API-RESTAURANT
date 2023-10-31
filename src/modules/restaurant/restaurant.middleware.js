import { AppError, catchAsync } from "../../errors/index.js";
import { RestaurantService } from "./restaurant.services.js";

const restaurantService = new RestaurantService()

export const validateExistRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const restaurant = await restaurantService.findOneRestaurant(id)

    if (!restaurant) {
        return next(new AppError(`Restaurant with id: ${id} not found`, 404))
    }

    req.restaurant = restaurant

    next()

})

export const validExistRestaurant = catchAsync(async (req, res, next) => {
    const { id, restaurantId } = req.params

    const restaurant = await restaurantService.findOneRestaurant(id, restaurantId)

    if (!restaurant) {
        return next(new AppError(`Restaurant with id: ${id} not found`, 404))
    }

    req.restaurant = restaurant

    next()

})