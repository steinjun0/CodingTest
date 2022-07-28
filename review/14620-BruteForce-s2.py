import heapq


N = int(input())

soils = []
for _ in range(N):
    soils.append(list(map(int, input().split())))

forbiddens = [(-2, 0), (-1, -1), (-1, 0), (-1, 1), (0, 1), (0, 2),
              (0, -1), (0, -2), (1, 0), (1, 1), (1, -1), (2, 0)]

minheap = []


def get_price(i, j):
    return soils[i][j]+soils[i-1][j]+soils[i+1][j]+soils[i][j-1]+soils[i][j+1]


for i in range(1, N-1):
    for j in range(1, N-1):
        for ii in range(i, N-1):
            for jj in range(1, N-1):
                if ii == i and jj < j+1:
                    continue

                second_success = True
                for forbidden in forbiddens:
                    if i+forbidden[0] == ii and j+forbidden[1] == jj:
                        second_success = False
                        break

                if second_success:
                    for iii in range(ii, N-1):
                        for jjj in range(1, N-1):
                            if iii == ii and jjj < jj+1:
                                continue
                            third_success = True
                            for forbidden in forbiddens:
                                if (ii+forbidden[0] == iii and jj+forbidden[1] == jjj) or (i+forbidden[0] == iii and j+forbidden[1] == jjj):
                                    third_success = False
                                    break
                            if third_success:
                                heapq.heappush(minheap, get_price(
                                    i, j)+get_price(ii, jj)+get_price(iii, jjj))

# print(minheap)
print(heapq.heappop(minheap))

# 00:25:06 맞았습니다!
# 어차피 (시간 복잡도 관점에서) N=10*10=100개가 전부이기 때문에, 최악의 경우라고 해도 100*100*100 = 1,000,000 밖에 되지 않기 때문에, 다 돌아도 된다.
# 다음은 시간 제한이 1초인 문제에 대한 예시이다.

# - N의 범위가 500인 경우: 시간 복잡도가 O(N^3)인 알고리즘을 설계하면 문제를 풀 수 있다.

# - N의 범위가 2000인 경우: 시간 복잡도가 O(N^2)인 알고리즘을 설계하면 문제를 풀 수 있다.

# - N의 범위가 100000인 경우: 시간 복잡도가 O(NlogN)인 알고리즘을 설계하면 문제를 풀 수 있다.

# - N의 범위가 10000000인 경우: 시간 복잡도가 O(N)인 알고리즘을 설계하면 문제를 풀 수 있다.
# 출처: https://yaneodoo2.tistory.com/entry/%EC%9D%B4%EA%B2%83%EC%9D%B4%EC%B7%A8%EC%97%85%EC%9D%84%EC%9C%84%ED%95%9C%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%8B%A4-Chapter-01-%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EA%B0%9C%EC%9A%94-1-%EB%B3%B5%EC%9E%A1%EB%8F%84-%EC%8B%9C%EA%B0%84-%EB%B3%B5%EC%9E%A1%EB%8F%84

# 통상 10억을 넘기지 않도록 한다
