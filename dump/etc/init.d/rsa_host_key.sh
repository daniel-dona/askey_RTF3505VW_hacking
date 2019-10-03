#!/bin/sh

if [ -s /data/dropbear_rsa_host_key ]
then
	if [ -r /data/dropbear_rsa_host_key ]
	then
		if [ -r /data/dropbear_ecdsa_host_key ]
		then
			cp /data/dropbear_rsa_host_key /var/tmp
			cp /data/dropbear_ecdsa_host_key /var/tmp
		else
			dropbearkey -t ecdsa -f /data/dropbear_ecdsa_host_key -s 521
			cp /data/dropbear_rsa_host_key /var/tmp
			cp /data/dropbear_ecdsa_host_key /var/tmp
		fi
	else
		if [ -r /data/dropbear_ecdsa_host_key ]
		then
			dropbearkey -t rsa -f /data/dropbear_rsa_host_key -s 2048
			cp /data/dropbear_rsa_host_key /var/tmp
			cp /data/dropbear_ecdsa_host_key /var/tmp
		else
			dropbearkey -t rsa -f /data/dropbear_rsa_host_key -s 2048
			dropbearkey -t ecdsa -f /data/dropbear_ecdsa_host_key -s 521
			cp /data/dropbear_rsa_host_key /var/tmp
			cp /data/dropbear_ecdsa_host_key /var/tmp
		fi
	fi
else
		rm -rf /data/dropbear_rsa_host_key
		rm -rf /data/dropbear_ecdsa_host_key
		dropbearkey -t rsa -f /data/dropbear_rsa_host_key -s 2048
		dropbearkey -t ecdsa -f /data/dropbear_ecdsa_host_key -s 521
		cp /data/dropbear_rsa_host_key /var/tmp
		cp /data/dropbear_ecdsa_host_key /var/tmp
fi
	