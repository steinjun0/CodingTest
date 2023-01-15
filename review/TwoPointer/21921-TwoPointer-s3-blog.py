n, x = map(int, input().split())

visits = list(map(int, input().split()))

result = []
p_sum = [0]

for i in visits:
    p_sum.append(i+p_sum[-1])

for index, value in enumerate(visits):
    if index < x-1:
        continue
    result.append(p_sum[index+1]-p_sum[index-x+1])

maximum = max(result)
if maximum == 0:
    print('SAD')
else:
    print(maximum)
    print(result.count(maximum))

# 6~7분경 누적합 없이 풀고 시간초과
# 00:09:51 통과
# 간단하니까 누적합 씁시다.(쓰나 안쓰나 구현 난이도는 비슷함)
