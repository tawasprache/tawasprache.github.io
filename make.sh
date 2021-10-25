#!/usr/bin/env sh

rm -rf ./*.html
cp _src/*.html .
./_preproc/adjust.mjs ./*.html