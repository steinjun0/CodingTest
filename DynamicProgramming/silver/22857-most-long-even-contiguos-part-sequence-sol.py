from operator import indexOf


n, k = list(map(int, input().split()))
s = list(map(int, input().split()))


start = 0

max_cnt = 0
while start < n:
    cnt = 0
    usage = 0
    end = 0
    while start+end < n and usage < k:
        if s[start+end] % 2 == 0:
            cnt += 1
        else:
            usage += 1
        end += 1

    while start+end < n and usage == k:
        if s[start+end] % 2 == 0:
            cnt += 1
            end += 1
        else:
            break

    if max_cnt < cnt:
        max_cnt = cnt

    start += 1

print(max_cnt)

# solution 보고 15분 더 풀고 해결
# 그런데 solution과 완전 다르게 품
# 1. 어차피 연속된 숫자들이 아니면 최대값이 아니다
# 2. reader가 수열을 따라가면서 읽고, 누적과 조건 체크를 동시에 진행한다.
