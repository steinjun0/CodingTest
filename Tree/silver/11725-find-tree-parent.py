import sys


def input():
    return sys.stdin.readline().rstrip()


class Node:
    _value = -1
    _child = []
    _parent = -1
    _link = -1


N = int(input())
nodes = []
for i in range(N):
    nodes.append(Node())

for index, node in enumerate(nodes):
    node._value = index + 1

nodes[0]._parent = 0


for _ in range(N-1):
    n1_value, n2_value = list(map(int, input().split()))
    if nodes[n1_value-1]._parent != -1:
        nodes[n2_value-1]._parent = n1_value
    elif nodes[n2_value-1]._parent != -1:
        nodes[n1_value-1]._parent = n2_value


for node in nodes[1:]:
    print(node._parent)
