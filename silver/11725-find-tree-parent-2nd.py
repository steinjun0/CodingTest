import sys


def input():
    return sys.stdin.readline().rstrip()


class Node:
    _child = []
    _parent = -1
    _link = []


N = int(input())
nodes = []
for i in range(N):
    nodes.append(Node())

nodes[0]._parent = 0


for _ in range(N-1):
    n1_value, n2_value = list(map(int, input().split()))
    nodes[n1_value - 1]._link.append(n2_value)
    nodes[n2_value - 1]._link.append(n1_value)

node = nodes[0]
while True:
    nodes[node._link - 1].parent = node
    node = nodes[node._link - 1]
    break


for node in nodes[1:]:
    print(node._parent)
