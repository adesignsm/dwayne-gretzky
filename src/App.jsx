import { Header } from './Components/Header';
import { Hero } from './Components/Hero';
import { ShowsTable } from './Components/ShowsTable';
import { GigwellBookingForm } from './Components/GigWellBookingForm';
import { Footer } from './Components/Footer';

import './root.css';

export const App = () => {
    return (
        <>
            <main className='page'>
                <Header />
                <Hero />
                <ShowsTable />
                <GigwellBookingForm />
                <Footer />
            </main>
        </>
    )
}