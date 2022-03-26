import { BiGithub, BiTwitter, BiLinkedin } from "../../assets/icons/Icons";

import "./footer.css";

function Footer() {
  return (
    <footer className="footer d-flex align-center justify-center">
      <p className="fs-s">Made with ❤️ by Sainath</p>
      <div>
        <a
          href="/"
          className="footer-link fs-l mr-sm"
          target="_blank"
          rel="noreferrer"
        >
          <BiGithub />
        </a>
        <a
          href="/"
          className="footer-link fs-l mr-sm"
          target="_blank"
          rel="noreferrer"
        >
          <BiTwitter />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="footer-link fs-l"
        >
          <BiLinkedin />
        </a>
      </div>
    </footer>
  );
}

export { Footer };