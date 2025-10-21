import {useMutation} from "@tanstack/react-query";
import {api} from "../../utils/api";
import {AuthStorageKey} from "../../constants";

export interface IRegistrationData {
    email: string,
    password: string,
    name: string
}

export function useRegistrationMutation() {
    return useMutation({
        mutationKey: ['Registration'],
        mutationFn: (data: IRegistrationData) => api.post('api/register', {
            json: {
                ...data,
                password_confirmation: data.password
            }
        }).json<IRegister>(),
        onSuccess: (data, _, __, {client}) => {
            localStorage.setItem(AuthStorageKey, data.token)

            client.setQueryData(['Session'], data.user)
        }
    })
}
