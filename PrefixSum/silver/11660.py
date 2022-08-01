import sys


def input():
    return sys.stdin.readline().rstrip()


N, M = map(int, input().split())

prefix_sum_row = [[0 for _ in range(N+1)] for _ in range(N)]
prefix_sum_col = [[0 for _ in range(N)] for _ in range(N+1)]
prefix_sum_cube = [[0 for _ in range(N+1)] for _ in range(N+1)]
for i in range(N):
    temp = list(map(int, input().split()))
    # temp = [i for i in range(N)]
    for j in range(N):
        prefix_sum_row[i][j+1] = prefix_sum_row[i][j] + temp[j]
        prefix_sum_col[i+1][j] = prefix_sum_col[i][j] + temp[j]
        prefix_sum_cube[i+1][j+1] = prefix_sum_cube[i][j] + \
            prefix_sum_col[i+1][j] + prefix_sum_row[i][j+1] - temp[j]

# for i in numbers:
#     print(i)
# for i in prefix_sum_row:
#     print(i)
# for i in prefix_sum_col:
#     print(i)
# for i in prefix_sum_cube:
#     print(i)

for _ in range(M):
    x1, y1, x2, y2 = map(int, input().split())

    print(prefix_sum_cube[x2][y2] + prefix_sum_cube[x1-1]
          [y1-1] - prefix_sum_cube[x1-1][y2] - prefix_sum_cube[x2][y1-1])

# 00:21:02 시간 초과
# 00:56:08 cube단위로 누적합 계산 -> 시간초과
# 01:05:13 cube 계산 append 제거 -> 시간초과(3%) -> 110만번 연산인데 왜 시간초과지...
# 01:11:20 numbers 필요없어서 제거 -> 시간초과(3%)
# 01:17:19 M반복문에서 필요없는 연산 제거 -> 시간초과(3%)
# 01:22:06 input 함수 변경 -> 맞았습니다.
# 하...
# 진짜...
# 차이 많이 나네...
# 처음 제출한 코드도 input함수를 바꿔주니 통과한다.(가로줄만 누적합 계산하는 방식)
# (마지막코드와 처음 코드의 실행시간은 6배정도 차이남)
# 그렇게까지 최적화를 했는데도, input함수를 바꾸지 않으면 통과하지 못하는 문제였다.
# 이제부터는
# 진짜
# 꼭 input을 변경하고 문제를 풀자...
