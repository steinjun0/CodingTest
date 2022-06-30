from collections import deque
n = int(input())
nodes = []
tree = {}
deq = deque()

for i in range(n-1):
    temp = list(map(int, input().split()))

    if 1 in temp:
        temp.remove(1)
        if type(temp[0]) is list:
            tree[temp[0]].append(1)
        else:
            tree[temp[0]] = 1
        deq.append(temp[0])
        continue
    nodes.append(temp)

# print(nodes)
while deq:
    # print(deq)
    temp = deq.popleft()
    poplist = []
    for index, node in enumerate(nodes):
        if temp in node:
            # print(node)
            node.remove(temp)
            tree[node[0]] = temp
            deq.append(node[0])
            poplist.append(index-len(poplist))

    for p in poplist:
        nodes.pop(p)


# for node in nodes:
#     if 1 in node:
#         temp = node
#         temp.remove(1)
#         tree[temp[0]] = 1
#     else:
#         if node[0] in tree:
#             tree[node[1]] = node[0]
#         else:
#             tree[node[0]] = node[1]

print(tree)
for i in range(n-1):
    print(tree[i+2])

# 00:35:28 keyError발생
# 00:57:00 시간 초과
