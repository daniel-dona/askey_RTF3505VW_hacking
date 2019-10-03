# Check for proper number of command line args.

EXPECTED_ARGS=1
E_BADARGS=65

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Select option an option down/up"
  exit $E_BADARGS
fi

case "$1" in
  down)
      echo
      echo 
      echo "### DOWNSTREAM VLAN TRANSFORMATION ###"
      echo
      echo
      echo "### Received from PORTS ###"
      echo
      dmesg -c >/dev/null
      vlanctl --if gpon0 --rx --tags 1 --show-table
      dmesg |grep "<4>" | grep -v "\[" | cut -b 4-99

      sleep 1

      echo
      echo "### Filtering and transformation ###"
      echo
      dmesg -c >/dev/null
      vlanctl --if gpon0.0 --rx --tags 1 --show-table
#      dmesg |grep "<4>" | grep -v "\[" | cut -b 4-99
      dmesg |grep "<4>" | cut -b 4-99

      sleep 1

      echo
      echo "### WAN selection ###"
      echo
      dmesg -c >/dev/null
      vlanctl --if veip0 --rx --tags 1 --show-table
      dmesg |grep "<4>" | grep -v "\[" | cut -b 4-99
      ;;
      
  up)
      echo
      echo 
      echo "### UPSTREAM VLAN TRANSFORMATION ###"
      echo
      echo
      echo "### Received from WAN ###"
      echo
      dmesg -c >/dev/null
      vlanctl --if veip0 --tx --tags 0 --show-table
      dmesg |grep "<4>" | grep -v "\[" | cut -b 4-99

      sleep 1

      echo
      echo "### Filtering and transformation ###"
      echo
      dmesg -c >/dev/null
      vlanctl --if gpon0.0 --tx --tags 1 --show-table
#      dmesg |grep "<4>" | grep -v "\[" | cut -b 4-99
      dmesg |grep "<4>" | cut -b 4-99

      sleep 1

      echo
      echo "### PORT SELECTION ###"
      echo
      dmesg -c >/dev/null
      vlanctl --if gpon0 --tx --tags 1 --show-table
#      dmesg |grep "<4>" | grep -v "\[" | cut -b 4-99
      dmesg |grep "<4>" | cut -b 4-99
      ;;

  *)
      echo  "Select option an option down/up"
      exit $E_BADARGS
      ;;

esac
