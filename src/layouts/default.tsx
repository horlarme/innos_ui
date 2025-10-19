import {Link, Outlet} from "react-router";
import Logo from "./../assets/react.svg";
import {useSessionQuery} from "../queries";
import {queryClient} from "../utils";
import {AuthStorageKey} from "../constants";

export default function DefaultLayout() {
    const {error} = useSessionQuery()

    function logout() {
        // todo: api logic to invalidate token
        localStorage.removeItem(AuthStorageKey)
        queryClient.resetQueries({queryKey: ['Session']})
    }

    return <div className={'container mx-auto'}>
        <div className="w-full p-4 flex items-center group gap-x-2">
            <img src={Logo} className={'group-hover:animate-spin'} alt={'Logo'}/>
            <div className="flex-1"/>
            {error ? <>
                    <Link to={'/login'} className="btn btn-outline btn-sm">Login</Link>
                    <Link to={'/register'} className="btn btn-primary btn-sm">Register</Link>
                </> :
                <>
                    <Link to={'/preference'} className="btn btn-link btn-sm">Settings</Link>
                    <button onClick={logout} type={'button'} className="btn btn-link btn-sm">Logout</button>
                </>}
        </div>
        <Outlet/>
    </div>
}
