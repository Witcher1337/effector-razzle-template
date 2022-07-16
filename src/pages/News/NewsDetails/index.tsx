import {$details} from '@features/news/model';
import {useStore} from 'effector-react';
import {Link, useParams} from 'react-router-dom';
import {useStart, withStart} from 'shared/libs/page-routing';
import {mounted, PageParams} from './model';

export const NewsDetails = withStart(mounted, () => {
  const {id} = useParams<PageParams>();
  const details = useStore($details);
  
  useStart(mounted, {
    withSSR: true,
    deps: [id],
  });

  return (
    <div>
      <article>
        {details?.name}
        {details?.description}
      </article>

      <Link to="/news/2">
        News 2
      </Link>
    </div>
  )
})