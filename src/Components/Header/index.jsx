import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

import InstagramIcon from '../../Assets/socialMediaIcons/instagram.svg';
import YoutubeIcon from '../../Assets/socialMediaIcons/youtube.svg';
import SpotifyIcon from '../../Assets/socialMediaIcons/spotify.svg'; 

export const Header = () => {
    const [navData, setNavData] = useState([]);
    const [linkData, setLinkData] = useState([]);

    const builder = ImageUrlBuilder(sanityClient);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'header'][0]`;
            const result = await sanityClient.fetch(query);
            setNavData(result.navigation);
            setLinkData(result.links);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <header className='header'>
                <nav className='nav'>
                    {navData.map((item, index) => {
                        return (
                            <a key={index} href={`/${item}`}>{item}</a>
                        )
                    })}
                </nav>
                <div className='links'>
                    {linkData.map((item) => {
                        console.log(item)
                        return (
                            <a key={item._key} href={item.url}>
                                <img src={urlFor(item.icon.asset._ref).url()} />
                            </a>
                        )
                    })}
                </div>
            </header>
        </>
    )
}