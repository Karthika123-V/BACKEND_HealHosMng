# Healthcare Application - Backend API Documentation

## Overview
This is a Node.js + Express + MongoDB backend for a MERN healthcare application with public frontend pages and admin portal CRUD operations.

**Server URL**: `http://localhost:5000`

---

## Models

### 1. Department
- `name`: String (required)
- `description`: String (required)
- `createdAt`: Date (default now)

### 2. Doctor
- `name`: String (required)
- `specialty`: String (required)
- `experience`: String (required)
- `department`: String (required)
- `createdAt`: Date (default now)

### 3. Service
- `title`: String (required)
- `description`: String (required)
- `department`: String (required)
- `createdAt`: Date (default now)

### 4. User
- `fullname`: String (required)
- `email`: String (required, unique)
- `phone`: String (required)
- `password`: String (required, hashed)
- `role`: String (default: "Patient")
- `createdAt`: Date (default now)

### 5. Appointment
- `fullname`: String (required)
- `email`: String (required)
- `phone`: String (required)
- `prefer_date`: String (required)
- `prefer_time`: String (required)
- `dept`: String (required)
- `prefer_doctor`: String (required)
- `notes`: String
- `status`: String (default: "Pending")
- `createdAt`: Date (default now)

### 6. Contact
- `fullname`: String (required)
- `email`: String (required)
- `phone`: String (required)
- `message`: String (required)
- `createdAt`: Date (default now)

---

## Response Format

### Success Response
```json
{
  "message": "Action successful",
  "data": <result>
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

---

## PUBLIC API ENDPOINTS

### User Management

#### 1. User Signup
**POST** `/api/user/signup`

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "role": "Patient"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "id": "64abc123...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "Patient"
  }
}
```

#### 2. User Login
**POST** `/api/user/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "data": {
    "id": "64abc123...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "Patient"
  }
}
```

### Contact Form

#### 3. Submit Contact Form
**POST** `/api/contact/submit`

**Request Body:**
```json
{
  "fullname": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "message": "I need more information about your services"
}
```

**Success Response (201):**
```json
{
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "64abc123...",
    "fullname": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543210",
    "message": "I need more information about your services",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Appointments

#### 4. Book Appointment
**POST** `/api/appointment/book`

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "prefer_date": "2024-01-20",
  "prefer_time": "10:00 AM",
  "dept": "Cardiology",
  "prefer_doctor": "Dr. Smith",
  "notes": "Regular checkup"
}
```

