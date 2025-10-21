declare global {
    interface IValidationError<T = object> {
        errors: T & Record<string, string | Array<string>>,
        message: string
    }

    interface IPaginatedResponse<T = unknown> {
        data: Array<T>
        "links": {
            "first": string | null
            "last": string | null
            "prev": string | null
            "next": string | null
        },
        meta: {
            current_page: number,
            from: number,
            last_page: number,
            path: string,
            per_page: number,
            to: number,
            total: number
        }
    }
}

export {}
