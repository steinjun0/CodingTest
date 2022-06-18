T = int(input())
s = []
for i in range(T):
    s.append(input())

for i in s:
    index = 0

    if i[0] not in ['A', 'B', 'C', 'D', 'E', 'F']:
        print('Good')
        continue

    index += 1
    while i[index] == 'A':
        index += 1
    if i[index] != 'F':
        print('Good')
        continue

    while i[index] == 'F':
        index += 1
    if i[index] != 'C':
        print('Good')
        continue

    while i[index] == 'C':
        if index == len(i)-1:
            break
        index += 1

    if i[index] in ['A', 'B', 'C', 'D', 'E', 'F']:
        print('Infected!')
    else:
        print('Good')

# 00:25:00 걸림
# 좀 불만족.. 더 빨리 풀어야하지 않았나?
# 그냥 조건 -> 구현 문제로 바라보는게 좀 더 맞았던 것 같다.
# 괜히 뭔가 방식을 찾아내려고 한게 문제였다.
