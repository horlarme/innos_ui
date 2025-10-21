import {BrowserRouter, Route, Routes} from "react-router";
import {PrimeReactProvider} from 'primereact/api';
import Home from "./pages/home";
import AuthLayout from "./layouts/auth";
import Auth from "./middleware/auth";
import DefaultLayout from "./layouts/default";
import Feed from "./pages/feed";
import Login from "./pages/login";
import Register from "./pages/register";
import {useSessionQuery} from "./queries";
import Guest from "./middleware/guest";

function App() {
    const {isPending} = useSessionQuery()

    if (isPending) return <div className={'grid place-items-center h-screen'}>
        <p>
            <span className="loading loading-spinner"/> Loading application...
        </p>
    </div>

    return (
        <BrowserRouter>
            <PrimeReactProvider>
                <Routes>
                    <Route element={<DefaultLayout/>}>
                        <Route index={true} element={<Home/>}/>
                        <Route element={<Auth/>}>
                            <Route path='feed' element={<Feed/>}/>
                        </Route>
                    </Route>
                    <Route element={<Guest/>}>
                        <Route element={<AuthLayout/>}>
                            <Route path={'login'} element={<Login/>}/>
                            <Route path={'register'} element={<Register/>}/>
                        </Route>
                    </Route>
                </Routes>
            </PrimeReactProvider>
        </BrowserRouter>
    )
}

export default App
