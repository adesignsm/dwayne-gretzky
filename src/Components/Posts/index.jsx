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

    console.log(data);

    return (
        <>
            <section className='posts'>
                {data && (
                    data.map((post) => {
                        return (
                            <article key={post._key}>
                                <img src={urlFor(post.media.asset._ref).url()} />
                                <div className='content'>
                                    <h1>{post.heading}</h1>
                                    <h3>{post.subTitle}</h3>
                                    <p>{post.description}</p>
                                    <button>{post.cta.text}</button>
                                </div>
                            </article>
                        )
                    })
                )}
            </section>
        </>
    )
}