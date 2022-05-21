# 00:22:00 + 00:47:00에 새로 시작
# 00:22:00 + 01:38:52에 포기
# bfs로 다시 풀어봐라

import sys


def input():
    return sys.stdin.readline().rstrip()


[N, M] = map(int, input().split())


tree = {}
for i in range(M):
    [slave, master] = input().split()

    if master in tree:
        tree[master].add(slave)

    elif slave in tree:
        tree[master] = tree[slave] | {master}
        if master not in tree[slave]:
            tree[slave].pop()

    else:
        is_root = True
        for j in tree:
            if master in tree[j]:
                tree[j] = tree[j] | {slave}
                if slave != j:
                    is_root = False

        if is_root:
            tree[master] = {master, slave}
            if slave in tree:
                tree[master] = tree[master] | tree[slave]
                tree[slave].pop()

# print(tree)

max_len = 0
for i in tree:
    if max_len < len(tree[i]):
        max_len = len(tree[i])

result = []
for i in tree:
    if max_len == len(tree[i]):
        result.append(int(i))

print(str(result)[1:-1].replace(',', ''))
# for i in tree:
#     for j in i:
#         tree[i] = tree[j] | tree[i]
