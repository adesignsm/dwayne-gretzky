import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

export const About = () => {
    const [data, setData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [combinedImages, setCombinedImages] = useState([]);
    const [width] = useState(window.innerWidth);
    const [isPaused, setIsPaused] = useState(false);

    const builder = ImageUrlBuilder(sanityClient);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'aboutPage'][0]`;
            const result = await sanityClient.fetch(query);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data && data.sliderImages) {
            const combined = [...data.sliderImages, ...data.sliderImages];
            setCombinedImages(combined);
        }
    }, [data]);

    useEffect(() => {
        if (data && data.sliderImages && data.sliderImages.length > 0) {
            const totalWidth = combinedImages.length * sliderWidth;
            const interval = setInterval(() => {
                if (!isPaused) {
                    setScrollPosition(prevPosition => {
                        if (prevPosition >= totalWidth) {
                            return 0;
                        } else {
                            return width < 768 ? prevPosition + 0.1 : prevPosition + 0.3;
                        }
                    });
                }
            }, 1);
    
            return () => clearInterval(interval);
        }
    }, [combinedImages.length, sliderWidth, isPaused]);

    const handleImageLoad = () => {
        const imageWidth = document.querySelector('.slider img')?.offsetWidth || 0;
        setSliderWidth(imageWidth);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <>
            <div className='about-page'>
                <div 
                    className='slider' 
                    style={{ transform: `translateX(-${scrollPosition}px)` }} 
                    onLoad={handleImageLoad}
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    {combinedImages.map((image, index) => (
                        <img key={index} src={urlFor(image.asset._ref).url()} onLoad={handleImageLoad} />
                    ))}
                </div>
                <div className='bio-container'>
                    {data && data.bio && (
                        <>
                            <h1>About Us</h1>
                            <p dangerouslySetInnerHTML={{__html: data.bio.text}}></p>
                            {data.bio.contact && (
                                <div className='about-contact'>
                                    <p>{data.bio.contact.name}</p>
                                    <a href={`mailto:${data.bio.contact.email}`}>
                                        {data.bio.contact.email}
                                    </a>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}