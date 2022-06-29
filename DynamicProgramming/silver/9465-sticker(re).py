t = int(input())
for _ in range(t):
    n = int(input())
    stickers = []
    stickers.append(list(map(int, input().split())))
    stickers.append(list(map(int, input().split())))

    dp = [[0 for _ in range(n)] for _ in range(2)]

    for i in range(n):
        if i == 0:
            dp[0][0] = stickers[0][0]
            dp[1][0] = stickers[1][0]
            continue

        if i == 1:
            dp[0][1] = dp[1][0] + stickers[0][1]
            dp[1][1] = dp[0][0] + stickers[1][1]
            continue

        dp[0][i] = dp[1][i-1] + stickers[0][i]
        dp[1][i] = dp[0][i-1] + stickers[1][i]

        if dp[0][i] < dp[1][i-2]+stickers[0][i]:
            dp[0][i] = dp[1][i-2]+stickers[0][i]

        if dp[1][i] < dp[0][i-2]+stickers[1][i]:
            dp[1][i] = dp[0][i-2]+stickers[1][i]

        # if dp[0][i] < dp[0][i-2]+stickers[0][i]:
        #     dp[0][i] = dp[0][i-2]+stickers[0][i]

        # if dp[1][i] < dp[1][i-2]+stickers[1][i]:
        #     dp[1][i] = dp[1][i-2]+stickers[1][i]
    maximum = 0
    for r in dp:
        # print(r)
        M = r[-1]
        if maximum < M:
            maximum = M
    print(maximum)

# 00:31:00 틀렸습니다
# 00:35:00 i ==0일 때 오류 발견 -> 틀렸습니다
# 00:46:49 비교 상황을 하나 더 추가(안될거 알았음) -> 틀렸습니다
# 00:50:18 테스트 케이스 이것 저것 넣다가 발견
#           -> 마지막에 최대값 출력 잘못 하고 있었음(...) -> 정답
#           35분때 코드가 정답 코드
# 저런 것도 패턴화를 잘 시켜서 실수를 줄이자(max를 쓰고 싶은데, 함수가 있어서 변수가 매번 달라짐)
# maximum으로 통일하자
