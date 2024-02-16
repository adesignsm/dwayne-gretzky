import { Hero } from "../../Components/Hero"
import { ShowsTable } from '../../Components/ShowsTable';

import './index.css';

export const Tickets = () => {
    return (
        <>
            <div className="tickets-page">
                <Hero />
                <ShowsTable />
            </div>
        </>
    )
}