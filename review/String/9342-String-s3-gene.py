t = int(input())

for i in range(t):
    test_case_origin = list(input())

    test_case = []

    if test_case_origin[0] not in ['A', 'B', 'C', 'D', 'E', 'F']:
        print('Good')
        continue

    for index, value in enumerate(test_case_origin):
        if index == 0:
            test_case.append(value)
        else:
            if test_case[-1] == value:
                continue
            else:
                test_case.append(value)

    if test_case[0] == 'A':

        if len(test_case) < 3:
            print('Good')
            continue

        if test_case[1] != 'F':
            print('Good')
            continue
        if test_case[2] != 'C':
            print('Good')
            continue
        if len(test_case) == 4:
            if test_case[3] not in ['A', 'B', 'C', 'D', 'E', 'F']:
                print('Good')
                continue
            if test_case_origin[-2] != 'C':
                print('Good')
                continue
        print('Infected!')

    else:
        if len(test_case) < 4:
            print('Good')
            continue

        if test_case[1] != 'A':
            print('Good')
            continue
        if test_case[2] != 'F':
            print('Good')
            continue
        if test_case[3] != 'C':
            print('Good')
            continue
        if len(test_case) == 5:
            if test_case[4] not in ['A', 'B', 'C', 'D', 'E', 'F']:
                print('Good')
                continue
            if test_case_origin[-2] != 'C':
                print('Good')
                continue

        print('Infected!')

# 7분 만에 풀었는데 Infected -> Intected로 오타내서 00:26:18
# 꼭 저런 문구는 복사/붙여넣기로 하자.
# 그런데 이 문제 채점에 오류가 있다. 마지막 문자가 연속되면 안돼야하는데 통과되버림. 결국 15분~20분 정도 걸린게 맞는듯
