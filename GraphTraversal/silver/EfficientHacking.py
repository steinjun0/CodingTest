import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())

relations = {i+1: [] for i in range(N)}
for i in range(M):
    A, B = map(int, input().split())
    if B in relations:
        relations[B].append(A)
    else:
        relations[B] = [A]


memoization = [-1] * (N+1)

best = 0

visited = [False] * (N+1)

history = []


def dfs(computer):
    global best
    global memoization
    global history

    sum = 0
    history.append(computer)
    print(f'memoization:{memoization}')
    print(f'visited:{visited}')
    print(f'computer:{computer}')
    for sub_computer in relations[computer]:
        # print(f'sub_computer:{sub_computer}')
        if sub_computer not in history and not visited[sub_computer]:
            history.append(sub_computer)
            dfs(sub_computer)

    memoization[computer] = len(history)
    # if computer in relations[sub_computer]:
    #     sum -= 1
    print(f'computer {computer} sum: {len(history)}')
    if best < len(history):
        best = len(history)

    visited[computer] = True
    memoization[computer] = len(history)
    history = []
    return memoization[computer]


for i in range(N):
    dfs(i+1)

result = []
for i in range(N):
    if memoization[i+1] == best:
        result.append(i+1)

print(str(result).replace(',', '')[1:-1])

# 3 6
# 1 2
# 1 3
# 2 1
# 2 3
# 3 1
# 3 2


# 실패
# 01:20:14
# recursion을 해결하지 못함
