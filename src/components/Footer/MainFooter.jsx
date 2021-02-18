import React from 'react';
import '../../assets/css/components/footer.css';
import FooterCol from './FooterCol';

export default function MainFooter() {
  return (
    <footer>
      <div className={'footer-main'}>
        <div className={'footer__container'}>
          <FooterCol>
            <li>Here to help</li>
            <li>Contact us</li>
            <li>Help and FAQs</li>
          </FooterCol>
          <FooterCol>
            <li>About Tesco</li>
            <li>Store Vacancies</li>
            <li>Careers</li>
            <li>Tesco PLC</li>
            <li>Sustainability</li>
          </FooterCol>
          <FooterCol>
            <li>Stocks and Shares</li>
            <li>News</li>
            <li>Tesco PLC</li>
            <li>Stock Screeener</li>
            <li>Accessibility</li>
          </FooterCol>
          <FooterCol>
            <li>Tesco Finance</li>
            <li>About</li>
            <li>Terms and Conditions</li>
            <li>Privacy and Cookie Policy</li>
            <li>Site Map</li>
          </FooterCol>
        </div>
      </div>
      <div className={'footer-suffix'}>© Arvin Abdollahzadeh 2021</div>
    </footer>
  );
}
