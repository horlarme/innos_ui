import {useQuery} from "@tanstack/react-query";
import {api} from "../../utils/api";
import queryString from "query-string";


interface Props {
    page: number
    query?: string
    sources?: Array<number>
    categories?: Array<number>
    authors?: Array<string>
}

export function useGetArticlesQuery(props: Props) {
    return useQuery({
        queryKey: ['Articles', props],
        queryFn: ({signal}) => api.get('api/articles', {
            searchParams: queryString.stringify({
                page: props.page,
                query: props.query,
                sources: props.sources,
                categories: props.categories,
                authors: props.authors,
            }, { arrayFormat: 'index'}),
            signal
        }).json<IPaginatedResponse<IArticle>>()
    })
}
