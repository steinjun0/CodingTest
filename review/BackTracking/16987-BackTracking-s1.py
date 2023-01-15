import sys
N = int(input())
origin_status = []
for i in range(N):
    origin_status.append(list(map(int, input().split())))

# def get_survivors(status):
#     survivors = []
#     for i in status:


def update_status(now, index, status):
    temp_status = status[:]
    # if temp_status[index][0] > 0 and temp_status[now][0] > 0:
    temp_status[index] -= origin_status[now][1]
    temp_status[now] -= origin_status[index][1]
    return temp_status


maximum_cnt = 0


def update_maximum(status):
    global maximum_cnt
    cnt = 0
    for i in status:
        if i <= 0:
            cnt += 1
    maximum_cnt = max(maximum_cnt, cnt)
    if maximum_cnt == N:
        print(N)
        sys.exit(0)


def break_next_egg(now, prev_status):
    status = prev_status[:]
    if status[now] <= 0:
        if now < N-1:
            break_next_egg(now+1, status)
        else:
            update_maximum(status)
        return
    else:
        for index, other in enumerate(status):
            if index == now:
                continue
            else:
                if status[index] > 0:
                    new_status = update_status(now, index, status)
                    if now < N-1:
                        break_next_egg(now+1, new_status)
                    else:
                        update_maximum(new_status)
                else:
                    if now < N-1:
                        break_next_egg(now+1, status)
                    else:
                        update_maximum(status)


start_status = []
for i in origin_status:
    start_status.append(i[0])
break_next_egg(0, start_status)
print(maximum_cnt)

# 이차원 리스트를 deepcoopy하지 않아서 로직이 계속 틀어졌음
# 그런데 deepcopy를 쓰니, 연산 속도가 너무 느려서 status를 1차원 배열로 변경함
# 그럼에도 불구하고 8개짜리 연산(~=2백만개)을 실행하면 2초 이상이 걸렸지만 제출해봄

# 00:53:56 -> 정답입니다!
# 저 시간 제한이 어떤 의미일지 참.. 궁금하다
# 내 컴퓨터가 그렇게 나쁜게 아닐텐데 어떻게 여기서 15초나 걸리는 연산이 통과가 되는거지?
# 1. 일단 1000만~1억 미만으로 연산횟수를 조절하는걸 계속 생각하자
# 2. deepcopy는 무진장 비싼 연산이다, 1차원으로 쓸 수 있으면 1차원을 쓰자
