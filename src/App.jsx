import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Routes/Home";

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

import './root.css';

export const App = () => {
    return (
        <>
            <main className='page'>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </main>
        </>
    )
}