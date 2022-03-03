import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


F, S, G, U, D = map(int, input().split())

deq = deque()
deq.append(S)
visited = [False for _ in range(F+1)]
visited[0] = True
visited[S] = 0

is_find = False
while deq:
    pop_pos = deq.popleft()

    if pop_pos == G:
        is_find = True
        print(visited[pop_pos])
        break

    if pop_pos + U <= F and visited[pop_pos + U] is False:
        visited[pop_pos + U] = visited[pop_pos] + 1
        deq.append(pop_pos + U)

    if pop_pos - D > 0 and visited[pop_pos - D] is False:
        visited[pop_pos - D] = visited[pop_pos] + 1
        deq.append(pop_pos - D)

if not is_find:
    print('use the stairs')


# 대충 20분경 큰 틀은 해결 (6x%까지 정답)
# 40:00 포기
