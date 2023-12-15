import './footer.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTelegram, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="section__footer">
        <div className="footer__block">
            <FontAwesomeIcon className="footer__icon" icon={faGoogle}></FontAwesomeIcon>
            <FontAwesomeIcon className="footer__icon" icon={faTelegram}></FontAwesomeIcon>
            <FontAwesomeIcon className="footer__icon" icon={faInstagram}></FontAwesomeIcon>
        </div>
        <h2>ООО «237#»</h2>
    </footer>  
    )
}

export default Footer;