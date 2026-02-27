import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useRoute } from './hooks/useRoute';
import { LoginPage, OtpPage, RegisterPage } from './pages/AuthPages';
import HomePage from './pages/HomePage';
import {
  AddressesPage,
  AdminPage,
  CartPage,
  CategoriesPage,
  CouponsPage,
  NotFoundPage,
  NotificationsPage,
  OrdersPage,
  ProductsPage,
  ReviewsPage,
} from './pages/ResourcePages';

function RouterView() {
  const path = useRoute();
  switch (path) {
    case '/':
      return <HomePage />;
    case '/login':
      return <LoginPage />;
    case '/register':
      return <RegisterPage />;
    case '/otp':
      return <OtpPage />;
    case '/products':
      return <ProductsPage />;
    case '/categories':
      return <CategoriesPage />;
    case '/cart':
      return <ProtectedRoute><CartPage /></ProtectedRoute>;
    case '/orders':
      return <ProtectedRoute><OrdersPage /></ProtectedRoute>;
    case '/reviews':
      return <ReviewsPage />;
    case '/coupons':
      return <CouponsPage />;
    case '/addresses':
      return <ProtectedRoute><AddressesPage /></ProtectedRoute>;
    case '/notifications':
      return <ProtectedRoute><NotificationsPage /></ProtectedRoute>;
    case '/admin':
      return <ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>;
    default:
      return <NotFoundPage />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main>
            <RouterView />
          </main>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;