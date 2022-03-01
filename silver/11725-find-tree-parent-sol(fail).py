# import sys
# input = sys.stdin.readline
# sys.setrecursionlimit(10**6)

# n = int(input())
# tree = [[] for _ in range(n+1)]
# par = [-1]*(n+1)

# for _ in range(n-1):
#     a, b = map(int, input().split())
#     tree[a].append(b)
#     tree[b].append(a)


# def dfs(n):
#     for i in tree[n]:
#         if par[i] == -1:
#             par[i] = n
#             dfs(i)


# dfs(1)
# for i in range(2, n+1):
#     print(par[i])


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

# sys.setrecursionlimit(10**6)를 써주어서 recursion 최대 횟수를 늘려야한다.
# https://help.acmicpc.net/judge/rte/RecursionError
