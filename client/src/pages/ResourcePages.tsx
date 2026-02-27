import { useEffect, useState } from 'react';
import { request } from '../api/http';
import { ErrorBanner } from '../components/ErrorBanner';
import { PageShell } from '../components/PageShell';
import { useAuth } from '../context/AuthContext';

function GenericListPage({ title, path, protectedCall = false }: { title: string; path: string; protectedCall?: boolean }) {
  const { accessToken } = useAuth();
  const [data, setData] = useState<string>('Loading...');
  const [error, setError] = useState('');

  useEffect(() => {
    request(path, {}, protectedCall ? accessToken : null)
      .then((res) => setData(JSON.stringify(res, null, 2)))
      .catch((err) => setError((err as Error).message));
  }, [path, accessToken, protectedCall]);

  return (
    <PageShell title={title}>
      <ErrorBanner message={error} />
      <pre>{data}</pre>
    </PageShell>
  );
}

export const ProductsPage = () => <GenericListPage title="Products" path="/products" />;
export const CategoriesPage = () => <GenericListPage title="Categories" path="/categories" />;
export const CartPage = () => <GenericListPage title="Cart" path="/cart" protectedCall />;
export const OrdersPage = () => <GenericListPage title="My Orders" path="/orders/my-orders" protectedCall />;
export const ReviewsPage = () => <GenericListPage title="Reviews (example endpoint)" path="/reviews/product/placeholder" />;
export const CouponsPage = () => <GenericListPage title="Coupons Apply" path="/coupons/apply" />;
export const AddressesPage = () => <GenericListPage title="Addresses" path="/users/address" protectedCall />;
export const NotificationsPage = () => <GenericListPage title="User Notifications" path="/notifications/getusernotification" protectedCall />;
export const AdminPage = () => <GenericListPage title="Admin Dashboard" path="/admin/dashboard" protectedCall />;

export function NotFoundPage() {
  return <PageShell title="404">Page not found.</PageShell>;
}
