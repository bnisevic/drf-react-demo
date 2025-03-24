# Base image for backend
FROM python:3.11-slim as backend

WORKDIR /app

# Backend dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend source
COPY backend/ ./backend/
COPY manage.py .

# Collect static and prepare for deployment
RUN python manage.py collectstatic --noinput

# Final image
FROM python:3.11-slim

WORKDIR /app

COPY --from=backend /usr/local /usr/local
COPY --from=backend /app /app

CMD ["gunicorn", "--chdir", "backend", "what_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
