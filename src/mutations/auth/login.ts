import {useMutation} from "@tanstack/react-query";
import {api} from "../../utils/api";
import {AuthStorageKey} from "../../constants";

export interface ILoginData {
    email: string,
    password: string,
}

export function useLoginMutation() {
    return useMutation({
        mutationKey: ['Login'],
        mutationFn: (data: ILoginData) => api.post('api/login', {json: data}).json<IRegister>(),
        onSuccess: (data, _, __, {client}) => {
            localStorage.setItem(AuthStorageKey, data.token)

            client.setQueryData(['Session'], data.user)
        }
    })
}
