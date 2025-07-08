#!/bin/bash

# Log the execution time
echo "Cron job executed at $(date)" >> /app/logs/cron_debug.log

# Run the Python script
/opt/anaconda3/bin/python /app/data_updater.py >> /app/logs/data_updater.log 2>&1