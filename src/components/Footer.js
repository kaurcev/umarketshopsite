import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "../styles/footer.css";
import packageJson from '../../package.json';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer">
          <div>
            <img className="logo" src={logo} alt="юМаркет Шоп" />
            <p className="mini">
              <Link href="mailto:info@umarketshop.site">
                info@umarketshop.site
              </Link>
            </p>
          </div>
          <div>
            <p className="mini">
              "юМаркет Шоп" v{packageJson.version} build {packageJson.build}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
