import sys
import heapq


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

heap = []

for _ in range(N):
    x = int(input())
    if x == 0:
        if len(heap) > 0:
            print(heapq.heappop(heap)[1])
        else:
            print(0)

    else:
        heapq.heappush(heap, (-x, x))


# 00:12:42
# heapq랑 list를 조금만 섞어 써도 시간초과가 떠버린다
# max heap에 사용하는 튜플(음수, 양수) 테크닉을 잘 기억하
# 꼭 튜플로 안넣고 음수를 넣어도 된다(solution 참고)(당연)
# https://github.com/tony9402/baekjoon/blob/main/solution/data_structure2/11279/main.py
