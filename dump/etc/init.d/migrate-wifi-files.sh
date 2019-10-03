#!/bin/sh
# commented by weichen, 20150916. This script will be called by other script which will re-mount rootfs to read/write first.
#mount -o remount,rw  /dev/mtdblock0 /
if [ ! -e /usr/local/auxfs ]
then
    mkdir -p /usr/local/auxfs
fi

if [ ! -e /usr/local/auxfs/wifi2_4G ]
then
    mkdir -p /usr/local/auxfs/wifi2_4G
fi
if  [ ! -e /usr/local/auxfs/wifi5G ]
then
    mkdir -p /usr/local/auxfs/wifi5G
fi
if  [ ! -e /usr/local/auxfs/bin ]
then
    mkdir -p /usr/local/auxfs/bin
fi

if [ ! -e /topaz-linux.lzma.img ]
then
    # if the file doesn't exist in rootfs, link it to file in auxfs.
    echo "link topaz-linux.lzma.img to auxfs"
    ln -s /usr/local/auxfs/wifi5G/topaz-linux.lzma.img /topaz-linux.lzma.img
else
    if [ ! -e /usr/local/auxfs/wifi5G/topaz-linux.lzma.img ]; then
        # if the file in auxfs is empty, copy it from rootfs.
        echo "copy topaz-linux.lzma.img to auxfs"
        cp -a /topaz-linux.lzma.img /usr/local/auxfs/wifi5G/
        cp -a /etc/rtf_version /usr/local/auxfs/
        sync
    fi
fi
if [ ! -e /lib/modules/3.4.11-rt19+/extra/wl.ko ]
then
    # if the file doesn't exist in rootfs, link it to file in auxfs.
    echo "link wl.ko to auxfs"
    ln -s /usr/local/auxfs/wifi2_4G/wl.ko /lib/modules/3.4.11-rt19+/extra/wl.ko
else
    if [ ! -e /usr/local/auxfs/wifi2_4G/wl.ko ]; then
        # if the file in auxfs is empty, copy it from rootfs.
        echo "copy wl.ko to auxfs"
        cp -a /lib/modules/3.4.11-rt19+/extra/wl.ko /usr/local/auxfs/wifi2_4G/
        cp -a /etc/rtf_version /usr/local/auxfs/
        sync
    fi
fi
#20170717-weichen-F#11271, remove tcpdump from rootfs.
#if [ ! -e /bin/tcpdump ]
#then
#    # if the file doesn't exist in rootfs, link it to file in auxfs.
#    echo "link /bin/tcpdump to auxfs"
#    ln -s /usr/local/auxfs/bin/tcpdump /bin/tcpdump
#else
#    if [ ! -e /usr/local/auxfs/bin/tcpdump ]; then
#        # if the file in auxfs is empty, copy it from rootfs.
#        echo "copy /bin/tcpdump to auxfs"
#        cp -a /bin/tcpdump /usr/local/auxfs/bin/
#        cp -a /etc/rtf_version /usr/local/auxfs/
#        sync
#    fi
#fi
if [ ! -e /bin/openssl ]
then
    # if the file doesn't exist in rootfs, link it to file in auxfs.
    echo "link /bin/openssl to auxfs"
    ln -s /usr/local/auxfs/bin/openssl /bin/openssl
else
    if [ ! -e /usr/local/auxfs/bin/openssl ]; then
        # if the file in auxfs is empty, copy it from rootfs.
        echo "copy /bin/openssl to auxfs"
        cp -a /bin/openssl /usr/local/auxfs/bin/
        cp -a /etc/rtf_version /usr/local/auxfs/
        sync
    fi
fi
# added by Scheng
if [ ! -e /bin/curl ]
then
    if [ -e /usr/local/auxfs/bin/curl ]; then
        # if the file doesn't exist in rootfs, link it to file in auxfs.
        echo "link /bin/curl to auxfs"
        ln -s /usr/local/auxfs/bin/curl /bin/curl
    fi
