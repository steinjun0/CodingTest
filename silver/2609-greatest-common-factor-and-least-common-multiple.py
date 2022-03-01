import sys


def input():
    return sys.stdin.readline().rstrip()


a, b = map(int, input().split())

min = a
if b < a:
    min = b

for i in range(min):
    if a % (i+1) == 0 and b % (i+1) == 0:
        GCF = i+1

i = 1
j = 1
while True:
    a_LCM = i*a
    b_LCM = j*b

    if a_LCM == b_LCM:
        LCM = a_LCM
        break

    if a_LCM > b_LCM:
        j += 1
        continue
    i += 1


print(GCF)
print(LCM)

# 00:11:00
