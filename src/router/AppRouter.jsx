import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ListProductsPage } from "../pages/ListProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { OrderDetailPage } from "../pages/OrderDetailPage";
import { OrderStatusPage } from "../pages/OrderStatusPage";
import { UserPage } from "../pages/UserPage";
import PersistLogin from "./PersitRouter";
import RequireAuth from "./RequiereAuth";
import { OrderDetailUnpaidPage } from "../pages/OrderDetailUnpaidPage";
import { MapPage } from "../pages/MapPage";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ordenes/:status" element={<OrderStatusPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
            <Route
              path="/orderUnpaid/:id"
              element={<OrderDetailUnpaidPage />}
            />
            <Route path="/productos" element={<ListProductsPage />} />

            <Route path="/user" element={<UserPage />} />
            <Route path="/mapa" element={<MapPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
