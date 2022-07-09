N = int(input())

meetings = [False for _ in range(N+2)]
meetings_start = [False]
best_sequence = []
for i in range(1, N+1):
    t, p = map(int, input().split())
    meetings_start.append((t, p))
    if i+t > N+1:
        continue
    if meetings[i+t]:
        meetings[i+t].append((i, i+t, p))
    else:
        meetings[i+t] = [(i, i+t, p)]
    # [종료 날짜]=보수

max_pay = 0


def get_sequence(new_meeting, temp_pay):
    temp = best_sequence[:]
    remove_index = 0
    new_meeting_start = new_meeting[0]
    new_meeting_end = new_meeting[1]

    for i, v in enumerate(temp[::-1]):
        if (new_meeting_start <= v < new_meeting_end) \
                or (new_meeting_start < (meetings_start[v][0]+v) <= new_meeting_end):
            # 기존 시작 날짜 >= 신규 시작 날짜 or 기존 종료 날짜 >= 신규 시작 날짜
            pass
        else:
            remove_index = len(temp) - i
            break

    reduct_pay = 0
    for i in temp[remove_index:]:
        reduct_pay += meetings_start[i][1]

    temp = temp[:remove_index]
    temp.append(new_meeting[0])
    temp_pay += meetings_start[new_meeting[0]][1]

    # pay = 0
    # for i in temp:
    #     pay += meetings_start[i][1]
    return (temp, temp_pay - reduct_pay)


for i in range(1, N+2):
    sequences = []
    if meetings[i]:
        finish_meetings = meetings[i]
        temp_pay = max_pay
        for meeting in finish_meetings:
            (sequence, pay) = get_sequence(meeting, temp_pay)
            if pay > max_pay:
                best_sequence = sequence
                max_pay = pay
                # print(best_sequence)

# print(best_sequence)
print(max_pay)

# 00:54:39 시간 초과
# 01:06:27 for문에 break 추가 -> 시간 초과
# 01:13:38 dict -> list로 변경 -> 시간 초과
# 01:26:32 제거할 index 탐색을 역순으로 진행 -> 시간 초과
# 01:33:34 payment 이전 결과값 사용 -> 시간 초과
# 01:42:25 포기. 2중 for를 해결하지 못함
