import { useEffect } from 'react';

import './index.css';

export const GigwellBookingForm = () => {
    useEffect(() => {
        const loadGigwellScript = () => {
            const script = document.createElement('script');
            script.src = 'https://connect.gigwell.com/booknow/booknow.js';
            script.crossOrigin = '*';
            script.async = true;
            document.body.appendChild(script);
        };

        loadGigwellScript();

        return () => {
            const script = document.querySelector('script[src="https://connect.gigwell.com/booknow/booknow.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <gigwell-booking-form 
                open-on-load="true" 
                agency-id="461472" 
                settings="default"
            ></gigwell-booking-form>
        </>
    );
};
