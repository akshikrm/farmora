# Farmora API Documentation

## Base URL
```
http://localhost:<PORT>
```

## Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Packages](#packages)
4. [Subscriptions](#subscriptions)
5. [Seasons](#seasons)
6. [Farms](#farms)
7. [Items](#items)
8. [Vendors](#vendors)
9. [Batches](#batches)

---

## Authentication

### 1. User Signup
**Endpoint:** `POST /api/auth/signup`

**Description:** Create a new user account

**Authentication:** None

**Request Body:**
```json
{
  "name": "string (min: 3, max: 100, required)",
  "username": "string (min: 3, max: 100, required)",
  "user_type": "any (required)",
  "status": "number (integer, required)",
  "parent_id": "number (integer, required)",
  "package_id": "number (integer, optional)"
}
```

**Example Request:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "user_type": "farmer",
  "status": 1,
  "parent_id": 0,
  "package_id": 1
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "user created",
  "data": "JWT_TOKEN_HERE"
}
```

**Error Response (400):**
```json
{
  "status": false,
  "errors": ["Username already exists. Please choose a different username."]
}
```

---

### 2. User Login
**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate a user and receive a JWT token

**Authentication:** None

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Example Request:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "user authenticated",
  "data": {
    "token": "JWT_TOKEN_HERE",
    "master_id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "user_type": "farmer",
    "parent_id": 0
  }
}
```

---

## Users

### 3. Get All Users
**Endpoint:** `GET /api/auth/users`

**Description:** Retrieve a paginated list of all users

**Authentication:** None

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `status` (number, optional) - Filter by user status
- `parent_id` (number, optional) - Filter by parent ID
- `name` (string, optional) - Filter by user name

**Example Request:**
```
GET /api/auth/users?page=1&limit=20&status=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "users list",
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

---

## Packages

### 4. Create Package
**Endpoint:** `POST /api/packages`

**Description:** Create a new subscription package (Admin only)

**Authentication:** Required (Admin)

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "name": "string (min: 3, max: 100, required)",
  "description": "string (optional)",
  "price": "number (positive, required)",
  "duration": "number (positive integer, required)",
  "status": "boolean (required)"
}
```

**Example Request:**
```json
{
  "name": "Basic Plan",
  "description": "Basic subscription package for small farms",
  "price": 99.99,
  "duration": 30,
  "status": true
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "package created",
  "data": {
    "id": 1,
    "name": "Basic Plan",
    "description": "Basic subscription package for small farms",
    "price": 99.99,
    "duration": 30,
    "status": true
  }
}
```

---

### 5. Get All Packages
**Endpoint:** `GET /api/packages`

**Description:** Retrieve a paginated list of all packages

**Authentication:** None

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `status` (number, optional) - Filter by package status
- `name` (string, optional) - Filter by package name

**Example Request:**
```
GET /api/packages?page=1&limit=10&status=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "packages list",
  "data": {
    "packages": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

---

### 6. Get Package by ID
**Endpoint:** `GET /api/packages/:package_id`

**Description:** Retrieve details of a specific package

**Authentication:** None

**URL Parameters:**
- `package_id` (number, required) - Package ID

**Example Request:**
```
GET /api/packages/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "package details",
  "data": {
    "id": 1,
    "name": "Basic Plan",
    "description": "Basic subscription package for small farms",
    "price": 99.99,
    "duration": 30,
    "status": true
  }
}
```

---

### 7. Update Package
**Endpoint:** `PUT /api/packages/:package_id`

**Description:** Update an existing package (Admin only)

**Authentication:** Required (Admin)

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `package_id` (number, required) - Package ID

**Request Body:**
```json
{
  "name": "string (min: 3, max: 100, required)",
  "description": "string (optional)",
  "price": "number (positive, required)",
  "duration": "number (positive integer, required)",
  "status": "boolean (required)"
}
```

**Example Request:**
```json
{
  "name": "Premium Plan",
  "description": "Updated description",
  "price": 149.99,
  "duration": 30,
  "status": true
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "package updated",
  "data": null
}
```

---

### 8. Delete Package
**Endpoint:** `DELETE /api/packages/:package_id`

**Description:** Delete a package

**Authentication:** None

**URL Parameters:**
- `package_id` (number, required) - Package ID

**Example Request:**
```
DELETE /api/packages/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "package deleted",
  "data": null
}
```

---

## Subscriptions

### 9. Create Subscription
**Endpoint:** `POST /api/subscriptions/subscribe`

**Description:** Subscribe to a package

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "package_id": "number (required)"
}
```

**Example Request:**
```json
{
  "package_id": 1
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "Subscription created",
  "data": {
    "id": 1,
    "user_id": 1,
    "package_id": 1,
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

---

### 10. Get All Subscriptions
**Endpoint:** `GET /api/subscriptions`

**Description:** Retrieve all subscriptions

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Example Request:**
```
GET /api/subscriptions
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Subscription List",
  "data": [...]
}
```

---

## Seasons

### 11. Create Season
**Endpoint:** `POST /api/config/seasons`

**Description:** Create a new season

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "from_date": "date (ISO format, required)",
  "to_date": "date (ISO format, required, must be greater than from_date)"
}
```

**Example Request:**
```json
{
  "master_id": 1,
  "name": "Spring 2024",
  "from_date": "2024-03-01",
  "to_date": "2024-05-31"
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "Season created successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Spring 2024",
    "from_date": "2024-03-01",
    "to_date": "2024-05-31"
  }
}
```

---

### 12. Get All Seasons
**Endpoint:** `GET /api/config/seasons`

**Description:** Retrieve a paginated list of all seasons

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `master_id` (number, optional) - Filter by master ID
- `status` (string, optional) - Filter by status
- `name` (string, optional) - Filter by name

**Example Request:**
```
GET /api/config/seasons?page=1&limit=10&master_id=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Seasons fetched successfully",
  "data": {
    "seasons": [...],
    "pagination": {...}
  }
}
```

---

### 13. Get Season by ID
**Endpoint:** `GET /api/config/seasons/:season_id`

**Description:** Retrieve details of a specific season

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `season_id` (number, required) - Season ID

**Example Request:**
```
GET /api/config/seasons/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Season details fetched successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Spring 2024",
    "from_date": "2024-03-01",
    "to_date": "2024-05-31"
  }
}
```

---

### 14. Update Season
**Endpoint:** `PUT /api/config/seasons/:season_id`

**Description:** Update an existing season

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `season_id` (number, required) - Season ID

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "from_date": "date (ISO format, required)",
  "to_date": "date (ISO format, required, must be greater than from_date)"
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Season updated successfully",
  "data": null
}
```

---

### 15. Delete Season
**Endpoint:** `DELETE /api/config/seasons/:season_id`

**Description:** Delete a season

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `season_id` (number, required) - Season ID

**Example Request:**
```
DELETE /api/config/seasons/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Season deleted successfully",
  "data": null
}
```

---

## Farms

### 16. Create Farm
**Endpoint:** `POST /api/config/farms`

**Description:** Create a new farm

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "place": "string (optional)",
  "capacity": "string (optional)",
  "own": "boolean (required)",
  "status": "number (optional)"
}
```

