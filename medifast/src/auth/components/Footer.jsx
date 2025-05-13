import { Link } from 'react-router-dom';    
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



export const Footer = () => {
    return (
        <>
            <footer className="grid grid-cols-5 gap-5 px-12 py-2 bg-[#e7e7e7] border-t border-[#ccc] mt-8">
                <div className="footer-item col-span-1">
                    <h3 className="font-bold text-lg">Medifast</h3>
                    <p>© 2025</p>
                    <p className="my-2"><Link to="/privacy" className="no-underline text-black hover:text-gray-700">Privacy</Link> - <Link to="/terms" className="no-underline text-black hover:text-gray-700">Terms</Link></p>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1">
                    <Link to="/ayuda" className="block my-2 font-bold text-black hover:text-gray-700">Ayuda</Link>
                    <Link to="/about" className="block my-2 text-black hover:text-gray-700">Acerca de Nosotros</Link>
                    <Link to="/adminDashboard" className="block my-2 text-black hover:text-gray-700">Vista de Admin</Link>
                    <Link to="/faq" className="block my-2 text-black hover:text-gray-700">FAQ</Link>
                </div>
                <div className="col-span-1"></div>
                <div className="flex justify-around">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                    </a>
                </div>
            </footer>
        </>
    );
};
