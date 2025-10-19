import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home.tsx";
import AuthLayout from "./layouts/auth.tsx";
import Auth from "./middleware/auth.tsx";
import DefaultLayout from "./layouts/default.tsx";
import Preference from "./pages/preference.tsx";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import {useSessionQuery} from "./queries";
import Guest from "./middleware/guest.tsx";

function App() {
    const { isPending } = useSessionQuery()

    if(isPending) return <div className={'grid place-items-center h-screen'}>
        <p>
            <span className="loading loading-spinner"/> Loading application...
        </p>
    </div>

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout/>}>
                    <Route index={true} element={<Home/>}/>
                    <Route element={<Auth/>}>
                        <Route path='preference' element={<Preference/>}/>
                    </Route>
                </Route>
                <Route element={<Guest/>}>
                <Route element={<AuthLayout/>}>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'register'} element={<Register/>}/>
                </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
