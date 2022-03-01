import sys


def input():
    return sys.stdin.readline().rstrip()


class Node:
    _child = []
    _parent = -1


N = int(input())
nodes = []
for i in range(N):
    nodes.append(Node())

links = []
for _ in range(N-1):
    n1_value, n2_value = list(map(int, input().split()))
    link = [n1_value, n2_value]
    links.append(link)


def setTree(parent_value, child_value):
    nodes[child_value-1]._parent = parent_value
    index = 0
    if len(links) == 0:
        return
    while True:
        link = links[index]
        if link[0] == child_value:
            if links.index(link) >= index:
                index -= 1
            links.remove(link)
            setTree(child_value, link[1])
        elif link[1] == child_value:
            if links.index(link) >= index:
                index -= 1
            links.remove(link)
            setTree(child_value, link[0])

        index += 1
        if len(links) == index:
            break


index = 0
while True:
    link = links[index]
    if link[0] == 1:
        if links.index(link) >= index:
            index -= 1
        links.remove(link)
        setTree(link[0], link[1])
    elif link[1] == 1:
        if links.index(link) >= index:
            index -= 1
        links.remove(link)
        setTree(link[1], link[0])

    index += 1
    if len(links) == index:
        break

for node in nodes[1:]:
    print(node._parent)

# 02:30:00 넘었지만 실패
