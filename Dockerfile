# Dockerfile

# Stage 1 - build backend & collect static
FROM python:3.11-slim as backend-builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend source
COPY backend/ ./backend/
WORKDIR /app/backend

# Set production environment variable for collectstatic to succeed
ENV SECRET_KEY="dummy-key"
ENV DEBUG=False
ENV ALLOWED_HOSTS="https://drf-react-demo.us.aldryn.io"

# Collect static files
RUN python manage.py collectstatic --noinput

# Run tests
RUN coverage run manage.py test && coverage report

# Stage 2 - final image
FROM python:3.11-slim

WORKDIR /app

COPY --from=backend-builder /usr/local /usr/local
COPY --from=backend-builder /app/backend /app/backend

WORKDIR /app/backend

CMD ["gunicorn", "what_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
