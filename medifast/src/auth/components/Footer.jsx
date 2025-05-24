import { useContext } from 'react';
import { Link } from 'react-router-dom';    
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import { UserContext } from '../../contexts/UserProvider';


export const Footer = () => {

    const { user } = useContext(UserContext)


    return (
        <>
            <footer className="grid grid-cols-5 gap-5 px-12 py-2 bg-[#f2fbf2] border-t border-[#ccc]">
                <div className="footer-item col-span-1">
                    <h3 className="font-bold text-lg">Medifast</h3>
                    <p>© 2025</p>
                    <p className="my-2 no-underline text-black">Todos los derechos reservados</p>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1 items-center">
                    <h3 className="block my-2 font-bold text-black">Ayuda</h3>
                    <Link to="/contactUs" className="block my-2 text-black hover:text-[#41b541]">Acerca de Nosotros</Link>
                    {
                        user.state === "admin" ? (
                            <Link to="/adminProfile" className="block my-2 text-black hover:text-[#41b541]">
                            Vista de admin
                            </Link>
                        ) : null
                    }
                </div>
                <div className="col-span-1"></div>
                <div className="flex justify-around items-center">
                    <a className="hover:text-[#41b541]" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                    </a>
                    <a className="hover:text-[#41b541]" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                    </a>
                    <a className="hover:text-[#41b541]" href="https://www.instagram.com/alesw31?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                    </a>
                    <a className="hover:text-[#41b541]" href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                    <YoutubeIcon />
                    </a>
                </div>
            </footer>
        </>
    );
};   