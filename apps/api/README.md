# NestJS API

This is a NestJS API project that extends ESLint and TypeScript configurations from the shared packages in the monorepo.

## Description

The API is built using [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Test

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Configuration

This project extends ESLint and TypeScript configurations from the shared packages in the monorepo:

- ESLint: `@repo/eslint-config`
- TypeScript: `@repo/typescript-config`

### Environment Variables

Copy the `.env.example` file to `.env` and update the values as needed:

```bash
cp .env.example .env
```

## Authentication API

The API includes a full authentication system with the following features:

- User registration and login
- JWT token-based authentication
- Role-based access control

### Endpoints

#### Register a new user

```
POST /api/auth/register
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "token": "jwt-token"
}
```

#### Login

```
POST /api/auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "token": "jwt-token"
}
```

#### Get current user

```
GET /api/auth/me
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user"
}
```

### Authentication Flow

1. Register a new user or login with existing credentials
2. Store the JWT token returned in the response
3. Include the token in the Authorization header for authenticated requests
4. Use the `/api/auth/me` endpoint to get the current user's information

### Protected Routes

To protect a route, use the `JwtAuthGuard`:

```typescript
@UseGuards(JwtAuthGuard)
@Get('protected-route')
getProtectedResource() {
  // This route is protected and requires authentication
}
```

For role-based access control, use the `RolesGuard` and `Roles` decorator:

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get('admin-route')
getAdminResource() {
  // This route is protected and requires admin role
}
```

## Themes API

The API includes a theme management system with the following features:

- Create, read, update, and delete themes
- Set active themes
- Retrieve the active theme

All theme endpoints are protected and require authentication.

### Endpoints

#### Get all themes

```
GET /api/themes
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
[
  {
    "id": "theme-uuid",
    "name": "Default Theme",
    "settings": {
      "color": "blue",
      "fontSize": 16
    },
    "isActive": true,
    "userId": "user-uuid",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Get active theme

```
GET /api/themes/active
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "id": "theme-uuid",
  "name": "Default Theme",
  "settings": {
    "color": "blue",
    "fontSize": 16
  },
  "isActive": true,
  "userId": "user-uuid",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Set active theme

```
POST /api/themes/active
```

Headers:

```
Authorization: Bearer jwt-token
```

Request body (to activate an existing theme):

```json
{
  "themeId": "theme-uuid"
}
```

Request body (to create a new active theme):

```json
{
  "name": "New Theme",
  "settings": {
    "color": "red",
    "fontSize": 18
  }
}
```

Response:

```json
{
  "id": "theme-uuid",
  "name": "New Theme",
  "settings": {
    "color": "red",
    "fontSize": 18
  },
  "isActive": true,
  "userId": "user-uuid",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Create a new theme

```
POST /api/themes
```

Headers:

```
Authorization: Bearer jwt-token
```

Request body:

```json
{
  "name": "Custom Theme",
  "settings": {
    "color": "green",
    "fontSize": 14
  },
  "isActive": false
}
```

Response:

```json
{
  "id": "theme-uuid",
  "name": "Custom Theme",
  "settings": {
    "color": "green",
    "fontSize": 14
  },
  "isActive": false,
  "userId": "user-uuid",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Get a specific theme

```
GET /api/themes/:id
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "id": "theme-uuid",
  "name": "Custom Theme",
  "settings": {
    "color": "green",
    "fontSize": 14
  },
  "isActive": false,
  "userId": "user-uuid",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Update a theme

```
PUT /api/themes/:id
```

Headers:

```
Authorization: Bearer jwt-token
```

Request body:

```json
{
  "name": "Updated Theme",
  "settings": {
    "color": "purple",
    "fontSize": 16
  },
  "isActive": true
}
```

Response:

```json
{
  "id": "theme-uuid",
  "name": "Updated Theme",
  "settings": {
    "color": "purple",
    "fontSize": 16
  },
  "isActive": true,
  "userId": "user-uuid",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Delete a theme

```
DELETE /api/themes/:id
```

Headers:

```
Authorization: Bearer jwt-token
```

Response: 204 No Content
