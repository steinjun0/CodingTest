# A, B = map(int, input().split())


# def add_1(num, step):
#     result = int(str(num)+'1')
#     step += 1

#     if result == B:
#         return step
#     elif result > B:
#         return -1

#     else:
#         m_step = multiple_2(num, step)
#         a_step = add_1(num, step)

#         if m_step != -1 and a_step == -1:
#             return m_step
#         elif a_step != -1 and m_step == -1:
#             return a_step
#         elif a_step == -1 and m_step == -1:
#             return -1

#         else:
#             if a_step > m_step:
#                 return m_step
#             else:
#                 return a_step


# def multiple_2(num, step):
#     result = num * 2
#     step += 1

#     if result == B:
#         return step
#     elif result > B:
#         return -1
#     else:
#         m_step = multiple_2(num, step)
#         a_step = add_1(num, step)
#         if m_step != -1 and a_step == -1:
#             return m_step
#         elif a_step != -1 and m_step == -1:
#             return a_step
#         elif a_step == -1 and m_step == -1:
#             return -1
#         else:
#             if a_step > m_step:
#                 return m_step
#             else:
#                 return a_step


# step = 1
# m_step = multiple_2(A, step)
# a_step = add_1(A, step)
# if m_step != -1 and a_step == -1:
#     print(m_step)
# elif a_step != -1 and m_step == -1:
#     print(a_step)
# elif a_step == -1 and m_step == -1:
#     print(-1)
# else:
#     if a_step > m_step:
#         print(m_step)
#     else:
#         print(a_step)

# 00:15:12

A, B = map(int, input().split())
temp = B
step = 1
while True:
    # print(temp)
    if temp == A:
        print(step)
        break
    elif temp < A:
        print(-1)
        break
    elif temp != 1 and str(temp)[-1] == '1':
        temp = int(str(temp)[:-1])
        step += 1

    elif str(temp)[-1] != '1':
        if temp % 2 != 0:
            print(-1)
            break
        else:
            temp = int(temp / 2)
            step += 1

# 00:23:25