else
    if [ ! -e /usr/local/auxfs/bin/curl ]; then
        # if the file in auxfs is empty, copy it from rootfs.
        echo "copy /bin/curl to auxfs"
        cp -a /bin/curl /usr/local/auxfs/bin/
        cp -a /etc/rtf_version /usr/local/auxfs/
        sync
    fi
fi
# added by Scheng end
# added by weichen, 20160711. #8999, move qharvestd to auxfs for small size f/w. 
if [ ! -e /bin/qharvestd ]
then
    if [ -e /usr/local/auxfs/bin/qharvestd ]; then
        # if the file doesn't exist in rootfs, link it to file in auxfs.
        echo "link /bin/qharvestd to auxfs"
        ln -s /usr/local/auxfs/bin/qharvestd /bin/qharvestd
    fi
else
    if [ ! -e /usr/local/auxfs/bin/qharvestd ]; then
        # if the file in auxfs is empty, copy it from rootfs.
        echo "copy /bin/qharvestd to auxfs"
        cp -a /bin/qharvestd /usr/local/auxfs/bin/
        cp -a /etc/rtf_version /usr/local/auxfs/
        sync
    fi
fi
# added by weichen end
# added by weichen, 20171006,F#12251, move vodsl to auxfs for small size f/w. 
if [ ! -e /bin/vodsl ]
then
    if [ -e /usr/local/auxfs/bin/vodsl ]; then
        # if the file doesn't exist in rootfs, link it to file in auxfs.
        echo "link /bin/vodsl to auxfs"
        ln -s /usr/local/auxfs/bin/vodsl /bin/vodsl
    fi
else
    if [ ! -e /usr/local/auxfs/bin/vodsl ]; then
        # if the file in auxfs is empty, copy it from rootfs.
        echo "copy /bin/vodsl to auxfs"
        cp -a /bin/vodsl /usr/local/auxfs/bin/
        cp -a /etc/rtf_version /usr/local/auxfs/
        sync
    fi
fi
# 20171006-weichen-F#11495, Remove "TV service without Decoder".
if [ -e /usr/local/auxfs/bin/mvtv_ws ]; then
    # if the file exists in auxfs, remove it.
    echo "remove /usr/local/auxfs/bin/mvtv_ws"
    rm -f /usr/local/auxfs/bin/mvtv_ws
    sync
fi
# added by weichen end
# 20160930-weichen-#9646, check routerPassword exists in /data/scratchpad otherwise copy scratchpad from /usr/local/auxfs/ if there is a backup scratchpad.
pspctl dump routerPassword
if [ $? == 255 ] 
then
    if [ -f /usr/local/auxfs/scratchpad ]; then
       # the scratchpad backup during production exists
       echo "psp routePassword is not configured or corrupted, copy /usr/local/auxfs/scratchpad to /data"
       cat /etc/rtf_version >> /usr/local/auxfs/scratchpad.log
       echo "" >> /usr/local/auxfs/scratchpad.log
       echo "psp routePassword is not configured or corrupted, copy /usr/local/auxfs/scratchpad to /data" >> /usr/local/auxfs/scratchpad.log
       cp -a /usr/local/auxfs/scratchpad /data/scratchpad
       sync
    elif [ -f /usr/local/auxfs/scratchpad_bak ]; then
       # the scratchpad backup by firmware update exists
       echo "psp routePassword is not configured or corrupted, copy /usr/local/auxfs/scratchpad_bak to /data/scratchpad"
       cat /etc/rtf_version >> /usr/local/auxfs/scratchpad.log
       echo "" >> /usr/local/auxfs/scratchpad.log
       echo "psp routePassword is not configured or corrupted, copy /usr/local/auxfs/scratchpad_bak to /data/scratchpad" >> /usr/local/auxfs/scratchpad.log
       cp -a /usr/local/auxfs/scratchpad_bak /data/scratchpad
       sync
    else
       echo "psp routePassword is not configured or corrupted but there is also no backup scratchpad"
    fi
fi
# 20160930-weichen-#9646, end

