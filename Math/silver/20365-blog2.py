import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

colors_origin = input()
colors_colony = deque()
before_color = ''
for color in colors_origin:
    if before_color != color:
        colors_colony.append(color)
    before_color = color

colors_colony_list = list(colors_colony)
colors_colony_list_len = len(colors_colony_list)

count_b = colors_colony_list.count('B')
if(colors_colony_list_len - count_b >= count_b):
    print(count_b+1)
else:
    print(colors_colony_list_len - count_b + 1)

# 13:37
