#!/bin/sh
# check whether aux_fs exists or not
mkdir /var/shgw
cat /proc/mtd |grep -q aux_fs
if [ $? == 0 ]; then
    mount -o remount,rw  /dev/mtdblock0 /
    if [ ! -e /usr/local/auxfs ]                         
    then                                                 
        mkdir -p /usr/local/auxfs                               
    fi
    # modified by weichen, 20141227. Change auxfs format from jffs2 to ubifs.
    # We use fix ubi id 2 as aux fs.
    ubiattach /dev/ubi_ctrl -m 6 -d 2
    if [ $? == 0 ]; then
        if [ ! -e /dev/ubi2 ]; then
            major=`cat /proc/devices | awk "\\$2==\"ubi2\" {print \\$1}"`
            mknod /dev/ubi2 c $major 0
        fi
        # mount the first volume by default
        mount -t ubifs ubi2_0 /usr/local/auxfs
        if [ $? == 0 ]; then
            /etc/init.d/migrate-wifi-files.sh
        else
            ubidetach -m 6
        fi
    fi
    mount -o remount,ro  /dev/mtdblock0 /
fi
#20170914-weichen-B#11676,[TEFARHGU-75] HGU stops working after Firmware upgrade N8 to N11
#Description: Erase data partition and mount it again if data partition is corrupted.
mount |grep -q mtd:data
if [ $? != 0 ]; then
    echo "data partition may be corrupted. Erase it and mount it again"
    flash_erase /dev/mtd2 0 0
    mount -t jffs2 mtd:data /data
fi
