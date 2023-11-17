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

import { LOGIN_ROUTE,
  PRIVACY_POLICY_ROUTE,
  REGISTER_ROUTE,
  LINKPAGE_ROUTE,
  UNAUTHORIZED_ROUTE,
  DASHBOARD_ROUTE,
  USERS_ROUTE,
  ADMIN_ROUTE,
  EDITOR_ROUTE, 
  LOUNGE_ROUTE} from "./utils/consts";

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
                  
                  <Route path="admin/useradd" element={<UserAdd />} />
                  <Route path={USERS_ROUTE} element={<Users />} />
                  <Route path={ADMIN_ROUTE} element={<Admin />} />
                 
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
