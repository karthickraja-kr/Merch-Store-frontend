import React from "react";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer bd-footer py-2 mt-5 bg-light">
        <div className="container py-1">
          <div className="row">
            <div className="col">
              <img src={logo} style={{ height: 50 }} alt="Merch Store" />
              <ul className="list-unstyled small text-muted">
                <li className="mb-2">Merch Store</li>
                <li className="mb-2">Built with MERN Stack .</li>
                <li className="mb-2">
                  For more info visit{"   "}
                  <a
                    href="https://github.com/karthickraja-kr/Merch-Store-frontend"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                  .
                </li>
                <li className="mb-2">
                  Created by{"   "}
                  <a
                    href="https://karthickraja.me"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Karthick
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center">© 2021 All Rights Reserved | Code with ❤</p>
      </footer>
    </div>
  );
};

export default Footer;
