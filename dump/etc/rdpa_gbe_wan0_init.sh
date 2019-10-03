#!/bin/bash

# We need to down eth0 prior to starting runner's data path init
ifconfig eth0 down

# Initialize bdmf shell
bdmf_shell -c init | while read a b ; do echo $b ; done > /var/bdmf_sh_id
alias bs="bdmf_shell -c `cat /var/bdmf_sh_id` -cmd "

dmesg -n 8

# Start history recording
bs /bdmf/hist/init 0x20000 on

#bs /b/trace debug

# Create system object
# XXX: Need to detect WAN type and other system parameters
bs /bdmf/new system/init_cfg={wan_type=gbe,emac_mode={group_mode=qsgmii,emac4_mode=rgmii,emac5_mode=sgmii},num_wan=1,num_lan=3,enabled_emac=emac0+emac1+emac2+emac3,wan_emac=emac0,switching_mode=none,ip_class_method=fc},cfg={mtu_size=1536}

bs /bdmf/new port/index=wan0,cfg={emac=emac0},emac_cfg={enable=yes}

# XXX: Need to detect ports configuration
bs /bdmf/new port/index=lan1,cfg={emac=emac1},emac_cfg={enable=yes}
bs /bdmf/new port/index=lan2,cfg={emac=emac2},emac_cfg={enable=yes}
bs /bdmf/new port/index=lan3,cfg={emac=emac3},emac_cfg={enable=yes}

# Create DS egress_tm objects
bs /bdmf/new egress_tm/dir=ds,index=0,level=queue,mode=sp port/index=lan1
bs /bdmf/new egress_tm/dir=ds,index=1,level=queue,mode=sp port/index=lan2
bs /bdmf/new egress_tm/dir=ds,index=2,level=queue,mode=sp port/index=lan3

# Configure DS priority queues for LAN emac ports (emac ports schedulers have been already configured)
bs /bdmf/configure egress_tm/dir=ds,index=0 queue_cfg[0]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=ds,index=1 queue_cfg[0]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=ds,index=2 queue_cfg[0]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}

# Configure system bridge
# bs /bdmf/new bridge

# US: create a scheduler, connect to port and configure a queue
bs /bdmf/new egress_tm/dir=us,level=queue,mode=sp
bs /bdmf/configure port/index=wan0 tm_cfg={policer=null,policer_unknown_da=null,egress_tm={egress_tm/index=0,dir=us}}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[0]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[1]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[2]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[3]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[4]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[5]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[6]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[7]={weight=0,drop_alg=dt,drop_threshold=128,red_high_threshold=0,red_low_threshold=0}

# Configure CPU queue 0 for debugging purposes 
# Giving 0 (=NULL) for callback will let us to read packets from the queueu manually from shell.
bs /bdmf/configure cpu/index=host rxq_cfg[0]={rx_isr=0,sysb_type=skb,size=128,dump_data=no,isr_priv=0}

bs /bdmf/configure system cfg={inner_tpid=8100,outer_tpid=8100}

source /etc/rdpa_common_filter_init.sh   
