# 2178
from collections import deque
import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())

map_maze = []
for _ in range(N):
    map_maze.append(list(map(int, list(input()))))


def bfs():
    # visited = [[False]*M]*N # 모든 n번째 리스트의 0번째 값 동일 주소
    # visited = [[False for _ in range(M)]]*N  # 모든 n번째 리스트의 0번째 값 동일 주소
    # visited = [[False]*M for _ in range(N)] # 각 값 주소 다름
    visited = [[False for _ in range(M)] for _ in range(N)]  # 각 값 주소 다름
    visited[0][0] = 1

    deq = deque()
    deq.append((0, 0))

    while deq:
        present_pos = deq.popleft()
        if present_pos[0] == N-1 and present_pos[1] == M-1:
            break
        for diff in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            if present_pos[0] + diff[0] < 0 or \
                    present_pos[0] + diff[0] >= N or \
                    present_pos[1] + diff[1] < 0 or \
                    present_pos[1] + diff[1] >= M or \
                    visited[present_pos[0]+diff[0]][present_pos[1]+diff[1]]:
                continue
            if map_maze[present_pos[0]+diff[0]][present_pos[1]+diff[1]] == 0:
                continue

            visited[present_pos[0]+diff[0]][present_pos[1] +
                                            diff[1]] = visited[present_pos[0]][present_pos[1]] + 1
            deq.append((present_pos[0] + diff[0], present_pos[1]+diff[1]))

    print(visited[N-1][M-1])


bfs()

# 00:46:56
