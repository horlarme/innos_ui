import {useQuery} from "@tanstack/react-query";
import {api} from "../../utils/api";

export function useGetArticleCategoriesQuery() {
    return useQuery({
        queryKey: ['Articles', 'Categories'],
        queryFn: () => api.get('api/categories').json<{categories: Array<IArticleCategory>}>(),
        select: ({ categories }) =>categories,
        staleTime: Infinity,
    })
}