**Example Request:**
```json
{
  "master_id": 1,
  "name": "Green Valley Farm",
  "place": "California",
  "capacity": "100 acres",
  "own": true,
  "status": 1
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "Farm created successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Green Valley Farm",
    "place": "California",
    "capacity": "100 acres",
    "own": true,
    "status": 1
  }
}
```

---

### 17. Get All Farms
**Endpoint:** `GET /api/config/farms`

**Description:** Retrieve a paginated list of all farms

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `master_id` (number, optional) - Filter by master ID
- `status` (string, optional) - Filter by status
- `name` (string, optional) - Filter by name

**Example Request:**
```
GET /api/config/farms?page=1&limit=10&master_id=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Farms fetched successfully",
  "data": {
    "farms": [...],
    "pagination": {...}
  }
}
```

---

### 18. Get Farm by ID
**Endpoint:** `GET /api/config/farms/:farm_id`

**Description:** Retrieve details of a specific farm

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `farm_id` (number, required) - Farm ID

**Example Request:**
```
GET /api/config/farms/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Farm details fetched successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Green Valley Farm",
    "place": "California",
    "capacity": "100 acres",
    "own": true,
    "status": 1
  }
}
```

---

### 19. Update Farm
**Endpoint:** `PUT /api/config/farms/:farm_id`

