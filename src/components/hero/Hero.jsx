import { banner } from "assets/index";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="main">
      <div className="banner-text">
        <h1 className="fs-l">Meet you Modern</h1>
        <h1 className="fs-l secondary-text">Note Keeping App</h1>
        <h2 className="fs-ml app-desc mb-sm">
          Manage your daily tasks and workflow in a modern way and boost your
          efficiency without any efforts.
        </h2>
        <Link to="/signin">
          <button className="btn btn-secondary fs-m border-sm">
            Join Now
          </button>
        </Link>
      </div>
      <div className="banner-image">
        <img src={banner} className="image-res" alt="banner" />
      </div>
    </main>
  );
}

export { Hero };
