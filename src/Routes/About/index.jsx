import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import { Hero } from '../../Components/Hero';

import './index.css';

export const About = () => {
    return (
        <>
            <div className='about-page'>
                <Hero />
            </div>
        </>
    )
}