import { BiGithub, BiTwitter, BiLinkedin } from "assets/icons/Icons";

import "./footer.css";

function Footer() {
  return (
    <footer className="footer d-flex align-center justify-center">
      <p className="fs-s">Made with ❤️ by Sainath</p>
      <div>
        {[BiGithub, BiTwitter, BiLinkedin].map((LinkItem, index) => {
          return (
            <a
              key={index}
              href="/"
              target="_blank"
              rel="noreferrer"
              className="footer-link fs-l mr-sm"
            >
              <LinkItem />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export { Footer };
