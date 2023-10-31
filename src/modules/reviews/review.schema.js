import z from 'zod'
import { extracValidationData } from '../../common/utils/extracValidateData.js'

const reviewSchema = z.object({
    userId: z.number().int().positive(),
    comment: z.string().min(3).max(250),
    restaurantId: z.number().int().positive(),
    rating: z.number().int().positive(),
})

export const validateReview = (data) => {
    const result = reviewSchema.safeParse(data)

    const {
        data: reviewData,
        errorMessages,
        hasError,
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        reviewData
    }
}

export const validatePartialReview = (data) => {
    const result = reviewSchema.partial().safeParse(data)

    const {
        data: reviewData,
        errorMessages,
        hasError,
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        reviewData
    }
} 