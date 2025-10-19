import {Navigate, Outlet} from "react-router";
import {useSessionQuery} from "../queries";

export default function Guest() {
    const {error} = useSessionQuery()

    if (!error) return <Navigate to={'/'}/>

    return <Outlet/>
}
