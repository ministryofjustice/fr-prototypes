#!/bin/bash

OS=$(uname -s)
case $OS in
  "Linux") 
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
	fi ;;
  *)
	DOCKER_VERSION=$(docker info &> /dev/null)
	if [ $? -eq 1 ]
	then	
		echo Docker was not running
	else
		osascript -e 'quit app "Docker"'
		echo Docker has been stopped
	fi ;;
esac