if [ -e /usr/bin/fullimage ]
then
    # update the files in auxfs
    echo "/usr/bin/fullimage exists, update the files to auxfs"

    echo "copy topaz-linux.lzma.img to auxfs"
    cp -a /topaz-linux.lzma.img /usr/local/auxfs/wifi5G/

    echo "copy wl.ko to auxfs"
    cp -a /lib/modules/3.4.11-rt19+/extra/wl.ko /usr/local/auxfs/wifi2_4G/

#20170717-weichen-F#11271, remove tcpdump from rootfs.
#    echo "copy /bin/tcpdump to auxfs"
#    cp -a /bin/tcpdump /usr/local/auxfs/bin/

    echo "copy /bin/openssl to auxfs"
    cp -a /bin/openssl /usr/local/auxfs/bin/

# added by Scheng
    if [ -e /bin/curl ]
    then
        echo "copy /bin/curl to auxfs"
        cp -a /bin/curl /usr/local/auxfs/bin/
    fi
# added by Scheng end
# added by weichen, 20160711. #8999, move qharvestd to auxfs for small size f/w.
    if [ -e /bin/qharvestd ]
    then
        echo "copy /bin/qharvestd to auxfs"
        cp -a /bin/qharvestd /usr/local/auxfs/bin/
    fi
# added by weichen end
# added by weichen, 20171006,F#12251, move vodsl to auxfs for small size f/w. 
    if [ -e /bin/vodsl ]
    then
        echo "copy /bin/vodsl to auxfs"
        cp -a /bin/vodsl /usr/local/auxfs/bin/
    fi
# added by weichen end

#20170717-weichen-#11722, remove enableTelnet psp value for AR profile when FW is upgraded.
RTF_PROFILE=`version |grep 'RTF Profile:'|awk '{print $3}'`
if [ "${RTF_PROFILE}" == "AR" ]; then
    ENABLE_TELNET=`pspctl list |grep enableTelnet`
    if [ "${ENABLE_TELNET}" == "enableTelnet" ]; then
        echo "psp enableTelnet exists, delete it"
        pspctl delete enableTelnet
        # we should update /usr/local/auxfs/scratchpad_bak. (backup by fimrware update)
        pspctl dump routerPassword
        if [ $? != 255 ]
        then
            echo "cp -a /data/scratchpad /usr/local/auxfs/scratchpad_bak"
            cat /etc/rtf_version >> /usr/local/auxfs/scratchpad.log
            echo "" >> /usr/local/auxfs/scratchpad.log
            echo "cp -a /data/scratchpad /usr/local/auxfs/scratchpad_bak" >> /usr/local/auxfs/scratchpad.log
            cp -a /data/scratchpad /usr/local/auxfs/scratchpad_bak
        fi
    fi
fi

# 20160930-weichen-#9646, if routerPassword exists in /data/scratchpad and there is no scratchpad backup in /usr/local/auxfs/, we backup /data/scratchpad to /usr/local/auxfs/scratchpad_bak. (backup by fimrware update)
    pspctl dump routerPassword
    if [ $? != 255 ] 
    then
        if [ ! -f /usr/local/auxfs/scratchpad ] && [ ! -f /usr/local/auxfs/scratchpad_bak ]; then
            echo "cp -a /data/scratchpad /usr/local/auxfs/scratchpad_bak"
            cat /etc/rtf_version >> /usr/local/auxfs/scratchpad.log
            echo "" >> /usr/local/auxfs/scratchpad.log
            echo "cp -a /data/scratchpad /usr/local/auxfs/scratchpad_bak" >> /usr/local/auxfs/scratchpad.log
            cp -a /data/scratchpad /usr/local/auxfs/scratchpad_bak
        fi
    fi
# 20160930-weichen-#9646, end

    echo "copy /etc/rtf_version to auxfs"
    cp -a /etc/rtf_version /usr/local/auxfs/

    echo "remove /usr/bin/fullimage"
    rm -f /usr/bin/fullimage
    sync
fi
# commented by weichen, 20150916. This script will be called by other script which will re-mount rootfs to read-only after this script is done.
#mount -o remount,ro  /dev/mtdblock0 /

