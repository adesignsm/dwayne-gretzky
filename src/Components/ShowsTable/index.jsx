import { useEffect, useState } from 'react';
import sanityClient from '../../client';

import './index.css';

export const ShowsTable = () => {
    const [showData, setShowData] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [activeIndex, setActiveIndex] = useState(null);

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

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    const handleAccordionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    const isMobile = width <= 768;

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
                {!isMobile ? (
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
                ) : (
                    <div className="accordion">
                        {showData.map((show, index) => (
                            <div key={index} className={`accordion-item`}>
                                <div className="accordion-header" onClick={() => handleAccordionClick(index)}>
                                    <span className='city'>{show.city}</span>
                                    <span className={`accordion-icon ${activeIndex === index ? 'minus' : 'plus'}`}>
                                        {activeIndex === index ? '\u2212' : '\u002B'}
                                    </span>
                                </div>
                                <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
                                    <span>{show.date.replace(/-/g, '/')}</span>
                                    <br />
                                    <br />
                                    <span>{show.venue}</span>
                                    <br />
                                    {show.link !== undefined ? (
                                        <p>
                                            <a href={show.link} target="_blank" rel="noopener noreferrer">
                                            Ticket Link
                                            </a>
                                        </p>
                                    ) : (
                                        <p>No tickets at this time</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}