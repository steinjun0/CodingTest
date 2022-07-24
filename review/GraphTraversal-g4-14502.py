# 00:36:25 포기. 답을 찾아보자
# 모든 경우에 수를 다 해본다..(백 트래킹이라는데, 완전 탐색으로 보임)
# 무조건 시간 초과일것 같은데, 한 번 시도해 보겠다

from collections import deque
import itertools
import copy

N, M = map(int, input().split())

graph_origin = []
zeros = []
viruses = []
for i in range(N):
    row = list(map(int, input().split()))
    for j, value in enumerate(row):
        if value == 0:
            zeros.append((i, j))
        if value == 2:
            viruses.append((i, j))
    graph_origin.append(row)

# print(graph_origin)
combs = itertools.combinations(zeros, 3)

max_cnt = 0


def bfs(walls):
    deq = deque()
    for virus in viruses:
        deq.append(virus)

    graph = copy.deepcopy(graph_origin)
    for wall in walls:
        graph[wall[0]][wall[1]] = 1

    moves = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    while deq:
        virus = deq.popleft()
        for move in moves:
            nx = move[0]+virus[0]
            ny = move[1]+virus[1]
            if 0 <= nx < N and 0 <= ny < M:
                if graph[nx][ny] == 0:
                    graph[nx][ny] = 2
                    deq.append((nx, ny))
    cnt = 0
    for i in range(N):
        for j in range(M):
            if graph[i][j] == 0:
                cnt += 1

    global max_cnt
    max_cnt = max(max_cnt, cnt)


for walls in combs:
    bfs(walls)

print(max_cnt)

# 00:15:50 indexError 틀렸습니다
# 00:16:00 가로길이 M을 N으로 입력한 부분이 있었음 수정 -> 정답입니다.
# ...
# 어이가 없다.
# 왜 시간초과가 안뜨는거지?
# 심지어 다른사람들이 푼 방식보다 내가 적으면 2배, 많으면 10배까지 빠르다.(10배 느린것도 통과됨)
# 아
# 최대값이 8이었다.........
# 3 <= N, 8 <= M으로 읽었는데
# 3 <= N,M <= 8
# 후...
# 그러면 최대로 복잡하다고 해도,
#   벽이 나올수 있는 조합의 개수 8C3 -> 56개
#   각 조합당 최대 연산 횟수 64번(무조건 이것보다 적음)
#   따라서, 5000번 미만...
# 에휴
