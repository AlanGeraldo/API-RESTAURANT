import { catchAsync } from "../../errors/index.js"
import { validateMeals, validatePartialMeals } from "./meals.schema.js"
import { MealsService } from "./meals.services.js"

const mealService = new MealsService()

export const createMeals = catchAsync(async (req, res, next) => {
    const { errorMessages, hasError, mealData } = validateMeals(req.body)
    const { restaurant } = req;

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const meal = await mealService.createMeals(mealData, {restaurantId: restaurant})

    return res.status(201).json(meal)
})

export const findAllMeals = catchAsync(async (req, res, next) => {
    const meals = await mealService.findAllMeals()

    return res.status(200).json(meals)
})

export const findOneMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    return res.status(200).json(meal)
})

export const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { errorMessages, hasError, mealData } = validatePartialMeals(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const mealUpdated = await mealService.updatedMeal(meal, mealData)

    return res.status(200).json(mealUpdated)
})

export const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    await mealService.deleteMeal(meal)

    return res.status(204).json(null)
})
