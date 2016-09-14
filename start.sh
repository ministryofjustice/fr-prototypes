#!/bin/bash


DOCKER_VERSION=$(docker info &> /dev/null)
if [ $? -eq 1 ]
then	
	echo starting Docker
	open -a Docker
	until $(docker version &> /dev/null); [ $? -eq 0 ]
	do
	    printf '.'
	    sleep 1
	done
	printf '\n'
	echo Docker has been started
else
	echo Docker is already running
fi

if [[ "$(docker images -q middleman 2> /dev/null)" == "" ]]
then 
	echo Building new docker image
	echo =========================
	docker build -t middleman .
	echo =========================
	echo middleman image built
else 
	echo middleman image exists
fi

CONTAINER=proto
RUNNING=$(docker inspect --format="{{ .State.Running }}" $CONTAINER 2> /dev/null)

if [ $? -eq 1 ]
then
	echo Creating new container
	docker run -tid -v $PWD/source:/usr/src/app/source -p 4567:4567 -p 35729:35729 --name $CONTAINER middleman
	echo Container created and started, connect at http://localhost:4567
	exit 3
fi
if $RUNNING
then
	echo Container already running connect at http://localhost:4567
else
	docker start proto
	echo Container started, connect at http://localhost:4567

	exit 2
fi