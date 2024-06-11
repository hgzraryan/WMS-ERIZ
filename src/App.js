// import Register from "./components/Register";
// import Login from "./components/Login";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import Home from "./components/Home";
// import Users from "./components/views/Users";
// import Layout from "./components/layouts/Layout";
// import Editor from "./components/Editor";
// import Admin from "./components/Admin";
// import Missing from "./components/Missing";
// import Unauthorized from "./components/Unauthorized";
// import Lounge from "./components/Lounge";
// import LinkPage from "./components/LinkPage";
// import RequireAuth from "./components/RequireAuth";
// import PersistLogin from "./components/PersistLogin";
// import MainTemplate from "./components/layouts/MainTemplate";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
//wareHouseList
//commodityValuesList
//priceList
//???
//wareHouseImport/importWarrent
//commodityPurchaseRetail
//commodityMovement
//commodityRevaluation
//commodityDischarge kam Export
//inventory
//inventoryByScanner
//GroupNameList
//grouping
//ungrouping
//partition
//expiredCommodity
//minimalCount
//requirements
//defectura
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
  WARREHOUSESLIST_ROUTE,
  WAREHOUSETWO_ROUTE,
  ORDERONE_ROUTE,
  ORDERTWO_ROUTE,
  PAYMENTONE_ROUTE,
  PAYMENTTWO_ROUTE,
  STATISTICONE_ROUTE,
  STATISTICTWO_ROUTE,
  COMMONINFOONE_ROUTE,
  COMMONINFOTWO_ROUTE,
  ROLES,
  USERS_ID_ROUTE,
  LISTOFPRODUCTVALUES_ROUTE,
  PRICELIST_ROUTE,
  PRODUCTCOVER_ROUTE,
  ACCESSWARRANT_ROUTE,
  RETAILPURCHASE_ROUTE,
  MOVEMENTSOFPRODUCTS_ROUTE,
  PRODUCTREASSESSMENT_ROUTE,
  PRODUCTCHECKOUT_ROUTE,
  INVENTORY_ROUTE,
  INVENTORYBYSCANNER_ROUTE,
  LISTOFSET_ROUTE,
  COMPILATION_ROUTE,
  DISASSEMBLY_ROUTE,
  FRAGMENTATION_ROUTE,
  EXPIREDOBSPRODUCTS_ROUTE,
  MINLIMITPRODUCTS_ROUTE,
  REQUIREMENTS_ROUTE,
  DEFACTURA_ROUTE,
  PARTNERS_ROUTE
} from "./utils/constants";
const Register = lazy(()=>  import("./components/Register"));
const Login = lazy(()=>  import("./components/Login"));
const PrivacyPolicy = lazy(()=>  import("./components/PrivacyPolicy"));
const Home = lazy(()=>  import("./components/Home"));
const Users = lazy(()=>  import("./components/views/Users"));
const UserDetails = lazy(()=>  import("./components/viewDetails/UserDetails"));
const Layout = lazy(()=>  import("./components/layouts/Layout"));
const Editor = lazy(()=>  import("./components/Editor"));
const Admin = lazy(()=>  import("./components/Admin"));
const Missing = lazy(()=>  import("./components/Missing"));
const Unauthorized = lazy(()=>  import("./components/Unauthorized"));
const Lounge = lazy(()=>  import("./components/Lounge"));
const LinkPage = lazy(()=>  import("./components/LinkPage"));
const RequireAuth = lazy(()=>  import("./components/RequireAuth"));
const PersistLogin = lazy(()=>  import("./components/PersistLogin"));
const MainTemplate = lazy(()=>  import("./components/layouts/MainTemplate"));
const Privilege = lazy(()=>  import("./components/views/Privilege"));
const Roles = lazy(()=>  import("./components/views/Roles"));
const WorkersPosition = lazy(()=>  import("./components/views/WorkersPosition"));
const Workers = lazy(()=>  import("./components/views/Workers"));
const Customers = lazy(()=>  import("./components/views/Customers"));
const Companies = lazy(()=>  import("./components/views/Companies"));
const Partners = lazy(()=>  import("./components/views/Partners"));
const Brands = lazy(()=>  import("./components/views/Brands"));
const ProductsClasses = lazy(()=>  import("./components/views/ProductsClasses"));
const Products = lazy(()=>  import("./components/views/Products"));
const PurchaseOne = lazy(()=>  import("./components/views/PurchaseOne"));
const PurchaseTwo = lazy(()=>  import("./components/views/PurchaseTwo"));
const OrderOne = lazy(()=>  import("./components/views/OrderOne"));
const OrderTwo = lazy(()=>  import("./components/views/OrderTwo"));
const PaymentOne = lazy(()=>  import("./components/views/PaymentOne"));
const PaymentTwo = lazy(()=>  import("./components/views/PaymentTwo"));
const StatisticOne = lazy(()=>  import("./components/views/StatisticOne"));
const StatisticTwo = lazy(()=>  import("./components/views/StatisticTwo"));
const CommonInfoOne = lazy(()=>  import("./components/views/CommonInfoOne"));
const CommonInfoTwo = lazy(()=>  import("./components/views/CommonInfoTwo"));
const WareHousesList = lazy(()=>  import("./components/views/WareHousesList"));
const Defectura = lazy(()=>  import("./components/views/Defectura"));
const Requirements = lazy(()=>  import("./components/views/Requirements"));
const MinLimitProducts = lazy(()=>  import("./components/views/MinLimitProducts"));
const ExpiredObsProducts = lazy(()=>  import("./components/views/ExpiredObsProducts"));
const Fragmentation = lazy(()=>  import("./components/views/Fragmentation"));
const Disassembly = lazy(()=>  import("./components/views/Disassembly"));
const Compilation = lazy(()=>  import("./components/views/Compilation"));
const ListOfSet = lazy(()=>  import("./components/views/ListOfSet"));
const InventoryByScanner = lazy(()=>  import("./components/views/InventoryByScanner"));
const Inventory = lazy(()=>  import("./components/views/Inventory"));
const ProductCheckout = lazy(()=>  import("./components/views/ProductCheckout"));
const ProductReassessment = lazy(()=>  import("./components/views/ProductReassessment"));
const MovementsOfProducts = lazy(()=>  import("./components/views/MovementsOfProducts"));
const RetailPurchase = lazy(()=>  import("./components/views/RetailPurchase"));
const AccessWarrant = lazy(()=>  import("./components/views/AccessWarrant"));
const ProductCover = lazy(()=>  import("./components/views/ProductCover"));
const PriceList = lazy(()=>  import("./components/views/PriceList"));
const ListOfProductValues = lazy(()=>  import("./components/views/ListOfProductValues"));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>

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
                <Route path={USERS_ID_ROUTE} element={<UserDetails />} />
                <Route path={WORKERSPOSITION_ROUTE} element={<WorkersPosition />}/>
                <Route path={WORKERS_ROUTE} element={<Workers />} />
                <Route path={CUSTOMERS_ROUTE} element={<Customers />} />
                <Route path={COMPANIES_ROUTE} element={<Companies />} />
                <Route path={PARTNERS_ROUTE} element={<Partners />} />
                <Route path={BRANDS_ROUTE} element={<Brands />} />
                <Route path={PRODUCTCLASSES_ROUTE} element={<ProductsClasses />} />
                <Route path={PRODUCTS_ROUTE} element={<Products />} />
                <Route path={PURCHASEONE_ROUTE} element={<PurchaseOne />} />
                <Route path={PURCHASETWO_ROUTE} element={<PurchaseTwo />} />
                <Route path={WARREHOUSESLIST_ROUTE} element={<WareHousesList />} />
                <Route path={LISTOFPRODUCTVALUES_ROUTE} element={<ListOfProductValues />} />
                <Route path={PRICELIST_ROUTE} element={<PriceList />} />
                <Route path={PRODUCTCOVER_ROUTE} element={<ProductCover />} />
                <Route path={ACCESSWARRANT_ROUTE} element={<AccessWarrant />} />
                <Route path={RETAILPURCHASE_ROUTE} element={<RetailPurchase />} />
                <Route path={MOVEMENTSOFPRODUCTS_ROUTE} element={<MovementsOfProducts />} />
                <Route path={PRODUCTREASSESSMENT_ROUTE} element={<ProductReassessment />} />
                <Route path={PRODUCTCHECKOUT_ROUTE} element={<ProductCheckout />} />
                <Route path={INVENTORY_ROUTE} element={<Inventory />} />
                <Route path={INVENTORYBYSCANNER_ROUTE} element={<InventoryByScanner />} />
                <Route path={LISTOFSET_ROUTE} element={<ListOfSet />} />
                <Route path={COMPILATION_ROUTE} element={<Compilation />} />
                <Route path={DISASSEMBLY_ROUTE} element={<Disassembly/>} />
                <Route path={FRAGMENTATION_ROUTE} element={<Fragmentation />} />
                <Route path={EXPIREDOBSPRODUCTS_ROUTE} element={<ExpiredObsProducts/>} />
                <Route path={MINLIMITPRODUCTS_ROUTE} element={<MinLimitProducts />} />
                <Route path={REQUIREMENTS_ROUTE} element={<Requirements />} />
                <Route path={DEFACTURA_ROUTE} element={<Defectura />} />
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
    </Suspense>

  );
}

export default App;