**Description:** Update an existing farm

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `farm_id` (number, required) - Farm ID

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "place": "string (optional)",
  "capacity": "string (optional)",
  "own": "boolean (required)",
  "status": "number (optional)"
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Farm updated successfully",
  "data": null
}
```

---

### 20. Delete Farm
**Endpoint:** `DELETE /api/config/farms/:farm_id`

**Description:** Delete a farm

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `farm_id` (number, required) - Farm ID

**Example Request:**
```
DELETE /api/config/farms/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Farm deleted successfully",
  "data": null
}
```

---

## Items

### 21. Create Item
**Endpoint:** `POST /api/config/items`

**Description:** Create a new configuration item

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "price": "number (required)",
  "status": "number (optional)"
}
```

**Example Request:**
```json
{
  "master_id": 1,
  "name": "Fertilizer",
  "price": 25.50,
  "status": 1
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "Configuration item created successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Fertilizer",
    "price": 25.50,
    "status": 1
  }
}
```

---

### 22. Get All Items
**Endpoint:** `GET /api/config/items`

**Description:** Retrieve a paginated list of all configuration items

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `master_id` (number, optional) - Filter by master ID
- `status` (string, optional) - Filter by status
- `name` (string, optional) - Filter by name

**Example Request:**
```
GET /api/config/items?page=1&limit=10&master_id=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Configuration items fetched successfully",
  "data": {
    "items": [...],
    "pagination": {...}
  }
}
```

---

### 23. Get Item by ID
**Endpoint:** `GET /api/config/items/:item_id`

**Description:** Retrieve details of a specific configuration item

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `item_id` (number, required) - Item ID

**Example Request:**
```
GET /api/config/items/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Configuration item details fetched successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Fertilizer",
    "price": 25.50,
    "status": 1
  }
}
```

---

### 24. Update Item
**Endpoint:** `PUT /api/config/items/:item_id`

**Description:** Update an existing configuration item

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `item_id` (number, required) - Item ID

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "price": "number (required)",
  "status": "number (optional)"
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Configuration item updated successfully",
  "data": null
}
```

---

### 25. Delete Item
**Endpoint:** `DELETE /api/config/items/:item_id`

**Description:** Delete a configuration item

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `item_id` (number, required) - Item ID

**Example Request:**
```
DELETE /api/config/items/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Configuration item deleted successfully",
  "data": null
}
```

---

## Vendors

### 26. Create Vendor
**Endpoint:** `POST /api/config/vendors`

**Description:** Create a new vendor

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "phone": "string (optional)",
  "email": "string (min: 3, max: 100, optional)",
  "address": "string (optional)",
  "opening_balance": "any (optional)"
}
```

**Example Request:**
```json
{
  "master_id": 1,
  "name": "Acme Supply Co.",
  "phone": "+1234567890",
  "email": "contact@acmesupply.com",
  "address": "123 Main St, City, State",
  "opening_balance": 1000.00
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "Vendor created successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Acme Supply Co.",
    "phone": "+1234567890",
    "email": "contact@acmesupply.com",
    "address": "123 Main St, City, State",
    "opening_balance": 1000.00
  }
}
```

---

### 27. Get All Vendors
**Endpoint:** `GET /api/config/vendors`

**Description:** Retrieve a paginated list of all vendors

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `master_id` (number, optional) - Filter by master ID
- `status` (string, optional) - Filter by status
- `name` (string, optional) - Filter by name

**Example Request:**
```
GET /api/config/vendors?page=1&limit=10&master_id=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Vendors fetched successfully",
  "data": {
    "vendors": [...],
    "pagination": {...}
  }
}
```

---

### 28. Get Vendor by ID
**Endpoint:** `GET /api/config/vendors/:vendor_id`

**Description:** Retrieve details of a specific vendor

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `vendor_id` (number, required) - Vendor ID

**Example Request:**
```
GET /api/config/vendors/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Vendor details fetched successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "name": "Acme Supply Co.",
    "phone": "+1234567890",
    "email": "contact@acmesupply.com",
    "address": "123 Main St, City, State",
    "opening_balance": 1000.00
  }
}
```

---

### 29. Update Vendor
**Endpoint:** `PUT /api/config/vendors/:vendor_id`

