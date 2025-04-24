#!/bin/bash

# Get update
S=https://github.com/twisterarmy/book.git
T=.book
if [ -d "$T" ]; then
    git -C $T pull
else
    git clone $S $T
fi

# Update destination
B=book
rm -rf $B/*
cp -r $T/$B/* $B