#!/bin/sh

###
 # @Author: cyy
 # @Date: 2021-06-22 15:19:29
 # @LastEditors: cyy
 # @LastEditTime: 2021-07-21 17:30:50
 # @Description: 
### 

echo "build $1";
lerna run --scope=@cyyjs/nestjs-$1 build;
echo "buid done";