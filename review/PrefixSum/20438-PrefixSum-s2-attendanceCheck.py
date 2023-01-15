n, k, q, m = map(int, input().split())
sleeps = list(map(int, input().split()))
checkers = list(map(int, input().split()))
ranges = []
for i in range(m):
    ranges.append(list(map(int, input().split())))

students = [i+3 for i in range(n)]
for checker in checkers:
    if checker in sleeps:
        continue

    for index, value in enumerate(students):
        if value != 'c' and value % checker == 0 and value not in sleeps:
            students[index] = 'c'

# print(students)
results = [0]
for i in students:
    if i == 'c':
        results.append(results[-1])
    else:
        results.append(results[-1]+1)
# print(students)

# print(results)
for r in ranges:
    print(results[r[1]-2] - results[r[0]-3])
# 10 1 3 2
# 7
# 3 5 7
# 3 12
# 5 12

# 00:29:46 시간초과 -> 누적합으로 변경
# 00:33:33 오답 -> 누적합 범위 잘못 지정하고 있었음
# 00:43:42 통과
# 1. 범위가 너무 헷갈린다. 테스트 할때는 범위 경계값을 그냥 다 넣어보자
# 마지막 디버깅도 경계값으로 찾았는데, 너무 늦게 찾았다
# 2. 누적합은 시작할때 0을 넣고 시작한다
# 3. 누적합 범위 내는 데에 익숙해져야함(많이 풀어야함)
