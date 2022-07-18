import { Route, Routes } from "react-router-dom";

import { NotFound } from "pages/NotFound";
import { routes } from "pages/routes";

export const Application = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
