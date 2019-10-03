#!/bin/sh

trap "" 2

#The following will be populated by buildFS during the make process:
KERNELVER=3.4.11-rt19+

if [ ! -d /lib/modules/$KERNELVER/extra ]; then
	echo "ERROR: bcm-base-drivers.sh: /lib/modules/$KERNELVER/extra does not exist" 1>&2
fi

case "$1" in
	start)
		echo "Loading drivers and kernel modules... "
		echo

 test -e /lib/modules/$KERNELVER/extra/bcm_log.ko && insmod /lib/modules/$KERNELVER/extra/bcm_log.ko

 # enet depends on moca depends on i2c
 test -e /lib/modules/$KERNELVER/extra/i2c_bcm6xxx.ko && insmod /lib/modules/$KERNELVER/extra/i2c_bcm6xxx.ko
 test -e /lib/modules/$KERNELVER/extra/bcm3450.ko && insmod /lib/modules/$KERNELVER/extra/bcm3450.ko
 test -e /lib/modules/$KERNELVER/extra/laser_i2c.ko && insmod /lib/modules/$KERNELVER/extra/laser_i2c.ko
##############################################################################
#  RTF_DEF
############################################################################## 
 test -e /lib/modules/$KERNELVER/extra/laser_i2c.ko && echo laser_i2c 0x4f > /sys/bus/i2c/devices/i2c-0/new_device
############################################################################## 

##############################################################################
#  RTF_DEF modules
##############################################################################
# test -e /lib/modules/$KERNELVER/extra/bosa_drv.ko && insmod /lib/modules/$KERNELVER/extra/bosa_drv.ko
# Amy add for SONIQ RPE
# test -e /lib/modules/$KERNELVER/extra/qwerpe.ko && insmod /lib/modules/$KERNELVER/extra/qwerpe.ko

############################################################################## 
############################################################################## 

# RDPA
# test -e /lib/modules/$KERNELVER/extra/bdmf.ko && insmod /lib/modules/$KERNELVER/extra/bdmf.ko bdmf_chrdev_major=215 
# test -e /lib/modules/$KERNELVER/extra/gpon_stack.ko && insmod /lib/modules/$KERNELVER/extra/gpon_stack.ko
# test -e /lib/modules/$KERNELVER/extra/rdpa_gpl.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_gpl.ko
# test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa.ko
#if [ -f "/etc/gbe" ]; then
# test -e /etc/rdpa_gbe_init.sh && /etc/rdpa_gbe_init.sh
# test -e /etc/rdpa_gbe_wan5_init.sh && /etc/rdpa_gbe_wan5_init.sh
# test -e /etc/rdpa_gbe_wan0_init.sh && /etc/rdpa_gbe_wan0_init.sh
#else
#    test -e /etc/rdpa_gpon_init.sh && /etc/rdpa_gpon_init.sh 
#    test -e /etc/rdpa_epon_init.sh && /etc/rdpa_epon_init.sh
#    test -e /etc/rdpa_gpon_ext_sw_init.sh && /etc/rdpa_gpon_ext_sw_init.sh
#fi
# test -e /lib/modules/$KERNELVER/extra/rdpa_mw.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_mw.ko
# test -e /lib/modules/$KERNELVER/extra/bcmbrfp.ko && insmod /lib/modules/$KERNELVER/extra/bcmbrfp.ko
# General
 test -e /lib/modules/$KERNELVER/extra/chipinfo.ko && insmod /lib/modules/$KERNELVER/extra/chipinfo.ko
 test -e /lib/modules/$KERNELVER/extra/bcm_ingqos.ko && insmod /lib/modules/$KERNELVER/extra/bcm_ingqos.ko
 test -e /lib/modules/$KERNELVER/extra/bcm_bpm.ko && insmod /lib/modules/$KERNELVER/extra/bcm_bpm.ko
 test -e /lib/modules/$KERNELVER/extra/pktflow.ko && insmod /lib/modules/$KERNELVER/extra/pktflow.ko
 test -e /lib/modules/$KERNELVER/extra/pktcmf.ko && insmod /lib/modules/$KERNELVER/extra/pktcmf.ko
 test -e /lib/modules/$KERNELVER/extra/bcmfap.ko && insmod /lib/modules/$KERNELVER/extra/bcmfap.ko
 test -e /lib/modules/$KERNELVER/extra/pktrunner.ko && insmod /lib/modules/$KERNELVER/extra/pktrunner.ko
 test -e /lib/modules/$KERNELVER/extra/flowbond.ko && insmod /lib/modules/$KERNELVER/extra/flowbond.ko
 test -e /etc/cmf/cmfcfg && /etc/cmf/cmfcfg
 test -e /lib/modules/$KERNELVER/extra/profdrvdd.ko && insmod /lib/modules/$KERNELVER/extra/profdrvdd.ko
 test -e /lib/modules/$KERNELVER/extra/bcmxtmcfg.ko && insmod /lib/modules/$KERNELVER/extra/bcmxtmcfg.ko
 test -e /lib/modules/$KERNELVER/extra/ext_bonding.ko && insmod /lib/modules/$KERNELVER/extra/ext_bonding.ko
 test -e /lib/modules/$KERNELVER/extra/atmapi.ko && insmod /lib/modules/$KERNELVER/extra/atmapi.ko
 test -e /lib/modules/$KERNELVER/extra/adsldd.ko && insmod /lib/modules/$KERNELVER/extra/adsldd.ko
 test -e /lib/modules/$KERNELVER/extra/blaa_dd.ko && insmod /lib/modules/$KERNELVER/extra/blaa_dd.ko
 test -e /lib/modules/$KERNELVER/extra/bcmprocfs.ko && insmod /lib/modules/$KERNELVER/extra/bcmprocfs.ko
