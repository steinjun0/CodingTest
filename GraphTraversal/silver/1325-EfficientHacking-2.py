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


def bfs(computer):
    deq = deque()
    deq.append(computer)
    visited = [False] * (N + 1)
    visited[computer] = True

    # print(visited)
    # print(computer)
    # print(relations)

    while deq:
        pop = deq.popleft()
        for new_com in relations[pop]:
            if not visited[new_com]:
                deq.append(new_com)
                visited[new_com] = True
    return visited.count(True)


results = [0] * (N+1)
best = 0
for com in range(N+1):
    if com == 0:
        continue
    results[com] = bfs(com)
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
