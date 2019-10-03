#!/bin/sh

ENOTIMPL=252

# Enter commandsets supported by this customization script here
if [ "$1" = "get" -a "$2" = "commandsets" ]; then
    echo "gcli/v1"
    exit 0
fi

if [ "$1" = "get" -a "$2" = "platform" ]; then
    echo "askeyHGUBCM"
    exit 0
fi

if [ "$1" = "get" -a "$2" = "ifconfig" ]; then
    ifconfig
    exit $?
fi

[ "$1" != "tefapp" ] && exit $ENOTIMPL
shift

if [ "$1" = "show" -a "$2" = "wifi_info" ]; then
    tefapp show wifi
    tefapp show second_wifi
    tefapp show wifi_plus
    tefapp show second_wifi_plus
    exit $?
fi

if [ "$1" = "scan" ]; then
    wl scan -t passive || exit 1
    while wl channel | grep "^Scan in progress" >/dev/null; do
        sleep 1;
    done
    wl scanresults | grep -e "SSID:" -e "Mode:" -e "Chanspec:"
    exit 0
fi

exec tefapp "$@"