# test -e /lib/modules/$KERNELVER/kernel/net/ipv6/ipv6.ko && insmod /lib/modules/$KERNELVER/kernel/net/ipv6/ipv6.ko
 test -e /lib/modules/$KERNELVER/kernel/net/atm/br2684.ko && insmod /lib/modules/$KERNELVER/kernel/net/atm/br2684.ko
 test -e /lib/modules/$KERNELVER/extra/linux-kernel-bde.ko && insmod /lib/modules/$KERNELVER/extra/linux-kernel-bde.ko
 test -e /lib/modules/$KERNELVER/extra/linux-user-bde.ko && insmod /lib/modules/$KERNELVER/extra/linux-user-bde.ko

# test -e /lib/modules/$KERNELVER/extra/gpon_i2c.ko && insmod /lib/modules/$KERNELVER/extra/gpon_i2c.ko
# test -e /lib/modules/$KERNELVER/extra/gpon_i2c.ko && echo gpon_i2c 0x50 > /sys/bus/i2c/devices/i2c-0/new_device
# test -e /lib/modules/$KERNELVER/extra/gpon_i2c.ko && echo gpon_i2c 0x51 > /sys/bus/i2c/devices/i2c-0/new_device
# test -e /lib/modules/$KERNELVER/extra/bcmmoca.ko && insmod /lib/modules/$KERNELVER/extra/bcmmoca.ko
# test -e /lib/modules/$KERNELVER/extra/bcm_enet.ko && insmod /lib/modules/$KERNELVER/extra/bcm_enet.ko
# test -e /lib/modules/$KERNELVER/extra/time_sync.ko && insmod /lib/modules/$KERNELVER/extra/time_sync.ko 
# test -e /lib/modules/$KERNELVER/extra/nciTMSkmod.ko && insmod /lib/modules/$KERNELVER/extra/nciTMSkmod.ko
# test -e /lib/modules/$KERNELVER/extra/bcmsw.ko && insmod /lib/modules/$KERNELVER/extra/bcmsw.ko && ifconfig bcmsw up
# test -e /lib/modules/$KERNELVER/extra/bcm_usb.ko && insmod /lib/modules/$KERNELVER/extra/bcm_usb.ko
# test -e /lib/modules/$KERNELVER/extra/bcmarl.ko && insmod /lib/modules/$KERNELVER/extra/bcmarl.ko

#load usb-storage module
 test -e /lib/modules/$KERNELVER/kernel/drivers/usb/storage/usb-storage.ko && insmod /lib/modules/$KERNELVER/kernel/drivers/usb/storage/usb-storage.ko

#WLAN Module
# RDPA WLAN accelerator module
 test -e /lib/modules/$KERNELVER/extra/wfd.ko && insmod /lib/modules/$KERNELVER/extra/wfd.ko


 test -e /lib/modules/$KERNELVER/extra/wl.ko && insmod /lib/modules/$KERNELVER/extra/wl.ko omitdonglehw=1
 test -e /lib/modules/$KERNELVER/extra/dhd.ko && insmod /lib/modules/$KERNELVER/extra/dhd.ko firmware_path=/etc/dhd/rtecdc.bin nvram_path=/etc/dhd/nvram.txt
 test -e /etc/wlan/rtecdc.trx && mount -t usbfs none /proc/bus/usb && /bin/bcmdl /etc/wlan/rtecdc.trx && sleep 2 && insmod /lib/modules/$KERNELVER/extra/wl-usb.ko
 
 test -e /lib/modules/$KERNELVER/extra/dect.ko && insmod /lib/modules/$KERNELVER/extra/dect.ko 
 test -e /lib/modules/$KERNELVER/extra/dectshim.ko && insmod /lib/modules/$KERNELVER/extra/dectshim.ko 
 test -e /lib/modules/$KERNELVER/extra/dspdd.ko && insmod /lib/modules/$KERNELVER/extra/dspdd.ko
 test -e /lib/modules/$KERNELVER/extra/pcmshim.ko && insmod /lib/modules/$KERNELVER/extra/pcmshim.ko
 test -e /lib/modules/$KERNELVER/extra/endpointdd.ko && insmod /lib/modules/$KERNELVER/extra/endpointdd.ko
 test -e /lib/modules/$KERNELVER/extra/p8021ag.ko && insmod /lib/modules/$KERNELVER/extra/p8021ag.ko

