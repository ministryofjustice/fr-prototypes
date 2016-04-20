#!/bin/bash

if service docker status | grep -q "Active: active"
then	
	if [ $(id -u) != "0" ]; then
		chmod +x "$0"
	    sudo "$(pwd)/$0" "$@"
	    exit $?
	fi
	sudo service docker stop
	echo Docker has been stopped
else
	echo Docker was not running
fi
