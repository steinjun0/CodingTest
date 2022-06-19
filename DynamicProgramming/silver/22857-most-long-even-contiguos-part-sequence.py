from operator import indexOf


n, k = list(map(int, input().split()))
origin_s = list(map(int, input().split()))
s = []

for index, value in enumerate(origin_s):
    if value % 2 == 0:
        if index != 0 and s[-1] != 'x':
            s[-1] += 1
        else:
            s.append(1)
    else:
        s.append('x')
final_list = []
for i in range(len(s)):
    j = 0
    final = s[:]
    offset = 0
    while j < k:
        if offset+i == len(final):
            break
        if final[offset+i] == 'x':
            j += 1
            t = final.pop(offset+i)
        else:
            offset += 1

    final_list.append(final)
last_list = []
for i in final_list:
    temp = []
    for index, value in enumerate(i):
        if value != 'x':
            if index == 0:
                temp.append(value)
            else:
                if temp[-1] != 'x':
                    temp[-1] += value
                else:
                    temp.append(value)
        else:
            temp.append('x')
    last_list.append(temp)

MAX = 0
for i in last_list:
    t = list(set(i))
    t.remove('x')
    m = max(t)
    if m > MAX:
        MAX = m

print(MAX)

# 9 x x x x 3 x 1 x x 2

# 01:15:52 시간초과
