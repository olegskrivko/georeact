import { Suspense, lazy, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// Adjust the path as needed
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { SnackbarProvider } from 'notistack';

import './App.css';
import SensorDemo from './SensorDemo';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PosterScanPage from './pages/PosterScanPage';
import PrivateRoute from './pages/auth/components/PrivateRoute';
import AccountDeletedPage from './pages/auth/views/AccountDeletedPage';
import ForgotPasswordPage from './pages/auth/views/ForgotPasswordPage';
import LoginPage from './pages/auth/views/LoginPage';
import LogoutPage from './pages/auth/views/LogoutPage';
import RegisterPage from './pages/auth/views/RegisterPage';
import ResetPasswordPage from './pages/auth/views/ResetPasswordPage';
import CookieConsent from './pages/common/components/CookieConsent';
import AttributionPage from './pages/common/views/AttributionPage';
// PAGES
// import Home from './pages/common/views/Home';
// import AboutPage from './pages/common/views/AboutPage';
// import Contact from './pages/common/views/Contact';
// import FrequentlyAskedQuestions from './pages/common/views/FrequentlyAskedQuestions';
// import PageNotFound from './pages/common/views/PageNotFound';
// import PetQuiz from './pages/common/views/PetQuiz';
// import PetTraining from './pages/common/views/PetTraining';
// import PolicyPage from './pages/common/views/PolicyPage';
// import Support from './pages/common/views/Support';
// import GuideDetailsPage from './pages/guides/views/GuideDetailsPage';
// import GuidesPage from './pages/guides/views/GuidesPage';
// import FullLayout from './pages/layout/FullLayout';
// import Layout from './pages/layout/Layout';
import CancelPage from './pages/payment/views/CancelPage';
import CheckoutPage from './pages/payment/views/CheckoutPage';
import Pricing from './pages/payment/views/Pricing';
import SuccessPage from './pages/payment/views/SuccessPage';
import CreatePet from './pages/pets/views/CreatePet';
import EditPetPage from './pages/pets/views/EditPetPage';
import PetAddStepper from './pages/pets/views/PetAddStepper';
import PetDetailsPage from './pages/pets/views/PetDetailsPage';
import PetsListPage from './pages/pets/views/PetsPage';
import Poster from './pages/pets/views/Poster';
import BookmarksIndexPage from './pages/profile/views/BookmarksIndexPage';
import Profile from './pages/profile/views/Profile';
import UserPetBookmarks from './pages/profile/views/UserPetBookmarks';
import UserPets from './pages/profile/views/UserPets';
import UserPosters from './pages/profile/views/UserPosters';
import UserServiceBookmarks from './pages/profile/views/UserServiceBookmarks';
import UserServices from './pages/profile/views/UserServices';
import UserSettings from './pages/profile/views/UserSettings';
import AddServicePage from './pages/services/views/AddServicePage';
import ServiceDetailsPage from './pages/services/views/ServiceDetailsPage';
import ServicesPage from './pages/services/views/ServicesPage';
import ShelterDetailsPage from './pages/shelters/views/ShelterDetailsPage';
import SheltersPage from './pages/shelters/views/SheltersPage';
import Loader from './shared/components/Loader';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/common/views/AboutPage'));
const Contact = lazy(() => import('./pages/common/views/Contact'));
const FrequentlyAskedQuestions = lazy(() => import('./pages/common/views/FrequentlyAskedQuestions'));
const PageNotFound = lazy(() => import('./pages/common/views/PageNotFound'));
const PetQuiz = lazy(() => import('./pages/assistant/views/PetQuiz'));
const PetTraining = lazy(() => import('./pages/common/views/PetTraining'));
const PolicyPage = lazy(() => import('./pages/common/views/PolicyPage'));
const Support = lazy(() => import('./pages/common/views/Support'));
const GuideDetailsPage = lazy(() => import('./pages/guides/views/GuideDetailsPage'));
const GuidesPage = lazy(() => import('./pages/guides/views/GuidesPage'));
const FullLayout = lazy(() => import('./pages/layout/FullLayout'));
const Layout = lazy(() => import('./pages/layout/Layout'));

const stripePromise = loadStripe(
  'pk_test_51MsAlCBnYVUZPzgiEPtA6hevdWCEOymSzerTmiA2mWpkutsMBMyo8aAuryBXQGXt7rqAk7pgkWCwCmPQddSCXoHQ00gJEKTAS3',
);

function App() {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  const handleAcceptCookies = () => {
    // Set state to true when the user accepts the cookies
    setHasAcceptedCookies(true);
    console.log('User accepted cookies', hasAcceptedCookies);
    // You can also perform other actions here, such as updating a global state or sending the acceptance to an analytics service
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Elements stripe={stripePromise}>
            <Router>
              <AuthProvider>
                <LocationProvider>
                  <LanguageProvider>
                    <Suspense fallback={<Loader />}>
                      <Routes>
                        {/* Routes with FullLayout (no container) */}
                        <Route path="/" element={<FullLayout />}>
                          <Route index element={<Home />} />
                        </Route>

                        {/* Routes with main Layout (container) */}
                        <Route element={<Layout />}>
                          <Route path="about" element={<AboutPage />} />
                          <Route path="contact" element={<Contact />} />
                          <Route path="support" element={<Support />} />
                          <Route path="sensor" element={<SensorDemo />} />

                          <Route path="credits" element={<AttributionPage />} />
                          <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
                          <Route path="virtual-pet-training-classes" element={<PetTraining />} />
                          <Route path="policies" element={<PolicyPage />} />
                          <Route path="pet-matching-quiz" element={<PetQuiz />} />
                          <Route path="shelters" element={<SheltersPage />} />
                          <Route path="shelters/:id" element={<ShelterDetailsPage />} />
                          <Route path="pets" element={<PetsListPage />} />
                          <Route path="pets/:id" element={<PetDetailsPage />} />
                          <Route path="pets/:id/poster" element={<Poster />} />
                          <Route path="testpet" element={<CreatePet />} />

                          <Route path="user-profile/edit-pet/:id" element={<EditPetPage />} />
                          <Route path="services" element={<ServicesPage />} />
                          <Route path="services/:id" element={<ServiceDetailsPage />} />
                          <Route path="add-service" element={<AddServicePage />} />

                          <Route path="guides" element={<GuidesPage />} />
                          <Route path="guides/:slug" element={<GuideDetailsPage />} />
                          <Route path="pricing" element={<Pricing />} />
                          <Route path="checkout" element={<CheckoutPage />} />
                          <Route path="success" element={<SuccessPage />} />
                          <Route path="subscription-success" element={<SuccessPage />} />
                          {/* <Route path="cancel" element={<CancelPage />} /> */}
                          <Route path="subscription-cancel" element={<CancelPage />} />
                          <Route path="login" element={<LoginPage />} />
                          <Route path="register" element={<RegisterPage />} />
                          <Route path="logout" element={<LogoutPage />} />
                          <Route path="forgot-password" element={<ForgotPasswordPage />} />
                          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
                          <Route path="account-deleted" element={<AccountDeletedPage />} />
                          {/* <Route path="scan" element={<PosterScanPage />} /> */}
                          <Route path="posters/:posterId/scan" element={<PosterScanPage />} />

                          {/* Protected routes */}
                          <Route element={<PrivateRoute />}>
                            <Route path="add-pet" element={<PetAddStepper />} />
                            <Route path="user-profile" element={<Profile />} />

                            <Route path="user-profile/settings" element={<UserSettings />} />
                            <Route path="user-profile/bookmarks/pets" element={<UserPetBookmarks />} />
                            <Route path="user-profile/bookmarks/services" element={<UserServiceBookmarks />} />
                            <Route path="user-profile/bookmarks" element={<BookmarksIndexPage />} />
                            <Route path="user-profile/pets" element={<UserPets />} />
                            <Route path="user-profile/services" element={<UserServices />} />
                            <Route path="user-profile/map" element={<UserPosters />} />
                          </Route>

                          {/* CATCH-ALL FOR 404 */}
                          <Route path="*" element={<PageNotFound />} />
                        </Route>
                      </Routes>
                    </Suspense>
                    {/* COOKIE */}
                    <CookieConsent />
                  </LanguageProvider>
                </LocationProvider>
              </AuthProvider>
            </Router>
          </Elements>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
