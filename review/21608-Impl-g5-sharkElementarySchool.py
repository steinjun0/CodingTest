from unittest import result


n = int(input())

friends_dict = {}
seats = [[0 for _ in range(n)] for _ in range(n)]
students_seat = {}
for _ in range(n*n):
    row = list(map(int, input().split()))
    friends_dict[row[0]] = row[1:]


def search_free_seat(i, j):
    movements = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    result = []
    for movement in movements:
        ny = i+movement[0]
        nx = j+movement[1]
        if ny >= 0 and ny < n and nx >= 0 and nx < n:
            if seats[ny][nx] == 0:
                result.append((ny, nx))
    return result


def calculate_point(i, j):
    movements = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    count = 0
    for movement in movements:
        ny = i+movement[0]
        nx = j+movement[1]
        if ny >= 0 and ny < n and nx >= 0 and nx < n:
            if seats[ny][nx] in friends_dict[seats[i][j]]:
                count += 1
    if count == 0:
        return 0
    else:
        return 10**(count-1)


def first(student):
    seatable = []
    for i in friends_dict[student]:
        if i in students_seat:
            friends_seat = students_seat[i]
            free_seat = search_free_seat(friends_seat[0], friends_seat[1])
            seatable.extend(free_seat)
    seatable_elements = list(set(seatable))

    maximum = 0
    result = []
    for i in seatable_elements:
        c = seatable.count(i)
        if c > maximum:
            maximum = c
            result = [i]
        elif c == maximum:
            result.append(i)

    return result


def second(first_result):
    maximum = 0
    result = []
    for i in first_result:
        free_seat = search_free_seat(i[0], i[1])
        if len(free_seat) > maximum:
            maximum = len(free_seat)
            result = [i]
        elif len(free_seat) == maximum:
            result.append(i)

    return result


def third(second_result):
    minimum = n
    result = []
    for i in second_result:
        if i[0] == minimum:
            result.append(i)
        elif i[0] < minimum:
            result = [i]
            minimum = i[0]

    return result


def fourth(third_result):
    minimum = n
    result = []
    for i in third_result:
        if i[1] == minimum:
            result.append(i)
        elif i[1] < minimum:
            result = [i]
            minimum = i[1]

    return result


def update(result):
    # print(result)
    seats[result[0]][result[1]] = student
    students_seat[student] = (result[0], result[1])


for index, student in enumerate(friends_dict):
    # 0) 최초 자리는 1,1
    if index == 0:
        seats[1][1] = student
        students_seat[student] = (1, 1)
        continue

    # 1)
    first_result = first(student)
    # print(['first', first_result])

    if len(first_result) == 1:
        update(first_result[0])
        continue

    if len(first_result) == 0:
        for i in range(n):
            for j in range(n):
                if seats[i][j] == 0:
                    first_result.append((i, j))

    # 2)
    second_result = second(first_result)
    # print(['second', second_result])
    if len(second_result) == 1:
        update(second_result[0])
        continue

    # 3)
    third_result = third(second_result)
    # print(['third', third_result])
    if len(third_result) == 1:
        update(third_result[0])
        continue

    # 4)
    fourth_result = fourth(third_result)
    # print(['fourth', fourth_result])
    if len(fourth_result) == 1:
        update(fourth_result[0])
        continue

    print('not updated')


# for i in seats:
#     print(i)

point = 0
for i in range(n):
    for j in range(n):
        point += calculate_point(i, j)

print(point)


# 01:17:15 제출 -> key error
# 01:20:24 1번째 조건 이후 결과가 없을 수 있음 -> 틀렸습니다
# 01:22:00 1번째 조건 이후 결과 없을 시, 빈칸들을 first result로 추가 -> keyerror
# 01:23:35 continue 안빠진거 확인 ->
