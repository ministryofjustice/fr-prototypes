#!/bin/bash

DOCKER_VERSION=$(docker info &> /dev/null)
if [ $? -eq 1 ]
then	
	echo Docker was not running
else
	osascript -e 'quit app "Docker"'
	echo Docker has been stopped
fi
