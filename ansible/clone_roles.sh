#!/bin/sh

cd roles
for role in $(tr ',' '\n' < ../../requirements.ansible_roles)
do
  echo $role
  git clone git@github.com:ephes/ansible_${role}.git ${role}
done
cd -
