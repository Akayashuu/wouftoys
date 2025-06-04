#!/bin/bash

# Start React app in /app
(cd ./app && npm run dev) &

# Start Vendure in /vendure/wooftoys
(cd ./vendure/wooftoys && npm run dev) &

# Wait for background processes to finish
wait