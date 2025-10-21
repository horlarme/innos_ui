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

    return <div className={'container mx-auto overflow-x-hidden'}>
        <div className="w-full p-4 flex items-center group gap-x-2">
            <Link to={'/'}>
                <img src={Logo} className={'group-hover:animate-spin'} alt={'Logo'}/>
            </Link>
            <div className="flex-1"/>
            {error ? <>
                    <Link to={'/login'} className="p-button">Login</Link>
                    <Link to={'/register'} className="p-button p-button-secondary">Register</Link>
                </> :
                <>
                    <Link to={'/feed'} className="p-button p-button p-button-outlined">Feed</Link>
                    <button onClick={logout} type={'button'} className="p-button p-button-outlined">Logout</button>
                </>}
        </div>
        <Outlet/>
    </div>
}
