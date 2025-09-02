## API Endpoints

### User Routes

#### Create User
**Endpoint:** `POST /api/users`

**Description:** Creates a new user in the database.

**Request Body:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **400 Bad Request:** If any required field is missing or invalid.
  ```json
  {
    "message": "All fields are required!"
  }
  ```
- **400 Bad Request:** If the user already exists.
  ```json
  {
    "message": "User already exists"
  }
  ```
- **400 Bad Request:** If the user data is invalid.
  ```json
  {
    "message": "Invalid user data"
  }
  ```

---

#### Login User
**Endpoint:** `POST /api/users/logIn`

**Description:** Logs in an existing user.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **401 Unauthorized:** If the user is not found.
  ```json
  {
    "message": "User not found"
  }
  ```
- **401 Unauthorized:** If the password is