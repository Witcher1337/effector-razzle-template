import {$sampleStore, getSample} from '@features/sample/model';
import {useStore} from 'effector-react/scope';
import {Link} from 'react-router-dom';
import {withStart} from 'shared/libs/page-routing';

export const Home = withStart(getSample, () => {
  const sampleStore = useStore($sampleStore);

  return (
    <div>
      <h1>
      Home Page
      </h1>

      $sampleStore: {sampleStore}
      <Link to="/page2">Page 2</Link>
    </div>
  );
});
