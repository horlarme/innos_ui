declare global {
    interface IValidationError<T = object>{
        errors: T & Record<string, string|Array<string>>,
        message: string
    }
}

export {}
