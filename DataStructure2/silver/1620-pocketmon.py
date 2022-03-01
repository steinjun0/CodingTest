import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())
pocketmons = []
for _ in range(N):
    pocketmons.append(input())

for _ in range(M):
    question = input()
    try:
        pocketmonIndex = int(question) - 1
        print(pocketmons[pocketmonIndex])
    except:
        print(pocketmons.index(question) + 1)


# 00:09:10
# Python3로는 시간초과, PyPy3로는 통과
