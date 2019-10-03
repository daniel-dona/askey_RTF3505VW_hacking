#!/bin/sh

while true ; do
	echo $0 starting $1, at `uptime`
	$*
	sleep 20
done