**Description:** Update an existing vendor

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `vendor_id` (number, required) - Vendor ID

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "phone": "string (optional)",
  "email": "string (min: 3, max: 100, optional)",
  "address": "string (optional)",
  "opening_balance": "any (optional)"
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Vendor updated successfully",
  "data": null
}
```

---

### 30. Delete Vendor
**Endpoint:** `DELETE /api/config/vendors/:vendor_id`

**Description:** Delete a vendor

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `vendor_id` (number, required) - Vendor ID

**Example Request:**
```
DELETE /api/config/vendors/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Vendor deleted successfully",
  "data": null
}
```

---

## Batches

### 31. Create Batch
**Endpoint:** `POST /api/config/batches`

**Description:** Create a new batch

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "farm_id": "number (integer, required)",
  "season_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "status": "number (optional)"
}
```

**Example Request:**
```json
{
  "master_id": 1,
  "farm_id": 1,
  "season_id": 1,
  "name": "Batch A-2024",
  "status": 1
}
```

**Success Response (201):**
```json
{
  "status": true,
  "message": "Batch created successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "farm_id": 1,
    "season_id": 1,
    "name": "Batch A-2024",
    "status": 1
  }
}
```

**Note:** There are known issues with batch CRUD operations that need to be fixed.

---

### 32. Get All Batches
**Endpoint:** `GET /api/config/batches`

**Description:** Retrieve a paginated list of all batches

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (number, optional, default: 1) - Page number
- `limit` (number, optional, default: 10) - Items per page
- `season_id` (string, optional) - Filter by season ID
- `farm_id` (string, optional) - Filter by farm ID
- `status` (string, optional) - Filter by status

**Example Request:**
```
GET /api/config/batches?page=1&limit=10&season_id=1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Batches fetched successfully",
  "data": {
    "batches": [...],
    "pagination": {...}
  }
}
```

---

### 33. Get Batch by ID
**Endpoint:** `GET /api/config/batches/:batch_id`

**Description:** Retrieve details of a specific batch

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `batch_id` (number, required) - Batch ID

**Example Request:**
```
GET /api/config/batches/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Batch details fetched successfully",
  "data": {
    "id": 1,
    "master_id": 1,
    "farm_id": 1,
    "season_id": 1,
    "name": "Batch A-2024",
    "status": 1
  }
}
```

---

### 34. Update Batch
**Endpoint:** `PUT /api/config/batches/:batch_id`

**Description:** Update an existing batch

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `batch_id` (number, required) - Batch ID

**Request Body:**
```json
{
  "master_id": "number (integer, required)",
  "farm_id": "number (integer, required)",
  "season_id": "number (integer, required)",
  "name": "string (min: 3, max: 100, required)",
  "status": "number (optional)"
}
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Batch updated successfully",
  "data": null
}
```

---

### 35. Delete Batch
**Endpoint:** `DELETE /api/config/batches/:batch_id`

**Description:** Delete a batch

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**URL Parameters:**
- `batch_id` (number, required) - Batch ID

**Example Request:**
```
DELETE /api/config/batches/1
```

**Success Response (200):**
```json
{
  "status": true,
  "message": "Batch deleted successfully",
  "data": null
}
```

---

## Common Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "status": true,
  "message": "Description of the operation",
  "data": <response_data>
}
```

**Error Response:**
```json
{
  "status": false,
  "message": "Error description",
  "errors": ["Array of error messages"]
}
```

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters or validation errors
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Note:** While some delete operations in the controllers specify `statusCode: 204`, they all return JSON response bodies and therefore use status code 200.

---

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To obtain a token:
1. Use the `/api/auth/signup` endpoint to create a new account
2. Use the `/api/auth/login` endpoint to authenticate and receive a token
3. Include the token in subsequent requests

---

## Pagination

Endpoints that return lists support pagination through query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Paginated responses include a `pagination` object:
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## Filtering

Many list endpoints support filtering through query parameters. Common filters include:

- `status` - Filter by status
- `name` - Filter by name (partial match)
- `master_id` - Filter by master/owner ID
- `parent_id` - Filter by parent ID (users)
- `season_id` - Filter by season ID (batches)
- `farm_id` - Filter by farm ID (batches)

---

## Notes

1. **Admin Endpoints:** Some package management endpoints (create, update) require admin privileges, but the delete package endpoint is currently unprotected
2. **Batch Operations:** Currently have known issues that need to be addressed
3. **Date Format:** All dates should be in ISO 8601 format (YYYY-MM-DD)
4. **Validation:** Request body validation is enforced using Joi schemas
5. **Delete Operations:** All delete endpoints return status code 200 with a JSON response body
