#!/bin/bash
set -e

if [ "${1:0:1}" = '-' ]; then
	set -- mongod "$@"
fi

if [ "$1" = 'mongod' ] || [ "$1" = 'mongos' ]; then
	chown -R mongodb /data/db /data/configdb

	numa='numactl --interleave=all'
	if $numa true &> /dev/null; then
		set -- $numa "$@"
	fi

	forever start /opt/index.js "$@"
	exec gosu mongodb "$@"
fi

exec "$@"
