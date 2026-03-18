#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/time_cost_app"
php artisan queue:work
