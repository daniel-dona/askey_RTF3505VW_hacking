#!/bin/sh

##############################################################################
#
# INTEL CONFIDENTIAL
# Copyright (c) 2016 Intel Corporation All Rights Reserved
#
# The source code contained or described herein and all documents related
# to the source code ("Material") are owned by Intel Corporation or its
# suppliers or licensors. Title to the Material remains with Intel
# Corporation or its suppliers and licensors. The Material contains trade
# secrets and proprietary and confidential information of Intel or its
# suppliers and licensors. The Material is protected by worldwide copyright
# and trade secret laws and treaty provisions. No part of the Material may
# be used, copied, reproduced, modified, published, uploaded, posted,
# transmitted, distributed, or disclosed in any way without Intel's prior
# express written permission.
#
# No license under any patent, copyright, trade secret or other intellectual
# property right is granted to or conferred upon you by disclosure or
# delivery of the Materials, either expressly, by implication, inducement,
# estoppel or otherwise. Any license under such intellectual property rights
# must be express and approved by Intel in writing.
#
##############################################################################

. /etc/shgw/shgw.constants

LOCK_FILE=/var/.shgw/wd_stats.lock

#
# Global variables that will be filled with data by the functions
# These data will be used to create the pseudo-JSON obj to be stored in DB
G_DB_TABLE="stats"
G_DB_KEY="sys_stats"
G_DB_VAL=""

# load avg
G_DB_LOADAVG_KEY="loadavg"
G_DB_LOADAVG_VAL=""

# free mem
G_DB_FREE_MEM_KEY="freemem"
G_DB_FREE_MEM_VAL=""

# processes details
G_TOP_GREP_CMD=shgw_
G_TOP_TMPFILE=${SHGW_TMPFS_PATH}"/.stats_tmp"

# parse for 'appropriate' process name
LOGROTATE_PREFIX="{exe} ash "
SH_PREFIX_1="\/bin\/sh -c "
SH_PREFIX_2="\/bin\/sh "
ARP_SCAN_PREFIX="{shgw_run_arp_s}"

G_DB_PROCS_KEY="proc"
G_DB_PROCS_DATA=""

# ------------------- helper functions
_prep_json_array() {
	_json_array=""
	while [ $1 ]; do
		if [ -z ${_json_array} ]; then
			_json_array=${1}
		else
			_json_array=$(${ECHO} "${_json_array},$1")
		fi
		shift
	done

	${ECHO} "[${_json_array}]"
}

_log() {
	_date=$(${DATE} "+%T %F")
	${ECHO} "${_date}  $1"
}


# ------------------- loadavg
get_load_avg() {
	_log "[get_load_avg] Entering"
	_load_avg=$(${CAT} /proc/loadavg)
	_log "[get_load_avg] ${_load_avg}"

	_1min=$(${ECHO} ${_load_avg} | ${AWK} '{print $1}')
	_5min=$(${ECHO} ${_load_avg} | ${AWK} '{print $2}')
	_15min=$(${ECHO} ${_load_avg} | ${AWK} '{print $3}')

	G_DB_LOADAVG_VAL=$(_prep_json_array ${_1min} ${_5min} ${_15min})
	_log "[get_load_avg] ${G_DB_LOADAVG_VAL}"
	_log "[get_load_avg] Leaving"
}

