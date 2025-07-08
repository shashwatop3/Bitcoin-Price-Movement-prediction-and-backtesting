FROM python:3.11

# Set the working directory
WORKDIR /app

# Upgrade pip, setuptools, and wheel
RUN pip install --upgrade pip setuptools wheel

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libssl-dev \
    libffi-dev \
    && apt-get clean

# Copy requirements and install dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install pandas_ta from source if needed
RUN pip install git+https://github.com/twopirllc/pandas-ta.git

# Set timezone
ENV TZ=UTC
RUN apt-get update && \
    apt-get install -y cron && \
    rm -rf /var/lib/apt/lists/* && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
RUN ln -s /usr/local/bin/python3 /usr/bin/python

# Copy the backend code and model file into the container
COPY ./backend /app/backend
COPY ./models/xgboost_model.joblib /app/models/xgboost_model.joblib
COPY ./models/xgboost_model4.joblib /app/models/xgboost_model4.joblib
COPY ./models/xgboost_model6.joblib /app/models/xgboost_model6.joblib
COPY ./models/xgboost_model_gridsearch.joblib /app/models/xgboost_model7.joblib
COPY ./backend_preprocessing.py /app/backend_preprocessing.py
COPY ./order_class.py /app/order_class.py
COPY ./positions.py /app/positions.py
COPY ./data/btc_15m_data_2018_to_2025.csv /app/data/btc_15m_data_2018_to_2025.csv
COPY ./data_updater.py /app/data_updater.py
COPY .env /app/.env
COPY run_data_updater.sh /app/run_data_updater.sh

# Copy the crontab file to the cron.d directory
COPY crontab.txt /etc/cron.d/data_updater_cron

# Set the correct permissions for the cron file
RUN chmod 0644 /etc/cron.d/data_updater_cron

# Add the cron job to the crontab
RUN crontab /etc/cron.d/data_updater_cron

# Start the cron service
RUN service cron start

# Ensure the data_updater.py script is executable
RUN chmod +x /app/data_updater.py
RUN chmod +x /app/run_data_updater.sh

# Create a logs directory
RUN mkdir -p /app/logs

# Copy the start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose the port
EXPOSE 8000

# Use the start script as the CMD
CMD ["/bin/bash", "/app/start.sh"]