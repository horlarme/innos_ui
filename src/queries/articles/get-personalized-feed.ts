import {useQuery} from "@tanstack/react-query";
import {api} from "../../utils/api";

interface Props {
    page: number
}

export function useGetPersonalizedFeedQuery(props: Props) {
    return useQuery({
        queryKey: ['Articles', 'Personalized', props],
        queryFn: () => api.get('api/articles/personalized', {searchParams: {page: props.page}}).json<IPaginatedResponse<IArticle>>()
    })
}
