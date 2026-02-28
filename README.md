# University Management Dashboard

<div dir="auto" align="center">
  <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=React&logoColor=black" alt="React">
  </a>
  <a href="https://refine.dev/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Refine-42D7C3?style=for-the-badge&logo=Refine&logoColor=white" alt="Refine">
  </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript">
  </a>
  <br>
  <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white" alt="PostgreSQL">
  </a>
  <a href="https://neon.tech/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-NeonDB-00E599?style=for-the-badge&logo=Neon&logoColor=black" alt="NeonDB">
  </a>
  <a href="https://orm.drizzle.team/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Drizzle-C5F74F?style=for-the-badge&logo=Drizzle&logoColor=black" alt="Drizzle ORM">
  </a>
  <a href="https://better-auth.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Better--Auth-000?style=for-the-badge&logo=Auth0&logoColor=white" alt="Better Auth">
  </a>
  <br>
  <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" alt="Cloudinary">
  </a>
  <a href="https://arcjet.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Arcjet-34388F?style=for-the-badge&logo=Arcjet&logoColor=white" alt="Arcjet">
  </a>
  <a href="https://www.site24x7.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-Site24x7-26CD66?style=for-the-badge&logo=Site24x7&logoColor=white" alt="Site24x7">
  </a>
  <a href="https://coderabbit.ai/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/-CodeRabbit-FC5D13?style=for-the-badge&logo=CodeRabbit&logoColor=white" alt="CodeRabbit">
  </a>
</div>

<div align="center">
  <h3>🖥️ (Backend) University Dashboard Management</h3>
</div>

## 📋 Table of Contents

<ol dir="auto">
  <li>🚀 <a href="#getting-started">Getting Started</a>
    <ul>
      <li>📜 <a href="#available-scripts">Available Scripts</a></li>
    </ul>
  </li>
  <li>⚙️ <a href="#️-tech-stack">Tech Stack</a>
    <ul>
      <li>🎨 <a href="#frontend-stack">Frontend Stack</a></li>
      <li>⚡ <a href="#backend-stack">Backend Stack</a></li>
      <li>🛠️ <a href="#dev-tools">Dev Tools</a></li>
    </ul>
  </li>
  <li>🔋 <a href="#-features">Features</a></li>
  <li>📚 <a href="#learn-more">Learn More</a></li>
  <li>📄 <a href="#license">License</a></li>
</ol>

---

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

-   Git
-   Node.js
-   npm (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/JavaScript-Mastery-Pro/classroom-backend.git
cd classroom-backend
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:

```env
# Database
DATABASE_URL=''

# Arcjet
ARCJET_KEY=
ARCJET_ENV=development

# Application
FRONTEND_URL="http://localhost:5173"

# Better Auth
BETTER_AUTH_SECRET=
```

Replace the placeholder values with your real credentials. You can get these by signing up at: [Arcjet](), [Neon](), [Better-Auth]().

### Running the Project

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser to view the project.

## ⚙️ Tech Stack

### Frontend Stack
- **[React](https://reactjs.org/)** - A declarative, component-based JavaScript library for building user interfaces. It allows for the creation of complex, interactive UIs through reusable components, providing the core frontend experience for the academic hub.

- **[Refine](https://refine.dev/)** - A React-based framework for building data-intensive applications like admin panels and dashboards. It provides a headless approach that handles core logic—such as authentication, routing, and data fetching—allowing developers to focus on the UI and business logic.

- **[shadcn/ui](https://ui.shadcn.com/)** - A collection of re-usable components built using Radix UI and Tailwind CSS. It allows developers to build high-quality, accessible design systems by providing beautifully designed components that can be copied and pasted directly into applications.

- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML, ensuring highly maintainable and responsive styling.

- **[TypeScript](https://www.typescriptlang.org/)** - A superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers. It is ideal for building large-scale applications and enhances the development experience.

- **[Zod](https://zod.dev/)** - A TypeScript-first schema declaration and validation library. It is used to define data structures and validate them at runtime, ensuring type safety and reducing bugs by providing a single source of truth for both static types and data validation.

### Backend Stack
- **[Arcjet](https://arcjet.com/)** - A security-first tool that helps developers protect their applications with just a few lines of code. It provides security primitives for rate limiting, bot protection, email validation, and sensitive data masking, ensuring the application remains secure and resilient.

- **[Better Auth](https://better-auth.com/)** - A framework-agnostic authentication and authorization library for TypeScript. It provides built-in support for email and password authentication, social sign-on (Google, GitHub, Apple, and more), and multi-factor authentication, simplifying user authentication and account management.

- **[Cloudinary](https://cloudinary.com/)** - An end-to-end image and video management solution. It automates the upload, storage, manipulation, and delivery of media assets, ensuring optimized performance and a seamless visual experience across any device.

- **[Drizzle ORM](https://orm.drizzle.team/)** - A lightweight and performant TypeScript ORM designed with developer experience in mind. It provides a seamless interface between application code and database operations while maintaining high performance and reliability.

- **[Express.js](https://expressjs.com/)** - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It facilitates the rapid development of RESTful APIs and serves as the standard server framework for the Node.js ecosystem.

- **[Neon](https://neon.tech/)** - A fully managed, serverless PostgreSQL database platform. It offers features like instant provisioning, autoscaling, and database branching, enabling developers to build scalable applications without managing infrastructure.

- **[Node.js](https://nodejs.org/)** - An open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It is designed to build scalable network applications and serves as the foundation for the project's backend logic.

### Dev Tools
- **[CodeRabbit](https://coderabbit.ai/)** - An AI-powered code review platform that provides automated, contextual feedback on pull requests. It helps developers improve code quality and catch potential bugs early by integrating directly into the development workflow.

- **[Site24x7](https://www.site24x7.com/)** - A comprehensive monitoring solution that provides deep insights into application performance and infrastructure health. It allows for real-time tracking of uptime, end-user experience, and server metrics to ensure maximum availability.



## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **shadcn/ui** [Docs](https://refine.dev/docs/guides-concepts/general-concepts/#headless-concept)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)

## License

MIT
