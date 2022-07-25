# N = int(input())

# schedule = {}
# schedule_reverse = {}


# def add_schedule(start, finish):
#     if start not in schedule:
#         schedule[start] = [finish]
#     else:
#         schedule[start].append(finish)

#     if finish not in schedule_reverse:
#         schedule_reverse[finish] = [start]
#     else:
#         schedule_reverse[finish].append(start)


# for _ in range(N):
#     s, t = map(int, input().split())
#     if t in schedule:
#         new_t = schedule[t].pop()
#         schedule_reverse[new_t].remove(t)
#         # schedule_reverse[new_t].append(s)
#         if len(schedule[t]) == 0:
#             del schedule[t]
#         add_schedule(s, new_t)
#     elif s in schedule_reverse:
#         new_s = schedule_reverse[s].pop()
#         schedule[new_s].remove(s)
#         # schedule[new_s].append(t)
#         if len(schedule_reverse[s]) == 0:
#             del schedule_reverse[s]
#         add_schedule(new_s, t)
#     else:
#         add_schedule(s, t)

# # print(schedule)


# def group_class(min_start, keys):
#     temp = [i for i in keys if i >= min_start]
#     if len(temp) == 0:
#         return

#     start = min(temp)
#     next = min(schedule[start])
#     schedule[start].remove(next)

#     if len(schedule[start]) == 0:
#         del schedule[start]

#     group_class(next, keys)


# cnt = 0
# keys = schedule.keys()
# while len(keys) > 0:
#     start = min(keys)
#     group_class(start, keys)
#     cnt += 1
#     keys = schedule.keys()
# print(cnt)

# # 00:43:53 4% 시간초과(그럴거 같았음)
# # 00:51:32 dict.keys() 횟수를 줄임 -> 4% 시간초과
# #

N = int(input())


def is_able_get_in(schedule, s, t):
    if len(schedule) == 1:
        if t <= schedule[0][0]:
            return 0
        if s >= schedule[0][1]:
            return 1
    else:
        if t <= schedule[0][0]:
            return 0

    for i in range(1, len(schedule)):
        if schedule[i-1][1] <= s and t <= schedule[i][0]:
            return i

    return False


schedules = []
for i in range(N):
    s, t = map(int, input().split())

    flag = False
    for index in range(len(schedules)):
        insert_index = is_able_get_in(schedules[index], s, t)
        if insert_index is not False:
            # schedules[index].append((s, t))
            schedules[index].insert(insert_index, (s, t))
            flag = True
            break
    if not flag:
        schedules.append([(s, t)])
    # print(schedules)
print(len(schedules))

# 01:02:42 완전히 새로운 방식으로 시도 -> 4% 시간 초과
# 01:03:48 for문에 break 추가 -> 틀렸습니다
# 01:13:23 중복 시간 처리 추가 -> 4% 시간초과
# 01:14:13 포기
