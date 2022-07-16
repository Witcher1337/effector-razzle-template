import { useStore } from "effector-react/scope";
import { Link } from "react-router-dom";

import { $sampleStore } from "@features/sample/model";
import { withStart } from "shared/libs/page-routing";

import { pageStarted } from "./model";

export const Home = withStart(pageStarted, () => {
  const sampleStore = useStore($sampleStore);

  return (
    <div>
      <h1>Home Page</h1>
      $sampleStore: {sampleStore}
      <Link to="/news">News</Link>
    </div>
  );
});
