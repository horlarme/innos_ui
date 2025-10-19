import ky from "ky";
import {AuthStorageKey} from "../constants";

export const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_BASE,
    retry: 0,
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(AuthStorageKey)}`
    }
})
