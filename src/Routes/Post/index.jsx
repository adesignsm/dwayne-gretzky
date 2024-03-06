import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

export const Post = () => {
    const { pathname } = useLocation();
    const pathParts = pathname.split('/');
    const postFromPathname = pathParts[pathParts.length - 1];
    const builder = ImageUrlBuilder(sanityClient);

    const [postData, setPostData] = useState([]);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'home'][0]`;
            const result = await sanityClient.fetch(query);
            result.posts.forEach((post) => {
                if (post.cta.slug.current.includes(postFromPathname)) {
                    setPostData(post);
                }
            })
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
            <div className='post-page'>
                <section className='post-section'>
                    <article className='post'>
                        {Object.keys(postData).length > 0 ? (
                            <div className='content'>
                                <img className='media' src={urlFor(postData.media.asset._ref).url()} />
                                <h1>{postData.heading}</h1>
                                <h3>{postData.subTitle}</h3>
                                <p>{postData.description}</p>
                            </div>
                        ) : (
                            <h1> Nothing to see here... </h1>
                        )}
                    </article>
                </section>
            </div>
        </>
    )
}