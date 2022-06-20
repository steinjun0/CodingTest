# https://www.acmicpc.net/problem/1912
n = int(input())
input_seq = list(map(int, input().split()))

seq = []
for index, value in enumerate(input_seq):
    if len(seq) == 0:
        seq.append(value)
        continue
    if value < 0:
        if seq[-1] < 0:
            seq[-1] += value
        else:
            seq.append(value)
    else:
        if seq[-1] > 0:
            seq[-1] += value
        else:
            seq.append(value)

n = len(seq)

i = 0
last_index = 0
dp = [0 for _ in range(n)]
while i < n:
    between_sum = 0
    for elem in seq[last_index+1:i+1]:
        between_sum += elem

    if dp[i-1] + between_sum < seq[i]:
        dp[i] = seq[i]
        last_index = i
    elif between_sum < 0:
        dp[i] = dp[i-1]
    else:
        dp[i] = dp[i-1] + between_sum
        last_index = i

    i += 1

final_max_value = max(input_seq)
if final_max_value <= 0:
    print(final_max_value)

else:
    print(max(dp))

# 00:26:00 메모리초과 -> 2차원 배열, 1차원으로 변경
# 00:30:00 시간 초과 -> 2중 for문 1중으로 변경
# 00:50:00 시간 초과 -> ????? -> 2중 for문 legacy중 max(dp)를
#                               result에 append하는 부분을 삭제(필요없음)
#                               아마 max(dp)를 매번 실행해서 그런걸로 추측
# 00:56:18 solve!
# min, max도 O(N)이므로 for문 안에 넣으면 안된다!!(조심)