get_shgw_procs_stats() {
	_log "[get_shgw_procs_stats] Entering"
	_json_data=""

	> ${G_TOP_TMPFILE}
	top -n1 -b | ${GREP} -v "grep" | ${GREP} ${G_TOP_GREP_CMD} > ${G_TOP_TMPFILE}
	while IFS= read -r line
	do
		_proc_name=$(${ECHO} ${line} | ${AWK} '{print $"'"$G_TOP_NAME_POS_1"'",$"'"$G_TOP_NAME_POS_2"'",$"'"$G_TOP_NAME_POS_3"'"}')
		_proc_name=$(${ECHO} ${_proc_name} | ${SED} -e "s/${LOGROTATE_PREFIX}//g")
		_proc_name=$(${ECHO} ${_proc_name} | ${SED} -e "s/${BIN_PREFIX}//g")
		_proc_name=$(${ECHO} ${_proc_name} | ${SED} -e "s/${SH_PREFIX_1}//g")
		_proc_name=$(${ECHO} ${_proc_name} | ${SED} -e "s/${SH_PREFIX_2}//g")
		_proc_name=$(${ECHO} ${_proc_name} | ${SED} -e "s/${ARP_SCAN_PREFIX}//g")
		_proc_name=$(${ECHO} ${_proc_name} | ${SED} -e "s/${WD_SUFFIX}//g")

		_cpu_usage=$(${ECHO} ${line} | ${AWK} '{print $"'"$G_TOP_CPU_POS"'"}' | ${CUT} -d% -f1)
		_mem_usage=$(${ECHO} ${line} | ${AWK} '{print $"'"$G_TOP_MEM_POS"'"}' | ${CUT} -d% -f1)

		[ -z "$_proc_name" ] || [ -z "$_cpu_usage" ] || [ -z "$_mem_usage" ] && continue

		if [ -z "${_json_data}" ]; then
			_json_data=$(${ECHO} "{\"${_proc_name}\":{\"cpu\":${_cpu_usage}, \"mem\":${_mem_usage}}}")
		else
			_json_data=$(${ECHO} "${_json_data},{\"${_proc_name}\":{\"cpu\":${_cpu_usage}, \"mem\":${_mem_usage}}}")
		fi
	done < ${G_TOP_TMPFILE}

	${RM} -rf ${G_TOP_TMPFILE}

	G_DB_PROCS_DATA=${_json_data}
	_log "[get_shgw_procs_stats] ${G_DB_PROCS_DATA}"
	_log "[get_shgw_procs_stats] Leaving"
}

get_free_mem() {
	_log "[get_free_mem] Entering"
	_json_data=""

	_free_mem=$(${CAT} /proc/meminfo | ${GREP} -i 'memfree' | ${AWK} '{print $2}')
	_log "[get_free_mem] Free Mem in KB: ${_free_mem}"

	G_DB_FREE_MEM_VAL=$(echo "${_free_mem}")

	_log "[get_free_mem] Leaving"
}

prep_final_data() {
	_log "[prep_final_data] Entering"
	_json_data=""

	# start the json
	_json_data=$(${ECHO} "{${_json_data}")

	# fill the data
	_json_data=$(${ECHO} "${_json_data}\"${G_DB_LOADAVG_KEY}\":${G_DB_LOADAVG_VAL}")
	_json_data=$(${ECHO} "${_json_data},\"${G_DB_PROCS_KEY}\":[${G_DB_PROCS_DATA}]")
	_json_data=$(${ECHO} "${_json_data},\"${G_DB_FREE_MEM_KEY}\":${G_DB_FREE_MEM_VAL}")

	# close the json
	_json_data=$(${ECHO} "${_json_data}}")

	G_DB_VAL=${_json_data}
	_log "[prep_final_data] ${_json_data}"
	_log "[prep_final_data] Leaving"
}

store_in_sqlite() {
	_log "[store_in_sqlite] Entering"

	${SQLITE} ${SHGW_NON_PERSISTANT_DB} << QUERY_END
		UPDATE ${G_DB_TABLE} SET value='${G_DB_VAL}' WHERE key='${G_DB_KEY}';
QUERY_END

	_log "[store_in_sqlite] Leaving"
}

exit_if_running(){
	exec 200>$LOCK_FILE
	flock -nx 200 || exit 1
}

# ----------------- Main functions

# collect all the data
exit_if_running
get_load_avg
get_shgw_procs_stats
get_free_mem

prep_final_data
store_in_sqlite

