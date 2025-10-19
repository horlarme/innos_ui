import {Link, Outlet} from "react-router";
import Logo from "../assets/react.svg";

export default function AuthLayout() {
    return <main className={'mx-auto h-screen w-screen grid place-items-center'}>
        <div className="max-w-md mx-auto card card-border w-full">
            <div className="card-body">
                <Link to={'/'} className={'w-max'}>
                    <img src={Logo} className={'w-12'} alt={'Logo'}/>
                </Link>

                <Outlet/>
            </div>
        </div>
    </main>
}
