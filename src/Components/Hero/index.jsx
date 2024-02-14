import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

export const Hero = () => {
    const [data, setData] = useState([]);

    const builder = ImageUrlBuilder(sanityClient);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'home'][0]`;
            const result = await sanityClient.fetch(query);
            setData(result.hero);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data);

    return (
        <>
            <div className="hero">
                {data && data.backgroundImage && (
                    <img className='background-image' src={urlFor(data.backgroundImage.asset._ref).url()}/>
                )}
                {data && data.logo && (
                    <img className='logo' src={urlFor(data.logo.asset._ref).url()} />
                )}
            </div>
        </>
    )
}