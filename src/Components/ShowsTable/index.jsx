import { useEffect, useState } from 'react';
import sanityClient from '../../client';

import './index.css';

export const ShowsTable = () => {
    const [showData, setShowData] = useState([]);

    const fetchData = async () => {
        try {
            const query = `*[_type == 'shows'][0]`;
            const result = await sanityClient.fetch(query);
            console.log(result.show);
            setShowData(result.show);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className='shows-table'>
                <div className='description'>
                    <h1>Shows</h1>
                    <p>
                        Show dates, locations, venues, and ticket portals are available in the shows table below.
                        <br />
                        <br />
                        * To pace a booking request please navigate to the booking form below the shows table
                    </p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Show Date</th>
                            <th>City</th>
                            <th>Venue</th>
                            <th>Ticket Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showData.map((show, index) => {
                            return (
                                <tr key={index}>
                                    <td>{show.date.replace(/-/g, '/')}</td>
                                    <td>{show.city}</td>
                                    <td>{show.venue}</td>
                                    <td>
                                        {show.link !== undefined ? (
                                            <p>
                                                <a href={show.link} target='_blank' rel="noopener noreferrer">Ticket Link</a>
                                            </p>
                                        ) : (
                                            <p>No tickets at this time</p>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}