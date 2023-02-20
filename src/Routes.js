import {
    Routes,
    Route,
} from "react-router-dom";

// Member Pages Imports 
import Login from "./Pages/MemberPages/Login";
import Profile from "./Pages/MemberPages/Profile";

//Standard Pages Import
import WebsiteWrapper from "./Components/UI/websiteWrapper";
import DashboardWrapper from "./Components/UI/DashboardMenu/DashboardWrapper";
import ConvenerWrapper from "./Components/UI/ConvenerMenu/ConvenerWrapper";
import Home from "./Pages/Standard/Home";
import Tournaments from "./Pages/Standard/Tournaments";
import Store from './Pages/Standard/Store';
import NotFound from "./Pages/NotFound";
import Toc from "./Pages/Standard/Toc";
import About from './Pages/Standard/About';
import Rules from './Pages/Standard/RulesInfo';

//Legal Pages
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import TermCondition from "./Pages/Legal/TermConditions";
import Refund from "./Pages/Legal/Refund";
import Cookies from "./Pages/Legal/Cookies";

// Convener Panel Imports 
import ConvenerOverview from "./Pages/Convener/Overview";

//Admin Panel Imports
import AdminOverview from "./Pages/Admin/Overview";
import Registrations from "./Pages/Admin/Registrations";
import AdminTournaments from './Pages/Admin/Tournaments';
import AdminToc from './Pages/Admin/Toc';
import AdminTeams from './Pages/Admin/Teams';
import Orders from './Pages/Admin/Orders';
import Products from './Pages/Admin/Products';
import Stock from "./Pages/Admin/Stock";
import Users from "./Pages/Admin/Users";
import Documents from './Pages/Admin/RulesInfo'
import Faq from "./Pages/Admin/Faq";
import Staff from "./Pages/Admin/Staff";

const Routing = (props) => {
    return <Routes>
        {/* Website Routes  */}
        <Route path='/' element={
            <WebsiteWrapper>
                <Home />
            </WebsiteWrapper>}
        />
        <Route path='/tournaments' element={
            <WebsiteWrapper>
                <Tournaments />
            </WebsiteWrapper>}
        />
        <Route path='/store' element={
            <WebsiteWrapper>
                <Store />
            </WebsiteWrapper>}
        />
        <Route path='/tournament-of-champions' element={
            <WebsiteWrapper>
                <Toc />
            </WebsiteWrapper>}
        />
        <Route path='/about-us' element={
            <WebsiteWrapper>
                <About />
            </WebsiteWrapper>}
        />
        <Route path='/rules-info' element={
            <WebsiteWrapper>
                <Rules />
            </WebsiteWrapper>}
        />
        {/* member routes  */}
        <Route path="/login" element={
            <WebsiteWrapper>
                <Login />
            </WebsiteWrapper>
        } />
        <Route path="/account" element={
            <WebsiteWrapper>
                <Profile />
            </WebsiteWrapper>
        } />
        
        {/* legal routes  */}
        <Route path="/privacy-policies" element={
            <WebsiteWrapper>
                <PrivacyPolicy />
            </WebsiteWrapper>
        } />
        <Route path="/terms-conditions" element={
            <WebsiteWrapper>
                <TermCondition />
            </WebsiteWrapper>
        } />
        <Route path="/refunds-returns" element={
            <WebsiteWrapper>
                <Refund />
            </WebsiteWrapper>
        } />
        <Route path="/cookies" element={
            <WebsiteWrapper>
                <Cookies />
            </WebsiteWrapper>
        } />

        {/* dashboard routes  */}
        <Route path="/dashboard" element={
            <DashboardWrapper>
                <AdminOverview />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/registrations" element={
            <DashboardWrapper>
                <Registrations />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/toc" element={
            <DashboardWrapper>
                <AdminToc />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/tournaments" element={
            <DashboardWrapper>
                <AdminTournaments />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/teams" element={
            <DashboardWrapper>
                <AdminTeams />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/orders" element={
            <DashboardWrapper>
                <Orders />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/products" element={
            <DashboardWrapper>
                <Products />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/stock" element={
            <DashboardWrapper>
                <Stock />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/users" element={
            <DashboardWrapper>
                <Users />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/info" element={
            <DashboardWrapper>
                <Documents />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/faq" element={
            <DashboardWrapper>
                <Faq />
            </DashboardWrapper>
        } />
        <Route path="/dashboard/staff" element={
            <DashboardWrapper>
                <Staff />
            </DashboardWrapper>
        } />

        {/* convener routes  */}
        <Route path="/conveners" element={
            <ConvenerWrapper>
                <ConvenerOverview />
            </ConvenerWrapper>
        } />

        {/* Error 404 Page  */}
        <Route path='/error/404' element={
            <WebsiteWrapper>
                <NotFound />
            </WebsiteWrapper>}
        />
    </Routes>
}
export default Routing;