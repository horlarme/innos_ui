import {useMutation} from "@tanstack/react-query";
import {api} from "../../utils/api";

export interface SavePreference {
    categories: Array<number | string>
    sources: Array<number | string>
}

export function useSavePreferenceMutation() {
    return useMutation({
        mutationFn: (data: SavePreference) => api.patch('api/profile', {
            json: data
        }).json<{ data: IUser }>(),
        onSuccess: ({data}, _, __, {client}) => {
            client.setQueryData(['Session'], data)
            client.removeQueries({
                queryKey: ['Articles', 'Personalized'],
                type: 'all'
            })
        }
    })
}
