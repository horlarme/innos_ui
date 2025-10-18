import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home.tsx";
import AuthLayout from "./layouts/auth.tsx";
import Auth from "./middleware/auth.tsx";
import DefaultLayout from "./layouts/default.tsx";
import Preference from "./pages/preference.tsx";
import Login from "./pages/login.tsx";
import QueryProvider from "./providers/query.tsx";

function App() {
    return (
        <QueryProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Auth/>}>
                        <Route element={<DefaultLayout/>}>
                            <Route index={true} element={<Home/>}/>
                            <Route path='preference' element={<Preference/>}/>
                        </Route>
                    </Route>
                    <Route element={<AuthLayout/>}>
                        <Route path={'login'} element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryProvider>
    )
}

export default App
