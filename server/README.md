# Ecommerce Backend

Production-oriented backend using Express, Mongoose, JWT auth, RBAC, and MVC.

## API examples

### Register
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

### Login
```json
{
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

### Get OTP
```json
{
  "email": "john@example.com"
}
```

### Verify OTP
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### Create product
```json
{
  "name": "iPhone 16",
  "description": "Latest model",
  "price": 120000,
  "category": "<categoryId>",
  "stock": 25,
  "images": ["https://cdn/p1.png"],
  "brand": "Apple"
}
```

### Create order
```json
{
  "shippingAddress": {
    "line1": "Street 1",
    "city": "Lagos",
    "country": "NG",
    "zipCode": "100001"
  },
  "paymentMethod": "card"
}
```

## Deployment notes

- Use reverse proxy + HTTPS in production.
- Keep secrets in environment variables.
- Run migrations/seeding before first launch.
