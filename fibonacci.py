num_case = input()
nums = []
for i in range(int(num_case)):
    temp = int(input())
    nums.append(temp)

FIBO = [0, 1]

for i in range(41):
    if i > 1:
        FIBO.append(FIBO[i-1]+FIBO[i-2])


def fibo(n, result):
    if n == 0:
        result[0] += 1
        result[1] += 0
        return
    elif n == 1:
        result[0] += 0
        result[1] += 1
        return

    result[0] += FIBO[n-1]
    result[1] += FIBO[n]


for N in nums:
    result = [0, 0]
    fibo(N, result)
    print(f'{result[0]} {result[1]}')
