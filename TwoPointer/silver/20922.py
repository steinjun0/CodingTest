from collections import deque


N, K = map(int, input().split())

seq = list(map(int, input().split()))

pointer_1 = 0
pointer_2 = 0
max_length = 0

count = [deque() for _ in range(100001)]
# count[seq[0]].append(0)

while pointer_2 < N-1:
    next = seq[pointer_2+1]
    while len(count[next]) > 0 and count[next][0] < pointer_1:
        count[next].popleft()
    if len(count[next]) >= K:
        pointer_1 = count[next].popleft()+1
        continue
    else:
        pointer_2 += 1
        max_length = max(max_length, pointer_2 - pointer_1)
        count[next].append(pointer_2)
    # print([pointer_1, pointer_2, max_length])
    # print(count[1])
print(max_length+1)

# 00:17:34 시간초과(그럴 것 같았음)
# 00:18:30 전체 배열 복사부분 제거 -> 시간초과(!)
# 00:31:06 모든 원소 범위*N이 아니라, 모든 원소범위에 등장한 순서만 기억 -> 60%에서 시간 초과
# 00:35:14 길이 구하기 위한 배열 생성 -> deq로 left pop으로 변경 -> 틀렸습니다.
# 00:45:20 첫 원소에 대해 검증이 안되는걸 확인 -> 틀렸습니다
# 00:47:00 K보다 크거나 같음으로 수정 -> 틀렸습니다
# 00:50:26 count 개수가 다를 수 있었음(pointer_1보다 작은데 count에서 제외되지 못함)
#           -> count[next]를 확인해서 pointer_1보다 작은 애들 popleft 실시

# 1. 첫 원소에 대해 검증 안되는 로직이 어차피 필요했기 때문에 45분까지 필요했을걸로 추측
# 2. 역시나 직접 예시를 넣어보는게 확실하다. 머리로 생각하는것도 좋지만, 일단 최대한 예제를 집어넣어보자.
