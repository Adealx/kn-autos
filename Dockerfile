
# STAGE 1: BUILD NEXT.JS
FROM node:24-bookworm-slim AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SITE_URL=https://sam-a-autos-frontend.onrender.com

RUN npm run build


# STAGE 2: DJANGO + NEXT.JS + NGINX
FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    supervisor \
    gettext-base \
    libatomic1 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=frontend-build /usr/local/bin/node /usr/local/bin/node

WORKDIR /app

COPY backend/requirements.txt /app/backend/requirements.txt

RUN python -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir -r /app/backend/requirements.txt

ENV PATH="/opt/venv/bin:$PATH"

COPY backend/ /app/backend/

COPY --from=frontend-build /app/frontend/package.json /app/frontend/package.json
COPY --from=frontend-build /app/frontend/node_modules /app/frontend/node_modules
COPY --from=frontend-build /app/frontend/.next /app/frontend/.next
COPY --from=frontend-build /app/frontend/public /app/frontend/public

RUN mkdir -p /etc/nginx/templates

COPY deploy/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY deploy/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY deploy/start.sh /app/start.sh

RUN chmod +x /app/start.sh

EXPOSE 10000

ENTRYPOINT ["/app/start.sh"]
