#!/usr/bin/env python3
import os
import glob
import subprocess

if __name__ == "__main__":
    svg_files = []
    for file in glob.glob("svg_raw/*.svg"):
        svg_files.append(file)
    for f in svg_files:
        command_str = "svgo {} -o svg_min/{}".format(f,
                os.path.basename(os.path.splitext(f)[0])+".min.svg")
        print(command_str)
        process = subprocess.Popen(command_str.split(), stdout=subprocess.PIPE)
        output, error = process.communicate()
