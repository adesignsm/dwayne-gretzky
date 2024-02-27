import { useEffect, useState } from 'react';
import { useSpring, useScroll, animated } from 'react-spring';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';
import GRADIENT from '../../Assets/logos/gradient_logo.png';

export const Hero = () => {
    const [data, setData] = useState([]);
    const [width] = useState(window.innerWidth);
    const [lastTouchY, setLastTouchY] = useState(null);
    const { scrollYProgress } = useScroll();

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

    const logoAnimation = useSpring({
        top: scrollYProgress.interpolate([0, 0.5], ['70px', '40px']),
        left: '50%',
        transform: scrollYProgress.interpolate(
            [0, 0.5],
            ['translateX(-50%)', 'translateX(-50%) scale(0.5)']
        ),
        width: scrollYProgress.interpolate([0, 0.8], ['100%', '50%']),
        from: { top: '50px', left: '0', width: '100%' },
        config: { duration: 0 }
    });

    const handleTouchStart = (e) => {
        const currentTouchY = e.touches[0].clientY;

        if (lastTouchY !== null) {
            const deltaY = currentTouchY - lastTouchY;

            if (deltaY > 0) {
                console.log("Scrolling down");
                document.querySelector('.logo').classList.add('show');
                document.querySelector('.logo').classList.remove('hide');
            } else if (deltaY < 0) {
                console.log("Scrolling up");
                document.querySelector('.logo').classList.add('hide');
                document.querySelector('.logo').classList.remove('show');
            } else {
                console.log("No vertical scroll");
            }
        }
        setLastTouchY(currentTouchY);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className="hero" onTouchStart={(e) => handleTouchStart(e)}>
                {data && data.backgroundImage && (
                    <img className='background-image' src={urlFor(data.backgroundImage.asset._ref).url()}/>
                )}
                {data && data.logo && (
                    <a href='/'>
                        <animated.img 
                            className='logo' 
                            src={urlFor(data.logo.asset._ref).url()} 
                            style={ width > 768 ? logoAnimation : null }
                        />
                        <animated.img 
                            className='logo gradient' 
                            src={GRADIENT} 
                            style={ width > 768 ? logoAnimation : null }
                        />
                    </a>
                )}
            </section>
        </>
    )
}