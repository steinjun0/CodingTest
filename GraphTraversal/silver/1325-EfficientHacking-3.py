from collections import deque
import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())


relations = {(i+1): [] for i in range(N)}
for i in range(M):
    A, B = map(int, input().split())
    if A in relations:
        relations[B].append(A)


def dfs(computer):
    stack = []
    stack.append(computer)
    visited = [False] * (N + 1)
    visited[computer] = True

    # print(visited)
    # print(computer)
    # print(relations)

    while stack:
        pop = stack.pop()
        for new_com in relations[pop]:
            if not visited[new_com]:
                stack.append(new_com)
                visited[new_com] = True
    return visited.count(True)


def dfs_recursion(computer, visited):

    for new_com in relations[computer]:
        if not visited[computer]:
            visited[computer] = True
            dfs_recursion(new_com, visited)


results = [0] * (N+1)
best = 0
# for com in range(N+1):
#     if com == 0:
#         continue
#     results[com] = dfs(com)
#     if best < results[com]:
#         best = results[com]

for com in range(N+1):
    visited = [False] * (N + 1)
    if com == 0:
        continue
    dfs_recursion(com, visited)
    results[com] = visited.count(True)
    if best < results[com]:
        best = results[com]

answer = []
for com in range(N+1):
    if com == 0:
        continue
    if results[com] == best:
        answer.append(com)

print(str(answer).replace(',', '')[1:-1])

# 00:24:14
# bfs로 푸니 바로 풀림
