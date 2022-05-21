import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


[N, M] = map(int, input().split())

tree = {}

for i in range(M):
    [slave, master] = input().split()

    if master in tree:
        tree[master].append(slave)
    else:
        tree[master] = [slave]


def countChild(item, beforeTotalChildren):
    totalChildren = {item}
    if item in tree:
        children = tree[item]
        for child in children:
            if child not in beforeTotalChildren:
                totalChildren = totalChildren | countChild(
                    child, totalChildren)
    return totalChildren


# tree 탐색
count_result = {}
max_count = 0
for i in tree:
    # print(i+': '+str(tree[i]))
    count = 0
    find = tree[i]

max_count = 0

for i in range(N):
    children = countChild(f'{i+1}', {})
    # count_list[f'{i+1}'] = len(children)
    if max_count < len(children):
        max_count = len(children)

    # print(str(i+1)+': '+str(countChild(f'{i+1}', {})))

result = []
for i in range(N):
    children = countChild(f'{i+1}', {})
    if max_count == len(children):
        result.append(i+1)
print(str(result)[1:-1].replace(',', ''))


# 00:22:00
