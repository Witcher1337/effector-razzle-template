import {Route, Routes} from 'react-router-dom';
import {routes} from 'pages/routes';

export const Application = () => {
  return (
    <Routes>
      {routes.map(({path, element:Element}, index) => (
        <Route
          key={index}
          path={path}
          element={<Element />}
        />
      ))}
    </Routes>
  )
}