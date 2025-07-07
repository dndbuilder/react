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
