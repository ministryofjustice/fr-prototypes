#!/bin/bash

if (($EUID!=0)); then
	echo non-elevated user
	# sudo "$0" "$@"
	# exit $?
else
	echo elevated user
fi


# ID=$(id -u)

# echo $ID

# docker stop midman
# stop docker
