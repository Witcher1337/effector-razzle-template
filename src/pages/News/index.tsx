import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const News = () => (
  <div>
    <Helmet>
      <title>News</title>
    </Helmet>

    <h1>News</h1>
    <Link to="/">Home</Link>

    <article>
      <h2>News 1</h2>

      <Link to="/news/1">Details</Link>
    </article>
  </div>
);
