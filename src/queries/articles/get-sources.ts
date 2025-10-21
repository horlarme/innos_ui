import {useQuery} from "@tanstack/react-query";
import {api} from "../../utils/api";

export function useGetArticleSourcesQuery() {
    return useQuery({
        queryKey: ['Articles', 'Sources'],
        queryFn: () => api.get('api/sources').json<{sources: Array<IArticleSource>}>(),
        select: ({ sources }) => sources,
        staleTime: Infinity,
    })
}
