import z from 'zod'
import { extracValidationData } from '../../common/utils/extracValidateData.js'

const orderSchema = z.object({
    mealId: z.number().int().positive(),
    userId: z.number().int().positive(),
    totalPrice: z.number().int().positive(),
    quantity: z.number().int().positive(),
})

export const validateOrder = (data) => {
    const result = orderSchema.safeParse(data)

    const {
        data: orderData,
        errorMessages,
        hasError,
    } = extracValidationData(result)

    return {
        errorMessages,
        hasError,
        orderData
    }
}