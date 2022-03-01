import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())

# strings = []

# for _ in range(N):
#     strings.append(input())

strings = {}

for i in range(N):
    strings[input()] = i

# for _ in range(M):
#     tests.append(input())

result = 0
# for _ in range(M):
#     try:
#         strings.index(input())
#         result += 1
#     except:
#         pass
for _ in range(M):
    if input() in strings:
        result += 1

print(result)

# 00:08:21
# 시간이 좀 아슬아슬한 것 같다(채점이 오래걸림)
# 당연히 in 이 .index로 찾는것 보다 더 빠르다 (+3분)
# 당연히 dictionary로 찾는게 더 빠르다. + dictionary에 key값으로 in을 사용할 수 있다. (+3분)
