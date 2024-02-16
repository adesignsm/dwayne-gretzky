import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

import IG_GRADIENT from '../../Assets/socialMediaIcons/IG_gradient.png';
import SPOTIFY_GRADIENT from '../../Assets/socialMediaIcons/SPOTIFY_gradient.png';
import YOUTUBE_GRADIENT from '../../Assets/socialMediaIcons/YOUTUBE_gradient.png';

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
                        console.log(item);
                        return (
                            <a key={item._key} href={item.url}>
                                <img src={urlFor(item.icon.asset._ref).url()} />
                                {item.url.indexOf('instagram.com') > -1 && (<img className='gradient' src={IG_GRADIENT} />)}
                                {item.url.indexOf('spotify.com') > -1 && (<img className='gradient' src={SPOTIFY_GRADIENT} />)}
                                {item.url.indexOf('youtube.com') > -1 && (<img className='gradient' src={YOUTUBE_GRADIENT} />)}
                            </a>
                        )
                    })}
                </div>
            </header>
        </>
    )
}