#!/bin/sh
# check whether aux_fs exists or not
cat /proc/mtd |grep -q aux_fs
if [ $? == 0 ]; then
    # modified by weichen, 20141231. We check auxfs again after loading driver.
    # We use fix ubi id 2 as aux fs.
    mount |grep -q ubi2_0
    if [ $? != 0 ]; then
        board_para_util isAuxFsErasable
	    if [ $? == 1 ]; then
            mount -o remount,rw  /dev/mtdblock0 /                
            ubiformat /dev/mtd6 -y
            ubiattach /dev/ubi_ctrl -m 6 -d 2
            if [ ! -e /dev/ubi2 ]; then
                major=`cat /proc/devices | awk "\\$2==\"ubi2\" {print \\$1}"`
                mknod /dev/ubi2 c $major 0
            fi
            ubimkvol /dev/ubi2 -N aux_fs -m
            mount -t ubifs ubi2_0 /usr/local/auxfs
            /etc/init.d/migrate-wifi-files.sh
            mount -o remount,ro  /dev/mtdblock0 /
        fi
    fi
fi
