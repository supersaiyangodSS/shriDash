import { logger } from '@/utils/logger'

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        logger.warn('APPERROR')
        super(message)
        this.statusCode = statusCode
    }
}