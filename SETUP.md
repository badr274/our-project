# Project Setup Guide

This guide will walk you through setting up both the frontend and backend of the e-commerce project.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js and npm**
   - Download from: https://nodejs.org/
   - Recommended version: 16.x or higher
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **PHP and Composer**
   - PHP 8.1 or higher
   - Composer (PHP package manager)
   - Download from: https://getcomposer.org/
   - Verify installation:
     ```bash
     php --version
     composer --version
     ```

3. **MySQL or PostgreSQL**
   - Download MySQL: https://dev.mysql.com/downloads/
   - Or PostgreSQL: https://www.postgresql.org/download/
   - Verify installation:
     ```bash
     mysql --version
     # or
     psql --version
     ```

## Backend Setup (Laravel)

1. **Clone the repository and navigate to backend**
   ```bash
   cd ECommerceBackEnd
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure Database**
   - Open `.env` file
   - Update database credentials:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=laravel
     DB_USERNAME=root
     DB_PASSWORD=
     ```

5. **Create Database**
   ```sql
   CREATE DATABASE laravel;
   ```

6. **Run Migrations and Seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

7. **Start Laravel Development Server**
   ```bash
   php artisan serve
   ```
   The backend will be available at: http://localhost:8000

## Frontend Setup (Vue.js)

1. **Navigate to frontend directory**
   ```bash
   cd ECommerceFrontEnd
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Create `.env` file in the frontend directory
   - Add the following:
     ```
     VITE_API_URL=http://localhost:8000
     ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at: http://localhost:5173

## Verifying the Setup

1. **Backend Verification**
   - Visit http://localhost:8000
   - You should see the Laravel welcome page
   - Check API endpoints at http://localhost:8000/api/documentation (if enabled)

2. **Frontend Verification**
   - Visit http://localhost:5173
   - You should see the e-commerce application interface
   - Try logging in with seeded user credentials:
     - Email: admin@example.com
     - Password: password

## Common Issues and Solutions

1. **Port Conflicts**
   - If port 8000 is in use:
     ```bash
     php artisan serve --port=8001
     ```
   - If port 5173 is in use:
     ```bash
     npm run dev -- --port 5174
     ```

2. **Database Connection Issues**
   - Verify database credentials in `.env`
   - Ensure database server is running
   - Check database user permissions

3. **Node Modules Issues**
   - If you encounter node module errors:
     ```bash
     rm -rf node_modules
     npm install
     ```

4. **Composer Issues**
   - If you encounter composer errors:
     ```bash
     composer clear-cache
     composer install
     ```

## Development Workflow

1. **Running Both Servers**
   - Keep both terminal windows open
   - Backend: `php artisan serve`
   - Frontend: `npm run dev`

2. **Making Changes**
   - Backend changes will auto-reload
   - Frontend changes will hot-reload
   - Both servers can run simultaneously

3. **Database Changes**
   - Create new migrations: `php artisan make:migration`
   - Run migrations: `php artisan migrate`
   - Rollback: `php artisan migrate:rollback`

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vite Documentation](https://vitejs.dev/guide/) 