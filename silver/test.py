import sys
sys.setrecursionlimit(10**6)


def input():
    return sys.stdin.readline().rstrip()


N = int(input())
nodes = [[] for _ in range(N+1)]
result = [-1 for _ in range(N+1)]
for i in range(N-1):
    a, b = list(map(int, input().split()))
    nodes[a].append(b)
    nodes[b].append(a)


def dfs(index):
    for node in nodes[index]:
        if result[node] == -1:
            result[node] = index
            dfs(node)


dfs(1)

for i in result[2:]:
    print(i)
