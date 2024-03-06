import { useEffect, useState } from 'react';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

export const Videos = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const query = `*[_type == 'videosPage'][0]`;
            const result = await sanityClient.fetch(query);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="videos-page">
            <div className='videos-container'>
                <h1>Videos</h1>
                <div className='videos'>
                    {data && data.videoLinks && (
                        data.videoLinks.map((video, index) => {
                            const videoId = video.url.match(/(?:\?v=|\/embed\/|\/\d\/|\/vi?\/|youtu\.be\/|\/(?:user|e\/|embed\/|v|watch\?v=))([^\?&"'<> #]+)/)[1];
                            return (
                                <div key={index} className={video.mainVideoToggle ? 'main-video' : 'side-videos'}>
                                    <iframe 
                                        className={video.mainVideoToggle ? 'video' : 'side-video'}
                                        title='Youtube player'
                                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                        src={`https://youtube.com/embed/${videoId}?autoplay=0`}
                                    ></iframe>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}