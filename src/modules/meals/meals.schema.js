import z from 'zod'
import { extracValidationData } from '../../common/utils/extracValidateData.js'

const mealsSchema = z.object({
    name: z.string().min(3),
    price: z.number(),
    restaurantId: z.number().int().positive(),
})

export const validateMeals = (data) => {
    const result = mealsSchema.safeParse(data)

    const {
        data: mealData,
        errorMessages,
        hasError,
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        mealData
    }
}

export const validatePartialMeals = (data) => {
    const result = mealsSchema.partial().safeParse(data)

    const {
        data: mealData,
        errorMessages,
        hasError,
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        mealData
    }
}