import React from "react";
import "./styles.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {currentYear} Authorization. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
