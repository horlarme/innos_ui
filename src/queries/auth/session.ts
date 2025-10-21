import {useQuery} from "@tanstack/react-query";
import {api} from "../../utils/api";

export function useSessionQuery(){
    return useQuery({
        queryKey: ['Session'],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        queryFn: () => api.get('api/user').json<IUser>(),
    })
}
