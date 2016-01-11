#! /bin/sh

PROJ_DIR=test-a

mkdir $PROJ_DIR
(
    cd $PROJ_DIR
    ember init --skip-npm --skip-bower
    
)
