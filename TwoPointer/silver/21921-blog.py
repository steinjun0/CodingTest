[n, x] = list(map(int, input().split()))
visits = list(map(int, input().split()))

p_sum = [0]
for index, value in enumerate(visits):
    p_sum.append(p_sum[-1]+value)
results = []
for index, value in enumerate(p_sum):
    if index < x:
        continue
    else:
        results.append(p_sum[index] - p_sum[index-x])
maximum = max(results)
# print(results)
if maximum == 0:
    print('SAD')
else:
    print(maximum)
    print(results.count(maximum))

# 00:17:32
# 누적합+투포인터
# 어제 봤던 문제와 유사해서 빠르게 품(레벨도 낮음)
