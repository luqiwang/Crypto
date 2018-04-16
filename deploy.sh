#!/bin/bash

export PORT=5104
export MIX_ENV=prod
export GIT_PATH=/home/crypto_monitor/src/crypto_monitor

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "crypto_monitor" ]; then
	echo "Error: must run as user 'crypto_monitor'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest

mix release.init
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/crypto_monitor ]; then
	echo mv ~/www/crypto_monitor ~/old/$NOW
	mv ~/www/crypto_monitor ~/old/$NOW
fi

mkdir -p ~/www/crypto_monitor
REL_TAR=~/src/crypto_monitor/_build/prod/rel/crypto_monitor/releases/0.0.1/crypto_monitor.tar.gz
(cd ~/www/crypto_monitor && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/crypto_monitor/src/crypto_monitor/start.sh
CRONTAB

#. start.sh
