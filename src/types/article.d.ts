declare global {
    interface IArticle extends ITimestamp {
        image: string | null;
        title: string
        author: string | null
        id: string
        content: string
        published_at: string
        url: string
        provider: 'news_api_ai' | 'news_api_org'
        source: IArticleSource
        categories: Array<IArticleCategory>
    }

    interface IArticleCategory {
        id: string
        name: string
    }

    interface IArticleSource {
        id: string
        name: string
        description: string
        slug: string
        uri: string
    }
}

export {}
