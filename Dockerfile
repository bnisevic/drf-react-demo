# Base image for backend
FROM python:3.11-slim as backend

WORKDIR /app

# Copy backend requirements and install
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Collect static files
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# Final image
FROM python:3.11-slim

WORKDIR /app

# Copy installed Python packages and backend app
COPY --from=backend /usr/local /usr/local
COPY --from=backend /app/backend /app/backend

WORKDIR /app/backend

CMD ["gunicorn", "what_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
