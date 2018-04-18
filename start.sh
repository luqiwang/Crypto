export PORT=5104

cd ~/www/crypto_monitor
./bin/crypto_monitor stop || true
./bin/crypto_monitor start
