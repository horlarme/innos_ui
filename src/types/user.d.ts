declare global {
    interface IUser extends ITimestamp {
        name: string,
        email: string,
        email_verified_at: string | null
        preference: {
            categories: Array<IArticleCategory>,
            sources: Array<IArticleSource>,
        }
    }

    interface IRegister {
        token: string
        user: IUser
    }
}

export {}
