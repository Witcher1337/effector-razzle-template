import { Route, Routes } from "react-router-dom";

import { routes } from "pages/routes";

export const Application = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element }) => (
        <Route path={path} element={<Element />} />
      ))}
    </Routes>
  );
};
