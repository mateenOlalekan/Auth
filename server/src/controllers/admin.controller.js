import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (_req, res) => {
  const [users, orders, lowStockProducts] = await Promise.all([
    User.countDocuments({ isDeleted: false }),
    Order.find(),
    Product.find({ stock: { $lt: 10 }, isDeleted: false }).limit(10),
  ]);

  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.totalPrice : 0), 0);
  res.json({
    success: true,
    totalUsers: users,
    totalOrders: orders.length,
    totalSales,
    lowStockProducts,
    salesAnalytics: orders.map((o) => ({ date: o.createdAt, total: o.totalPrice })),
  });
});
