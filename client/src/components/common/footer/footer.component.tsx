import "./footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-bottom-container">
          <div className="footer-bottom-left">
            <div className="footer-lists">LearnDemy Business</div>
            <div className="footer-lists">Teach on LearnDemy</div>
            <div className="footer-lists">About Us</div>
            <div className="footer-lists">Blog</div>
            <div className="footer-lists">Help and Support</div>
            <div className="footer-lists">Cookies Settings</div>
            <div className="footer-lists">Contact us</div>
            <div className="footer-lists">Investors</div>
            <div className="footer-lists">Accessibility Statement</div>
            <div className="footer-lists">SiteMap</div>
            <div className="footer-lists">Get the App</div>
          </div>
          <div className="footer-bottom-right">
            <button className="footer-language">English</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-items">
            <h2>LearnDemy</h2>
          </div>
          <div className="footer-bottom-items last-item">
          &copy; 2023 LearnDemy, Inc
          </div>
        </div>
      </footer>
    </>
  );
}
