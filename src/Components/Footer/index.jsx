import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

export const Footer = () => {
    const [data, setData] = useState([]);
    const [navData, setNavData] = useState([]);
    const [linksData, setLinksData] = useState([]);

    const builder = ImageUrlBuilder(sanityClient);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'footer'][0]`;
            const result = await sanityClient.fetch(query);
            setData(result);
            setNavData(result.navigation);
            setLinksData(result.links);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <footer className='footer'>
            {data && data.backgroundImage ? (
                <img className='footer-background' src={urlFor(data.backgroundImage.asset._ref).url()} />
            ) : (
                null
            )}
            <div className='footer-items'>
                <div className='footer-navigation'>
                    {data && navData && (
                        <ul>
                            {navData.map((item, index) => {
                                return (
                                    <a key={index} href={`/${item}`}>{item}</a>
                                )
                            })}
                        </ul>
                    )}
                </div>
                <div className='footer-links'>
                    {data && linksData && (
                        <ul>
                            {linksData.map((item, index) => {
                                return (
                                    <a key={index} href={item.url}>{item.title}</a>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            {data && data.logo && (
                <div className='footer-logo'>
                    <img src={urlFor(data.logo.asset._ref).url()} />
                </div>
            )}
        </footer>
    )
}