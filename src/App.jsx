import { Header } from './Components/Header';
import { Hero } from './Components/Hero';
import './root.css';

export const App = () => {
    return (
        <>
            <main className='page'>
                <Header />
                <Hero />
            </main>
        </>
    )
}