# other modules
 test -e /lib/modules/$KERNELVER/extra/isdn.ko && insmod /lib/modules/$KERNELVER/extra/isdn.ko
 test -e /lib/modules/$KERNELVER/kernel/drivers/isdn/capi/capi.ko && insmod /lib/modules/$KERNELVER/kernel/drivers/isdn/capi/capi.ko 
 test -e /lib/modules/$KERNELVER/extra/bcmgpon.ko && insmod /lib/modules/$KERNELVER/extra/bcmgpon.ko
 test -e /lib/modules/$KERNELVER/extra/bcmvlan.ko && insmod /lib/modules/$KERNELVER/extra/bcmvlan.ko
 test -e /lib/modules/$KERNELVER/extra/pwrmngtd.ko && insmod /lib/modules/$KERNELVER/extra/pwrmngtd.ko
 test -e /lib/modules/$KERNELVER/kernel/drivers/char/hw_random/rng-core.ko && insmod /lib/modules/$KERNELVER/kernel/drivers/char/hw_random/rng-core.ko
 test -e /lib/modules/$KERNELVER/extra/bcmtrng.ko && insmod /lib/modules/$KERNELVER/extra/bcmtrng.ko

 test -e /lib/modules/$KERNELVER/extra/laser_dev.ko && insmod /lib/modules/$KERNELVER/extra/laser_dev.ko
 test -e /lib/modules/$KERNELVER/extra/sim_card.ko && insmod /lib/modules/$KERNELVER/extra/sim_card.ko

# EPON Module
test -e /lib/modules/$KERNELVER/extra/epon_stack.ko && insmod /lib/modules/$KERNELVER/extra/epon_stack.ko epon_usr_init=1

# Traffic Management init
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_tm.ko
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_iptv.ko 
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_ic.ko 
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_sys.ko
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_br.ko
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_port.ko
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_llid.ko
 test -e /lib/modules/$KERNELVER/extra/rdpa.ko && insmod /lib/modules/$KERNELVER/extra/rdpa_cmd_drv.ko 

# RTF_REDUCE_5G_BOOTUP_TIME
# 20170314-weichen-#10181-Reduce the time on which 5G Quantenna module starts to boot-up
# configure eth4 for QTN 5G download
bs /m mw 0xb30d3004 w 0x0000000b
#ifconfig eth4 1.1.1.1 netmask 255.255.255.0
#insmod ebtables modules
#insmod /lib/modules/3.4.11-rt19+/kernel/net/bridge/netfilter/ebt_arp.ko
#insmod /lib/modules/3.4.11-rt19+/kernel/net/bridge/netfilter/ebt_arpreply.ko
# RTF_REDUCE_5G_BOOTUP_TIME :create PREROUTING POSTROUTING ebtables 
#ebtables -t nat -A PREROUTING -p arp -i eth+ --arp-ip-src 1.1.1.1 -j DROP
#ebtables -t nat -A PREROUTING -p arp -i eth4 --arp-ip-src 1.1.1.2 -j ACCEPT
#ebtables -t nat -A PREROUTING -p arp -i eth+ --arp-ip-src 1.1.1.2 -j DROP
#ebtables -t nat -A POSTROUTING -p arp -o eth4 --arp-ip-src 1.1.1.1 -j ACCEPT
#ebtables -t nat -A POSTROUTING -p arp -o eth+ --arp-ip-src 1.1.1.1 -j DROP
#ebtables -t nat -A POSTROUTING -p arp -o eth+ --arp-ip-src 1.1.1.2 -j DROP
# early starting tftpd process for 5G download. It must have port number parameter which is modified by us.
#tftpd -p 69 &
# enable 5G gpio
#board_para_util gpio 16 1 


exit 0
		;;

	stop)
		echo "removing bcm base drivers not implemented yet..."
		exit 1
		;;

	*)
		echo "bcmbasedrivers: unrecognized option $1"
		exit 1
		;;

esac

