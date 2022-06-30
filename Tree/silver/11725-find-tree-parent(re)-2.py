from collections import deque
n = int(input())
nodes = {}
tree = {}
deq = deque()

for i in range(n-1):
    temp = list(map(int, input().split()))

    if temp[0] in nodes:
        if temp[1] != 1 and type(nodes[temp[0]]) is list:
            nodes[temp[0]].append(temp[1])
    else:
        if temp[1] != 1:
            nodes[temp[0]] = [temp[1]]

    if temp[1] in nodes:
        if temp[0] != 1 and type(nodes[temp[1]]) is list:
            nodes[temp[1]].append(temp[0])
    else:
        if temp[0] != 1:
            nodes[temp[1]] = [temp[0]]
    # print(nodes)

# print(nodes)
for i in nodes[1]:
    deq.append(i)
    tree[i] = 1

while deq:
    temp = deq.popleft()  # 4
    pops = nodes[temp]  # 7, 2
    for p in pops:
        tree[p] = temp  # 7's parent = 4
        deq.append(p)   # deq.append(7)
        if p in nodes:
            nodes[p].remove(temp)

# print(tree)
for i in range(n-1):
    if i+2 in tree:
        print(tree[i+2])

# 00:35:28 keyError발생
# 00:57:00 시간 초과
# 01:14:00 어느정도 진행되다 keyError
# 01:26:00 어느정도 진행되다 keyError
# 01:29:13 key error 해결 못하고 실패

# 7
# 1 6
# 3 5
# 6 3
# 4 1
# 2 4
# 4 7
