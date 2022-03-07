from collections import deque
import sys


def input():
    return sys.stdin.readline().rstrip()


size_of_map = int(input())

house_map = []
for _ in range(size_of_map):
    house_map.append(list(map(int, input())))

house = 1


def bfs(start_pos):
    global house_map
    global house

    if house_map[start_pos[0]][start_pos[1]] != 1:
        return 0

    house += 1
    deq = deque()
    deq.append(start_pos)
    house_map[start_pos[0]][start_pos[1]] = house
    cnt = 0
    while deq:
        cnt += 1
        pop = deq.popleft()
        diffs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        for diff in diffs:
            later_pos = (pop[0]+diff[0], pop[1]+diff[1])

            if later_pos[0] < 0 or \
                    later_pos[0] >= size_of_map or \
                    later_pos[1] < 0 or \
                    later_pos[1] >= size_of_map:
                continue

            if house_map[later_pos[0]][later_pos[1]] == 1:
                house_map[later_pos[0]][later_pos[1]] = house
                deq.append((later_pos[0], later_pos[1]))
    return cnt


cnt = 0

results = []
for i in range(size_of_map):
    for j in range(size_of_map):
        if house_map[i][j] == 1:
            results.append(bfs((i, j)))
            cnt += 1
            # bfs((i, j))

print(house - 1)
# print(cnt)
# results.sort()
# for i in results:
#     if i != 0:
#         print(i)
results = []
for i in range(house - 1):
    flatten_house_map = []
    for row in house_map:
        flatten_house_map += row

    count_of_house = flatten_house_map.count(i + 2)
    if count_of_house != 0:
        results.append(count_of_house)
        # print(count_of_house)
results.sort()

for i in results:
    print(i)

# # for i in list(set(results)):
# #     print(i)

# # print(house_map)

# for i in house_map:
#     print(i)


# # 00:30:00 경 해결했다고 생각(틀렸습니다)
# # 00:57:00 까지 고민했지만 코드 변경 없음(포기)
