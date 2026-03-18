#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/time_cost_app"
while [ true ]; do
  php artisan schedule:run --verbose --no-interaction &
  sleep 60
done
