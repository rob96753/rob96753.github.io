# Deployment (nginx)

This project is a static site. Deploy by copying the built files to an nginx web root.

## Prerequisites
- nginx installed on the server
- SSH access to the server
- This repo available locally

## 1) Build / prepare files
This site is static. No build step is required. Ensure the files you want to serve are in the repo root (for example, index.html, css/, js/, img/, pages/).

## 2) Server directory
Pick a web root on the server, for example:

- `/var/www/ka-ikean.tech`

Create it if needed:

```bash
sudo mkdir -p /var/www/ka-ikean.tech
sudo mkdir -p /var/www/ka-ikean.tech/profile
sudo chown -R www-data:www-data /var/www/ka-ikean.tech
sudo chmod -R 755 /var/www/ka-ikean.tech
```

## 3) Upload files
From your local machine:

```bash
rsync -avz --delete \
  --exclude ".git/" \
  --exclude "node_modules/" \
  --exclude "*.log" \
  ./ rob@skills-ez-server:/var/www/ka-ikean.tech/
```

## 4) nginx config
Create a site config (example):


```nginx
server {
    listen 443;
    server_name ka-ikean.tech www.ka-ikean.tech;

    root /var/www/ka-ikean.tech/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Optional: cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public";
        try_files $uri =404;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/ka-ikean.tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5) Setting Up SSL/TLS for NGINX

Here’s a minimal, production‑ready Certbot flow for Nginx on skillsez.me:

Ensure DNS A/AAAA records point to your server, and ports 80/443 are open.
Verify your Nginx server block includes server_name ka-ikena.tech ka-ikena.tech.
Install Certbot for Nginx (package varies by distro).
Run Certbot with Nginx plugin for both domains: certbot --nginx -d ka-ikena.tech -d www.ka-ikena.tech
(this auto‑edits Nginx, installs certs, and sets the redirect).
Reload Nginx.
Confirm auto‑renew is enabled (systemd timer or cron).

Port 80 needs to be open on the router firewall.

Example commands (Ubuntu/Debian):

  ### Install Certbot if not installed
  certbot --version 
  sudo apt update
  sudo apt install certbot python3-certbot-nginx

  ### Create certificates
  sudo certbot --nginx -d ka-ikena.tech -d www.ka-ikena.tech -d profile.ka-ikena.tech -d tools.ka-ikena.tech
  sudo nginx -t
  sudo systemctl reload nginx
  sudo systemctl status certbot.timer

## 6) Verify
Open:

- `http://example.com/`

## 6) Update deployment
Re-run the `rsync` command after changes.

## Troubleshooting
- 404s: confirm `root` points to the directory with `index.html`.
- Permission errors: ensure nginx can read the files.
- Config errors: run `sudo nginx -t`.