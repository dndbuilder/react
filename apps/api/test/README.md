# API Tests

This directory contains end-to-end tests for the API endpoints.

## Test Structure

The tests are organized by controller:

- `app.e2e-spec.ts`: Tests for the root endpoint
- `auth.e2e-spec.ts`: Tests for the authentication endpoints (register, login, profile)

## Running Tests

### Unit Tests

To run the unit tests:

```bash
cd apps/api
pnpm test
```

This will run all the unit tests in the `src` directory.

### End-to-End Tests

To run the end-to-end tests:

```bash
cd apps/api
pnpm test:e2e
```

This will run all the end-to-end tests in the `test` directory.

### Test Coverage

To run the tests with coverage:

```bash
cd apps/api
pnpm test:cov
```

## Test Coverage

### Unit Tests

- `app.controller.spec.ts`: Tests the root endpoint
- `auth.controller.spec.ts`: Tests the authentication controller

### End-to-End Tests

- `app.e2e-spec.ts`: Tests the root endpoint in an end-to-end manner
- `auth.e2e-spec.ts`: Tests the authentication endpoints in an end-to-end manner

## Mocking Strategy

The tests use mocks to avoid actual database operations:

- Unit tests mock the services that the controllers depend on
- End-to-end tests mock the database operations to avoid actual database interactions

## Test Scenarios

### Authentication Endpoints

- Register a new user (success and validation error)
- Login a user (success and invalid credentials)
- Get user profile (authenticated and unauthenticated)

### Root Endpoint

- Get the root endpoint