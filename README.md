# Soft Link

## Overview

Soft-Link is a simple and efficient URL shortener designed to streamline the process of creating and sharing shortened URLs. Users can submit their long URLs to the system, receiving a shortened version in return. When others click on the shortened URL, they are seamlessly redirected to the original link.

## Key Features

- URL Shortening: Quickly generate concise and shareable links.
- Redirection: Smoothly redirect users to the original URL when clicking on the shortened link.

## Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript/TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Testing:** Jest
- **Documentation and Manual Testing:** Postman

## Getting Started

### Prerequisites

**1. Install Dependencies:**

```bash
npm install
```

**2. Set Environment Variables:**

Rename the `.env.example` file to `.env` and fill in the required values.

### Running the Server

**1. Start the Server:**

```bash
npm start
```

**2. Run Tests:**

```bash
npm test
```

## API Documentation

Explore and test the API using Postman. Refer to the provided Postman collection for details.

### Endpoints

**1. Create a Shortened URL:**

```http
POST {{URL}}/api/url/shorten
```

**2. Redirect to Original URL:**

```http
GET {{URL}}/api/url/:shortId
```

## Design

Refer to the `docs` directory for design details:

- [architecture-diagram](./docs/architecture-digram/arch-digram.png) for the project's architecture diagram.
- [erd](./docs/erd/erd.png) for the simple Entity-Relationship Diagram.

## License

This project is licensed under the [MIT License](./LICENSE).
