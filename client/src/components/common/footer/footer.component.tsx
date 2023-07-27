import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <section className="footer-bottom-container">
        <nav className="footer-bottom-left">
          <div className="footer-links">LearnDemy Business</div>
          <div className="footer-links">Teach on LearnDemy</div>
          <div className="footer-links">About Us</div>
          <div className="footer-links">Blog</div>
          <div className="footer-links">Help and Support</div>
          <div className="footer-links">Cookies Settings</div>
          <div className="footer-links">Contact us</div>
          <div className="footer-links">Investors</div>
          <div className="footer-links">Accessibility Statement</div>
          <div className="footer-links">SiteMap</div>
          <div className="footer-links">Get the App</div>
        </nav>
        <div className="footer-bottom-right">
          <button className="footer-language" aria-label="Select Language">
            English
          </button>
        </div>
      </section>
      <section className="footer-bottom">
        <div className="footer-bottom-items">
          <h2>LearnDemy</h2>
        </div>
        <div className="footer-bottom-items last-item">
          &copy; 2023 LearnDemy, Inc
        </div>
      </section>
    </footer>
  );
}

export default Footer;