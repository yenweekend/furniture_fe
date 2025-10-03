import { Route, Routes } from "react-router-dom";
import { NotFound } from "./containers/components";

import Master from "./containers/layouts/user/Master";

import { Home } from "./containers/pages/ui";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Master />} path={""}>
          <Route element={<Home />} path={"/"}></Route>
          <Route element={<NotFound />} path="/*"></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
