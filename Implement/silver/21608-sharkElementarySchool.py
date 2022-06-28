n = int(input())

likes_list = {}
students_order = []
students_seat = {}
for i in range(n*n):
    row = input().split()
    students_order.append(int(row[0]))
    likes_list[int(row[0])] = row[1:]
    students_seat[int(row[0])] = '*'

seats = [[4 for _ in range(n)] for _ in range(n)]
# print(seats)


def update_free_seat(i, j):
    for movement in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
        nx = i + movement[0]
        ny = j + movement[1]
        if nx >= 0 and ny >= 0 and nx < n and ny < n and type(seats[nx][ny]) is not str:
            seats[nx][ny] -= 1


seats[1][1] = str(students_order[0])
students_seat[students_order[0]] = [1, 1]
update_free_seat(1, 1)


for student in students_order[1:]:
    likes = likes_list[student]

    candidates = {}
    maximum = [0, []]
    for like in likes:
        if students_seat[int(like)] != '*':
            friends_seat = students_seat[int(like)]
            print(friends_seat)
            for movement in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
                nx = friends_seat[0] + movement[0]
                ny = friends_seat[1] + movement[1]
                print([nx, ny])
                if nx >= 0 and ny >= 0 and nx < n and ny < n and type(seats[nx][ny]) is not str:
                    if (nx, ny) not in candidates:
                        candidates[(nx, ny)] = 1

                    else:
                        candidates[(nx, ny)] += 1

                    if maximum[0] == candidates[(nx, ny)]:
                        maximum[1].append((nx, ny))
                    elif maximum[0] < candidates[(nx, ny)]:
                        maximum[0] = candidates[(nx, ny)]
                        maximum[1] = [(nx, ny)]
                    print(candidates)
                    print(maximum)

    if len(maximum[1]) == 0:
        M = 0
        for i in seats:
            for j in i:
                if type(j) is not str:
                    if j > M:
                        M = j
        break_flag = False
        for i, v in enumerate(seats):
            for j, vv in enumerate(v):
                if vv == M:
                    seats[i][j] = str(student)
                    update_free_seat(i, j)

                    break_flag = True
                    break
            if break_flag:
                break

    elif len(maximum[1]) == 1:
        seats[maximum[1][0]][maximum[1][1]] = str(student)
        update_free_seat(maximum[1][0], maximum[1][1])

    elif len(maximum[1]) > 1:
        max_free = 0
        for c in maximum[1]:
            if max_free < seats[c[0]][c[1]]:
                max_free = seats[c[0]][c[1]]
        print(max_free)

        for c in maximum[1]:
            if seats[c[0]][c[1]] == max_free:
                seats[c[0]][c[1]] = str(student)
                update_free_seat(c[0], c[1])
                break
    for i in seats:
        print(i)
    print()


# 01:12:58 실패 -> 제출조차 못해봄
