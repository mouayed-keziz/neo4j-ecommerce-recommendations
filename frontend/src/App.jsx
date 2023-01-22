import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { HomePage, SettingsPage, LoginPage, ProductPage, CartPage, PageNotFound, SearchPage, AdminPage } from "./pages/_index";
import { NavBar, Footer, ProfileInfoSettings, ShippingInfoSettings, PasswordInfoSettings, ArchiveAndReport, ContactAndSupport, InfosAndCharts, ManageAccounts, ManageProducts, ManageOrders, ProductDetailsAdmin } from "./components/_index";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { Button, Center, Group, Text } from "@mantine/core";

function App() {
  // this array contains all the routes that should not have the navbar and footer
  const urls = ["/settings", "/login", "/admin"];

  const ConditionalNavBar = () => {
    const location = useLocation().pathname;
    return urls.some((url) => location.startsWith(url)) ? null : <NavBar />;
  }
  const ConditionalFooter = () => {
    const location = useLocation().pathname;
    return urls.some((url) => location.startsWith(url)) ? null : <Footer />;
  }

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => window.scrollTo(0, 0), [pathname]);
    return null;
  }

  const { currentUser, dispatch } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return (currentUser ? children : <Navigate to={"/authentication"} />);
  }

  const RequireNoAuth = ({ children }) => {
    return (currentUser ? <Navigate to={"/"} /> : children);
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <ConditionalNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="authentication" element={<RequireNoAuth><LoginPage /></RequireNoAuth>} />
          <Route path="cart" element={<RequireAuth><CartPage /></RequireAuth>} />
          <Route path="search" element={<SearchPage />} />
          <Route path="settings" element={<RequireAuth><SettingsPage /></RequireAuth>} >
            <Route path="change-profile-info" element={<ProfileInfoSettings />} />
            <Route path="change-shipping-info" element={<ShippingInfoSettings />} />
            <Route path="change-password" element={<PasswordInfoSettings />} />
          </Route>
          <Route path="admin" element={<AdminPage />} >
            <Route path='information-and-chart' element={<InfosAndCharts />} />
            <Route path='manage-orders' element={<ManageOrders />} />
            <Route path='manage-products' element={<Outlet />} >
              <Route path='' element={<ManageProducts />} />
              <Route path='product' element={<ProductDetailsAdmin />} />
            </Route>
            <Route path='manage-accounts' element={<ManageAccounts />} />
            <Route path='contact-and-support' element={<ContactAndSupport />} />
            <Route path='archive-and-report' element={<ArchiveAndReport />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ConditionalFooter />
      </Router>
    </>
  );
}

export default App;


