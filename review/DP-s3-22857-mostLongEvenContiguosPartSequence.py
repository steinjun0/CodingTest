n, k = map(int, input().split())
seq_origin = list(map(int, input().split()))
seq = []
for index, value in enumerate(seq_origin):
    if len(seq) == 0:
        if value % 2 == 0:
            seq.append(1)
        continue

    if value % 2 == 0:
        if len(seq) % 2 == 1:
            seq[-1] += 1
        else:
            seq.append(1)
    else:
        if len(seq) % 2 == 0:
            seq[-1] += 1
        else:
            seq.append(1)

# print(seq)
# seq의 짝수번째는 짝수, 홀수번째는 홀수
results = []
for start_index, _ in enumerate(seq[::2]):
    sum = 0
    limit = k
    for index, value in enumerate(seq[start_index*2:]):
        if index % 2 == 0:
            sum += value
        else:
            limit -= value
        if limit < 0:
            break
    results.append(sum)

# print(results)

if len(results) == 0:
    print(0)
else:
    print(max(results))

# 00:35:54
# 26분대에 다 적었는데 limit = k 초기화 부분이 바깥에 빠져있었다
# 저 한줄 빠진걸 검증할 테스트 케이스 만들다 10분 뒤에 찾음
# 집중력 문제?
# 저 부분 코드가 좀 복잡(더럽)해서 완벽하게 이해를 못하고 적은 느낌이 있음
# 꼭 복잡한 부분이 나오면 적고 -> 코딩하자
