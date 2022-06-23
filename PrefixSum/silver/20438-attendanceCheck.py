[n, k, q, m] = list(map(int, input().split()))
sleeps = list(map(int, input().split()))
starters = list(map(int, input().split()))
rois = []
for i in range(m):
    rois.append(list(map(int, input().split())))

entire_list = [i+3 for i in range(n+3)]
checklist = []
for starter in starters:
    if starter in sleeps:
        continue
    else:
        for elem in entire_list:
            if elem % starter == 0:
                checklist.append(elem)

checklist = list(set(checklist))
# print(checklist)
for i in sleeps:
    if i in checklist:
        checklist.remove(i)
# print(checklist)

checklist.sort()

for roi in rois:
    start_flag = 3
    finish_flag = n+2
    for index, i in enumerate(checklist):
        if i < roi[0]:
            continue
        elif start_flag == 3 and i >= roi[0]:
            start_flag = index
            break

    for index, i in enumerate(checklist[::-1]):
        if i > roi[1]:
            continue
        elif finish_flag == n+2 and i <= roi[1]:
            finish_flag = len(checklist)-index
            break
    print(roi[1]-roi[0] - finish_flag-start_flag+1)

    # roi_origin = [i+roi[0] for i in range(roi[1]-roi[0]+1)]
    # count = 0
    # for i in roi_origin:
    #     if i in checklist:
    #         count += 1

    # print(len(roi_origin) - count)

# 00:22~3 분쯤에 제출 -> 오답
# 00:33:10 범위에 문제 있는거 발견(등호 빠짐) -> 시간 초과
# 00:40:00 for문 하나 제거 -> 시간 초과
# 01:00:00 list 생성, 일일이 세기 제거 -> 로직으로 변경 -> 틀림
# 실패!
