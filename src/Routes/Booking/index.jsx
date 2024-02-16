import { Hero } from "../../Components/Hero";
import { GigwellBookingForm } from '../../Components/GigWellBookingForm';

import './index.css';

export const Booking = () => {
    return (
        <>
            <div className="booking-page">
                <Hero />
                <GigwellBookingForm />
            </div>
        </>
    )
}