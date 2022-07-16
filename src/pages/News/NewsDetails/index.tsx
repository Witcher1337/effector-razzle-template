import { useStore } from "effector-react";
import { Link, useParams } from "react-router-dom";

import { $details } from "@features/news/model";
import { useLifeCycle, withStart } from "shared/libs/page-routing";

import { mounted, PageParams, unmounted } from "./model";

export const NewsDetails = withStart(mounted, () => {
  const { id } = useParams<PageParams>();
  const details = useStore($details);

  useLifeCycle(
    {
      mount: mounted,
      unmount: unmounted,
    },
    [id],
  );

  return (
    <div>
      <article>
        {details?.name}
        {details?.description}
      </article>

      <Link to="/news/2">News 2</Link>
    </div>
  );
});
