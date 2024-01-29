import './index.css';

import FacebookIcon from '../../Assets/socialMediaIcons/facebook.svg';
import InstagramIcon from '../../Assets/socialMediaIcons/instagram.svg';
import YoutubeIcon from '../../Assets/socialMediaIcons/youtube.svg';
import SpotifyIcon from '../../Assets/socialMediaIcons/spotify.svg'; 

export const Header = () => {
    return (
        <>
            <header className='header'>
                <ul className='social-media-icons'>
                    <li><img src={FacebookIcon} /></li>
                    <li><img src={InstagramIcon} /></li>
                    <li><img src={YoutubeIcon} /></li>
                    <li><img src={SpotifyIcon} /></li>
                </ul>
            </header>
        </>
    )
}