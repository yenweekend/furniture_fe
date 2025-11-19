import { Route, Routes } from "react-router-dom";
import { NotFound } from "./containers/components";

import Master from "./containers/layouts/user/Master";

import { Home, ProductsSearched , Products} from "./containers/pages/ui";
import Login from "./containers/pages/ui/Account/Login";
import Register from "./containers/pages/ui/Account/Register";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Master />} path={""}>
          <Route element={<Home />} path={"/"}></Route>
          <Route element={<ProductsSearched />} path={"/search"}></Route>
          <Route element={<Products />} path={"/products/:slug"}></Route>

          <Route element={<Login />} path={"/account/login"}></Route>
          <Route element={<Register />} path={"/account/register"}></Route>
          <Route element={<NotFound />} path="/*"></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
