#!/bin/bash

case $1 in
foo)
	echo arg matched foo	
	;;
*)
	echo no match for $1
	;;
esac
