#!/bin/sh

cd roles
for dir in $(ls):
do
  echo $dir
  cd $dir
  git up
  cd -
done
