# ./api/Dockerfile

FROM php:8.3-apache

# Install dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo_mysql

# Enable Apache mod_rewrite if needed
RUN a2enmod rewrite
