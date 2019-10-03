#!/bin/sh

case "$1" in
	start)
		echo "Saving kernel bootup messages for dumpsysinfo..."
		/bin/dmesg > /var/tmp/bootupmessages
		exit 0
		;;

	stop)
		echo "No stop for dumpsysinfo"
		exit 1
		;;

	*)
		echo "$0: unrecognized option $1"
		exit 1
		;;

esac

