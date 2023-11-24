import Register from "./components/Register";
import Login from "./components/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Home from "./components/Home";
import Users from "./components/views/Users";
import Layout from "./components/layouts/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import UserAdd from "./components/UserAdd";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import MainTemplate from "./components/layouts/MainTemplate";

import { Routes, Route } from "react-router-dom";

import {
  LOGIN_ROUTE,
  PRIVACY_POLICY_ROUTE,
  REGISTER_ROUTE,
  LINKPAGE_ROUTE,
  UNAUTHORIZED_ROUTE,
  DASHBOARD_ROUTE,
  USERS_ROUTE,
  ADMIN_ROUTE,
  EDITOR_ROUTE,
  LOUNGE_ROUTE,
  PRIVILIGE_ROUTE,
  ROLES_ROUTE,
  WORKERSPOSITION_ROUTE,
  WORKERS_ROUTE,
  CUSTOMERS_ROUTE,
  COMPANIES_ROUTE,
  BRANDS_ROUTE,
  PRODUCTCLASSES_ROUTE,
  PRODUCTS_ROUTE,
  PURCHASEONE_ROUTE,
  PURCHASETWO_ROUTE,
  WAREHOUSEONE_ROUTE,
  WAREHOUSETWO_ROUTE,
  ORDERONE_ROUTE,
  ORDERTWO_ROUTE,
  PAYMENTONE_ROUTE,
  PAYMENTTWO_ROUTE,
  STATISTICONE_ROUTE,
  STATISTICTWO_ROUTE,
  COMMONINFOONE_ROUTE,
  COMMONINFOTWO_ROUTE,
} from "./utils/consts";
import Privilege from "./components/views/Privilege";
import Roles from "./components/views/Roles";
import WorkersPosition from "./components/views/WorkersPosition";
import Workers from "./components/views/Workers";
import Customers from "./components/views/Customers";
import Companies from "./components/views/Companies";
import Brands from "./components/views/Brands";
import ProductsClasses from "./components/views/ProductsClasses";
import Products from "./components/views/Products";
import PurchaseOne from "./components/views/PurchaseOne";
import PurchaseTwo from "./components/views/PurchaseTwo";
import WarehouseOne from "./components/views/WarehouseOne";
import WarehouseTwo from "./components/views/WarehouseTwo";
import OrderOne from "./components/views/OrderOne";
import OrderTwo from "./components/views/OrderTwo";
import PaymentOne from "./components/views/PaymentOne";
import PaymentTwo from "./components/views/PaymentTwo";
import StatisticOne from "./components/views/StatisticOne";
import StatisticTwo from "./components/views/StatisticTwo";
import CommonInfoOne from "./components/views/CommonInfoOne";
import CommonInfoTwo from "./components/views/CommonInfoTwo";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Approver: 6010,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={PRIVACY_POLICY_ROUTE} element={<PrivacyPolicy />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={LINKPAGE_ROUTE} element={<LinkPage />} />
        <Route path={UNAUTHORIZED_ROUTE} element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<MainTemplate />}>
              <Route index path={DASHBOARD_ROUTE} element={<Home />} />

              <Route index path="/" element={<Home />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path={ADMIN_ROUTE} element={<Admin />} />
                <Route path={PRIVILIGE_ROUTE} element={<Privilege />} />
                <Route path={ROLES_ROUTE} element={<Roles />} />
                <Route path={USERS_ROUTE} element={<Users />} />
                <Route path={WORKERSPOSITION_ROUTE} element={<WorkersPosition />}/>
                <Route path={WORKERS_ROUTE} element={<Workers />} />
                <Route path={CUSTOMERS_ROUTE} element={<Customers />} />
                <Route path={COMPANIES_ROUTE} element={<Companies />} />
                <Route path={BRANDS_ROUTE} element={<Brands />} />
                <Route path={PRODUCTCLASSES_ROUTE} element={<ProductsClasses />}                />
                <Route path={PRODUCTS_ROUTE} element={<Products />} />
                <Route path={PURCHASEONE_ROUTE} element={<PurchaseOne />} />
                <Route path={PURCHASETWO_ROUTE} element={<PurchaseTwo />} />
                <Route path={WAREHOUSEONE_ROUTE} element={<WarehouseOne />} />
                <Route path={WAREHOUSETWO_ROUTE} element={<WarehouseTwo />} />
                <Route path={ORDERONE_ROUTE} element={<OrderOne />} />
                <Route path={ORDERTWO_ROUTE} element={<OrderTwo />} />
                <Route path={PAYMENTONE_ROUTE} element={<PaymentOne />} />
                <Route path={PAYMENTTWO_ROUTE} element={<PaymentTwo />} />
                <Route path={STATISTICONE_ROUTE} element={<StatisticOne />} />
                <Route path={STATISTICTWO_ROUTE} element={<StatisticTwo />} />
                <Route path={COMMONINFOONE_ROUTE} element={<CommonInfoOne />} />
                <Route path={COMMONINFOTWO_ROUTE} element={<CommonInfoTwo />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                <Route path={EDITOR_ROUTE} element={<Editor />} />
              </Route>

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
                }
              >
                <Route path={LOUNGE_ROUTE} element={<Lounge />} />
              </Route>

              {/* catch all */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
