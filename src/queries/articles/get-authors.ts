import {useQuery} from "@tanstack/react-query";
import {api} from "../../utils/api";

export function useGetArticleAuthorsQuery() {
    return useQuery({
        queryKey: ['Articles', 'Authors'],
        queryFn: () => api.get('api/authors').json<{ authors: Array<{ author: string}> }>(),
        select: (a) => a.authors,
        staleTime: Infinity,
    })
}
