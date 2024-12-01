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

# Set the working directory
WORKDIR /var/www/html

# Update Apache configuration to set document root to /var/www/public
RUN sed -i 's|/var/www/html|/var/www/public|g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's|<Directory /var/www/html>|<Directory /var/www/public>|g' /etc/apache2/apache2.conf
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
# Expose port 80
EXPOSE 80
