import { envs } from '../config/env/enviroments.js'

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if (err.isOperacional) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log('Error', err)
        res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!'
        })
    }
}

export const globalErrorHandler = (err, req, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (envs.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }

    if (envs.NODE_ENV === 'production') {
        let error = err
        
        // Validar los errores

        sendErrorProd(err, res)
    }
}