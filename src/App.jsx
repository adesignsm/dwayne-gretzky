import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Routes/Home";
import { About } from './Routes/About';
import { Tickets } from "./Routes/Tickets";
import { Booking } from "./Routes/Booking";
import { Videos } from "./Routes/Videos";
import { Post } from "./Routes/Post";

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
                        <Route path='/about' element={<About />} />
                        <Route path='/tickets' element={<Tickets />} />
                        <Route path='/booking' element={<Booking />} />
                        <Route path='/videos' element={<Videos />} />
                        <Route path='/post/:handle' element={<Post />} />
                     </Routes>
                    <Footer />
                </BrowserRouter>
            </main>
        </>
    )
}