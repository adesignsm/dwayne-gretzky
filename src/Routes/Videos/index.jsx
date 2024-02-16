import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import { Hero } from "../../Components/Hero"

export const Videos = () => {
    return (
        <div className="videos-page">
            <Hero />
        </div>
    )
}