# Dockerfile

############### Stage 1: Backend Builder #####################
FROM python:3.11-slim as backend-builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Create and use virtualenv
ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install Python requirements
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend code
COPY backend/ ./backend/
COPY backend/what_backend/example.env ./backend/.env
WORKDIR /app/backend

# Collect static
RUN python manage.py collectstatic --noinput

# Run tests
RUN python manage.py test


############### Stage 2: Frontend Builder #####################
FROM node:20 as frontend-builder

WORKDIR /app

COPY frontend/ ./frontend/
WORKDIR /app/frontend

RUN npm install && npm run build


############### Stage 3: Final Runtime ########################
FROM python:3.11-slim

# Set environment for virtualenv
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

WORKDIR /app

# Copy backend code and venv
COPY --from=backend-builder /opt/venv /opt/venv
COPY --from=backend-builder /app/backend /app/backend

# Copy built frontend static files into Django static folder
COPY --from=frontend-builder /app/frontend/dist /app/backend/static/

WORKDIR /app/backend

CMD ["gunicorn", "what_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
