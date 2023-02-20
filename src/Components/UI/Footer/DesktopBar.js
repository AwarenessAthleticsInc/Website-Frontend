import { Link } from "react-router-dom";
import GradiantBackground from "../../Layout/GradiantBackground";
import FacebookButton from "../../Buttons/FacebookButton";
import InstagramButton from "../../Buttons/InstagramButton";
import styles from "./DesktopBar.module.css";
import KingstonLogo from '../../../Assets/Images/Kingston.png'
import PeterboroughLogo from '../../../Assets/Images/Peterborough.png'
import BellevilleLogo from '../../../Assets/Images/Belleville.png'
import BowmanvilleLogo from '../../../Assets/Images/Bowmanville.png'
import AjaxLogo from '../../../Assets/Images/Ajax.png'

const DesktopBar = () => {
    var year = new Date().getFullYear();
    const sponsors = [
        {
            name: 'Allstate Kingston',
            image: KingstonLogo,
            link: 'https://agents.allstate.ca/on/kingston/656-gardiners-rd.html'
        },
        {
            name: 'Allstate Peterborough',
            image: PeterboroughLogo,
            link: 'https://agents.allstate.ca/on/peterborough/815-high-st.html'
        },
        {
            name: 'Allstate Belleville',
            image: BellevilleLogo,
            link: 'https://agents.allstate.ca/on/belleville/365-north-front-st.html'
        },
        {
            name: 'Allstate Bowmanville',
            image: BowmanvilleLogo,
            link: 'https://agents.allstate.ca/on/bowmanville/1-hartwell-ave.html'
        },
        {
            name: 'Allstate Ajax',
            image: AjaxLogo,
            link: 'https://agents.allstate.ca/on/ajax/15-westney-rd-n.html'
        },

    ];
    return <GradiantBackground><div className={styles.footer}>
        <div className="col-md-4">
            <h6>Contact Us</h6>
            <div className={styles.socials}>
                <span><FacebookButton /></span>
                <span><InstagramButton /></span>
            </div>
            <p>Tournament Inquiries: <a href="mailto:info@spfacanada.ca">info@spfacanada.ca</a></p>
            <p>Product Inquiries: <a href="mailto:orders@spfacanada.ca">orders@spfacanada.ca</a></p>
        </div>
        <div className="col-md-4">
            <h6>Sponsors</h6>
            <p><a href="https://nsacanada.ca/" rel="noreferrer" target="_blank">NSA Canada</a></p>
            {sponsors.map((sponser, index) => {
                return <a key={index} href={sponser.link} target="_blank" rel="noreferrer" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img height='75px' src={sponser.image} alt={`${sponser.name} logo`} />
                    <p>{sponser.name}</p>
                </a>
            })}
            {/* <p><a href="https://lteventmedical.ca/" target="_blank">LT Event Medical Services</a></p>
            <p><a href="https://www.brokerlink.ca/" target="_blank">Brokerlink Insurance</a></p> */}
        </div>
        <div className="col-md-4">
            <h6>Our Policies</h6>
            <p><Link to="/privacy-policies">Privacy Policy</Link></p>
            <p><Link to="/terms-conditions">Terms and Conditions</Link></p>
            <p><Link to="/refunds-returns">Refund and Return Policy</Link></p>
            <p><Link to="/cookies">Cookies Policy</Link></p>
        </div>
    </div>
        <p className={styles.trademark}>{`Copyright © ${year} Awareness Athletics Inc.`}</p>
    </GradiantBackground>
}
export default DesktopBar;