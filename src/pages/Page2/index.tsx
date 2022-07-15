import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

export const Page2 = () => (
  <div>
    <Helmet>
      <title>Page 2 title</title>
    </Helmet>

    <h1>Page 2</h1>
    <Link to="/">Home</Link>
  </div>
)