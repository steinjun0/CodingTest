import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())
pocketmons = {}
pocketmons_reverse = {}
for i in range(N):
    name = input()
    pocketmons[i] = name
    pocketmons_reverse[name] = i

for _ in range(M):
    question = input()
    try:
        pocketmonIndex = int(question) - 1
        print(pocketmons.get(pocketmonIndex))
    except:
        print(pocketmons_reverse.get(question) + 1)


# 00:09:10
# Python3로는 시간초과, PyPy3로는 통과
# dict로 풀었을 떄(2nd) 5배빠르게 통과 <- 10분 추가
