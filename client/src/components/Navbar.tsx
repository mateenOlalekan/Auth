import { useAuth } from '../context/AuthContext';
import { navigate } from '../utils/router';

const links = [
  ['/', 'Home'],
  ['/products', 'Products'],
  ['/categories', 'Categories'],
  ['/cart', 'Cart'],
  ['/orders', 'Orders'],
  ['/reviews', 'Reviews'],
  ['/coupons', 'Coupons'],
  ['/addresses', 'Addresses'],
  ['/notifications', 'Notifications'],
  ['/admin', 'Admin'],
];

export function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <strong>eCommerce Client</strong>
      <nav>
        {links.map(([to, label]) => (
          <button key={to} onClick={() => navigate(to)} className="link-btn">{label}</button>
        ))}
      </nav>
      <div>
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
    </header>
  );
}
