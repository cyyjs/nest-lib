#!/bin/sh

###
 # @Author: cyy
 # @Date: 2021-06-22 15:19:29
 # @LastEditors: cyy
 # @LastEditTime: 2021-06-22 15:38:26
 # @Description: 
### 

echo "rm -rf ./dist"
rm -rf ./dist

for d in `ls ./libs/`;
  do
    echo "buid $d ..."
    nest build $d;
done

echo "buid done"