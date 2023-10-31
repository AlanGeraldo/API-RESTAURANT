import { AppError, catchAsync } from "../../errors/index.js"
import { MealsService } from "./meals.services.js"

const mealService = new MealsService()

export const validExistMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const meal = await mealService.findOneMeal(id)

    if (!meal) {
        return next(new AppError(`Meal with id not found`, 404))
    }

    req.meal = meal

    next()

})