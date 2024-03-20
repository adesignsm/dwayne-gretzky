import { useEffect, useState } from 'react';
import { useSpring, useScroll, animated } from 'react-spring';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';
import GRADIENT from '../../Assets/logos/gradient_logo.svg';

export const Hero = () => {
    const [data, setData] = useState([]);
    const [width] = useState(window.innerWidth);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
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
        top: scrollYProgress.interpolate([0, 0.65], ['60px', '30px']),
        left: '50%',
        transform: scrollYProgress.interpolate(
            [0, 0.5],
            ['translateX(-50%)', 'translateX(-50%) scale(0.5)']
        ),
        width: scrollYProgress.interpolate([0, 0.8], ['100%', '35px']),
        from: { top: '50px', left: '0', width: '100%' },
        config: { duration: 0 }
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let startY = 0;
    
        const handleTouchMove = (event) => {
            const currentY = event.touches[0].clientY;
            const deltaY = currentY - startY;
            setVisible(deltaY > 200 || window.scrollY === 0);
            startY = currentY;
        };
    
        window.addEventListener('touchstart', (event) => {
            startY = event.touches[0].clientY;
        });
    
        window.addEventListener('touchmove', handleTouchMove);
    
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
    

    return (
        <>
            <section className="hero">
                {data && data.backgroundImage && (
                    <img className='background-image' src={urlFor(data.backgroundImage.asset._ref).url()}/>
                )}
                {data && data.logo && (
                    <a href='/' className={`${visible ? 'show' : 'hide'}`}>
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