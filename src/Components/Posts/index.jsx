import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

export const Posts = () => {
    const [data, setData] = useState([]);

    const builder = ImageUrlBuilder(sanityClient);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'home'][0]`;
            const result = await sanityClient.fetch(query);
            setData(result.posts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className='posts'>
                {data && (
                    data.map((post) => {
                        return (
                            <article key={post._key}>
                                <img src={urlFor(post.media.asset._ref).url()} />
                                <div className='content'>
                                    <a href={`/post${post.cta.slug.current}`}>
                                        <h1>{post.heading}</h1>
                                    </a>
                                    <h3>{post.subTitle}</h3>
                                    <p>{post.description.split(' ').length > 65 
                                        ? post.description.split(' ').slice(0, 65).join(' ') + '...' 
                                        : post.description}
                                    </p>
                                    <a className='cta' href={`/post${post.cta.slug.current}`}>
                                        {post.cta.text}
                                    </a>
                                </div>
                            </article>
                        )
                    })
                )}
            </section>
        </>
    )
}