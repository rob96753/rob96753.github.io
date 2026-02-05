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

## Certbot Certificates

rob@skills-ez-server:/etc/nginx/sites-available $ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: ka-ikena.tech
    Serial Number: 5940eec86434f895db7b2c6c8393f53d17c
    Key Type: ECDSA
    Domains: ka-ikena.tech profile.ka-ikena.tech tools.ka-ikena.tech www.ka-ikena.tech
    Expiry Date: 2026-05-06 05:24:34+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/ka-ikena.tech/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/ka-ikena.tech/privkey.pem
  Certificate Name: skillsez.me
    Serial Number: 676f83031585aa09d3535a9666c93e51721
    Key Type: ECDSA
    Domains: skillsez.me www.skillsez.me
    Expiry Date: 2026-05-01 01:55:46+00:00 (VALID: 84 days)
    Certificate Path: /etc/letsencrypt/live/skillsez.me/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/skillsez.me/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

### How to Fix Expired Certificates
If the automatic renewal (usually via cron or systemd) failed, you can manually renew them: 
Run Renew Command: Execute sudo certbot renew on the server.

Force Renewal: If the certificate has already expired, you can use sudo certbot renew --force-renewal to obtain a new certificate.

Check Renewal Status: Verify configuration files in /etc/letsencrypt/renewal/ to ensure the renewal process is properly configured. 
Certbot automatically attempts renewal 30 days before the 90-day expiry. Setting up a reliable cron job or systemd timer is the best way to prevent expiration, as it runs the renewal check multiple times a day. 

Certbot generally requires port 80 to be open and accessible to the public internet for HTTP-01 challenge validation. While it does not need to be open permanently, it must be accessible during certificate issuance and renewal to verify domain ownership. 

Key details regarding port 80 and Certbot:
Alternative Option (DNS-01): If port 80 cannot be opened, you can use the dns-01 challenge, which requires no inbound ports (80 or 443).

Standalone Mode: If using certbot --standalone, it will directly bind to port 80, requiring any existing web server (like Apache or Nginx) on that port to be temporarily stopped.

Webroot/Plugin Mode: Using --webroot, --apache, or --nginx allows the existing web server to handle the challenge, which still requires port 80 to be accessible.
Security Recommendation: It is recommended to keep port 80 open but configured to redirect all traffic to HTTPS, while specifically allowing the .well-known/acme-challenge/ path for validation. 

### Migrating to a new server

To manually force a Let's Encrypt certificate reissue (renewal) before its scheduled time, use the command sudo certbot renew --force-renewal. To renew a specific certificate by domain name, use sudo certbot certonly --cert-name example.com --force-renew. For users employing acme.sh, the command is acme.sh --renew -d example.com --force. 

#### Common Reissue Commands:
    Force Renew All: sudo certbot renew --force-renewal
    Force Renew Specific Domain: sudo certbot certonly --cert-name example.com --force-renewal (replace example.com with your certificate name found via certbot certificates).
    Dry Run (Test): sudo certbot renew --dry-run.
    acme.sh User: acme.sh --renew -d example.com --force. 
#### Important Notes:
    Rate Limits: Do not abuse the --force-renewal flag, as Let's Encrypt has strict rate limits on issuing duplicate certificates (5 per week).
    Web Server Reload: If the certificate does not update automatically in your web server, you may need to reload or restart Apache/Nginx (e.g., sudo systemctl reload apache2 or sudo systemctl reload nginx).
    Manual Mode: If you used certbot --manual, you must rerun the original command to reissue. 