**Success Response (201):**
```json
{
  "message": "Appointment booked successfully",
  "data": {
    "_id": "64abc123...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "prefer_date": "2024-01-20",
    "prefer_time": "10:00 AM",
    "dept": "Cardiology",
    "prefer_doctor": "Dr. Smith",
    "notes": "Regular checkup",
    "status": "Pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## ADMIN API ENDPOINTS

### Department Management

#### 1. Get All Departments
**GET** `/api/admin/departments`

**Success Response (200):**
```json
{
  "message": "Departments fetched successfully",
  "data": [
    {
      "_id": "64abc123...",
      "name": "Cardiology",
      "description": "Heart and cardiovascular care",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Create Department
**POST** `/api/admin/departments`

**Request Body:**
```json
{
  "name": "Cardiology",
  "description": "Heart and cardiovascular care"
}
```

**Success Response (201):**
```json
{
  "message": "Department created successfully",
  "data": {
    "_id": "64abc123...",
    "name": "Cardiology",
    "description": "Heart and cardiovascular care",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Update Department
**PUT** `/api/admin/departments/:id`

**Request Body:**
```json
{
  "name": "Cardiology - Updated",
  "description": "Heart and cardiovascular care - Updated"
}
```

**Success Response (200):**
```json
{
  "message": "Department updated successfully",
  "data": {
    "_id": "64abc123...",
    "name": "Cardiology - Updated",
    "description": "Heart and cardiovascular care - Updated",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Delete Department
**DELETE** `/api/admin/departments/:id`

**Success Response (200):**
```json
{
  "message": "Department deleted successfully"
}
```

---

### Doctor Management

#### 1. Get All Doctors
**GET** `/api/admin/doctors`

**Success Response (200):**
```json
{
  "message": "Doctors fetched successfully",
  "data": [
    {
      "_id": "64abc123...",
      "name": "Dr. John Smith",
      "specialty": "Cardiologist",
      "experience": "10 years",
      "department": "Cardiology",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Create Doctor
**POST** `/api/admin/doctors`

**Request Body:**
```json
{
  "name": "Dr. John Smith",
  "specialty": "Cardiologist",
  "experience": "10 years",
  "department": "Cardiology"
}
```

**Success Response (201):**
```json
{
  "message": "Doctor added successfully",
  "data": {
    "_id": "64abc123...",
    "name": "Dr. John Smith",
    "specialty": "Cardiologist",
    "experience": "10 years",
    "department": "Cardiology",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Update Doctor
**PUT** `/api/admin/doctors/:id`

**Request Body:**
```json
{
  "name": "Dr. John Smith",
  "specialty": "Senior Cardiologist",
  "experience": "12 years",
  "department": "Cardiology"
}
```

**Success Response (200):**
```json
{
  "message": "Doctor updated successfully",
  "data": {
    "_id": "64abc123...",
    "name": "Dr. John Smith",
    "specialty": "Senior Cardiologist",
    "experience": "12 years",
    "department": "Cardiology",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Delete Doctor
**DELETE** `/api/admin/doctors/:id`

**Success Response (200):**
```json
{
  "message": "Doctor deleted successfully"
}
```

---

### Service Management

#### 1. Get All Services
**GET** `/api/admin/services`

**Success Response (200):**
```json
{
  "message": "Services fetched successfully",
  "data": [
    {
      "_id": "64abc123...",
      "title": "ECG Test",
      "description": "Electrocardiogram test for heart monitoring",
      "department": "Cardiology",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Create Service
**POST** `/api/admin/services`

**Request Body:**
```json
{
  "title": "ECG Test",
  "description": "Electrocardiogram test for heart monitoring",
  "department": "Cardiology"
}
```

**Success Response (201):**
```json
{
  "message": "Service created successfully",
  "data": {
    "_id": "64abc123...",
    "title": "ECG Test",
    "description": "Electrocardiogram test for heart monitoring",
    "department": "Cardiology",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Update Service
**PUT** `/api/admin/services/:id`

**Request Body:**
```json
{
  "title": "ECG Test - Updated",
  "description": "Electrocardiogram test for heart monitoring - Updated",
  "department": "Cardiology"
}
```

**Success Response (200):**
```json
{
  "message": "Service updated successfully",
  "data": {
    "_id": "64abc123...",
    "title": "ECG Test - Updated",
    "description": "Electrocardiogram test for heart monitoring - Updated",
    "department": "Cardiology",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Delete Service
**DELETE** `/api/admin/services/:id`

**Success Response (200):**
```json
{
  "message": "Service deleted successfully"
}
```

---

### User Management (Admin)

#### 1. Get All Users
**GET** `/api/admin/users`

**Success Response (200):**
```json
{
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "64abc123...",
      "fullname": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "Patient",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```
*Note: Password is excluded from response*

#### 2. Create User
**POST** `/api/admin/users`

**Request Body:**
```json
{
  "fullname": "Jane Admin",
  "email": "jane@example.com",
  "phone": "9876543210",
  "password": "securepass123",
  "role": "Admin"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "data": {
    "id": "64abc123...",
    "fullname": "Jane Admin",
    "email": "jane@example.com",
    "phone": "9876543210",
    "role": "Admin"
  }
}
```

#### 3. Update User
**PUT** `/api/admin/users/:id`

**Request Body:**
```json
{
  "fullname": "Jane Admin Updated",
  "email": "jane@example.com",
  "phone": "9876543210",
  "password": "newpassword123",
  "role": "Admin"
}
```
*Note: Password is optional. If provided, it will be hashed.*

**Success Response (200):**
```json
{
  "message": "User updated successfully",
  "data": {
    "_id": "64abc123...",
    "fullname": "Jane Admin Updated",
    "email": "jane@example.com",
    "phone": "9876543210",
    "role": "Admin",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Delete User
**DELETE** `/api/admin/users/:id`

**Success Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

### Appointment Management (Admin)

#### 1. Get All Appointments
**GET** `/api/admin/appointments`

**Success Response (200):**
```json
{
  "message": "Appointments fetched successfully",
  "data": [
    {
      "_id": "64abc123...",
      "fullname": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "prefer_date": "2024-01-20",
      "prefer_time": "10:00 AM",
      "dept": "Cardiology",
      "prefer_doctor": "Dr. Smith",
      "notes": "Regular checkup",
      "status": "Pending",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```
*Note: Results are sorted by createdAt (newest first)*

#### 2. Update Appointment
**PUT** `/api/admin/appointments/:id`

**Request Body:**
```json
{
  "status": "Approved"
}
```
*Note: Can update any field, commonly used for status updates*

**Success Response (200):**
```json
{
  "message": "Appointment updated successfully",
  "data": {
    "_id": "64abc123...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "prefer_date": "2024-01-20",
    "prefer_time": "10:00 AM",
    "dept": "Cardiology",
    "prefer_doctor": "Dr. Smith",
    "notes": "Regular checkup",
    "status": "Approved",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Delete Appointment
**DELETE** `/api/admin/appointments/:id`

**Success Response (200):**
```json
{
  "message": "Appointment deleted successfully"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "message": "Email already registered"
}
```

### 404 - Not Found
```json
{
  "message": "User not found"
}
```

### 401 - Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 500 - Server Error
```json
{
  "message": "Error message details"
}
```

---

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
MONGO_URL=your_mongodb_connection_string
```

3. Start the server:
```bash
node server.js
```

Server will run on `http://localhost:5000`

---

## Features

✅ No authentication middleware (simplified for beginners)
✅ Simple and beginner-friendly code
✅ Async/await with try/catch error handling
✅ Mongoose models for all entities
✅ Proper HTTP status codes
✅ JSON-only responses
✅ MongoDB Atlas integration
✅ Password hashing with bcryptjs
✅ CRUD operations for all admin resources
✅ Public endpoints for user registration, login, contact, and appointments

---

## File Structure

```
/Models
  - departmentModel.js
  - doctorModel.js
  - serviceModel.js
  - userModel.js
  - appointmentModel.js
  - contactModel.js

/Controllers
  /admin
    - departmentController.js
    - doctorController.js
    - serviceController.js
    - adminUserController.js
    - adminAppointmentController.js
  - userController.js
  - contactController.js
  - appointmentController.js

/Routers
  /admin
    - departmentRoutes.js
    - doctorRoutes.js
    - serviceRoutes.js
    - adminUserRoutes.js
    - adminAppointmentRoutes.js
  - userRoutes.js
  - contactRoutes.js
  - appointmentRoutes.js

server.js
package.json
.env
```
