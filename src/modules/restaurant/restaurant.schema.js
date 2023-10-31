import z from 'zod'
import { extracValidationData } from '../../common/utils/extracValidateData.js'

const restaurantSchema = z.object({
    name: z.string().min(3).max(200),
    address: z.string(),
    rating: z.number(),
})

export function validateRestaurant (data) {
    const result = restaurantSchema.safeParse(data)

    const {
        data: restaurantData,
        errorMessages,
        hasError
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        restaurantData
    }
}

export function validatePartialRestaurant (data) {
    const result = restaurantSchema.partial().safeParse(data)

    const {
        data: restaurantData,
        errorMessages,
        hasError,
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        restaurantData
    }
}
