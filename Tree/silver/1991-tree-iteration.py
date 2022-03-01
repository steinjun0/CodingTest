import sys


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

nodes = {}

for i in range(N):
    node, left, right = input().split()
    nodes[node] = [left, right]


def preorder(node, result_pre):
    left = nodes[node][0]
    right = nodes[node][1]
    result_pre += node
    if(left != '.'):
        result_pre = preorder(left, result_pre)
    if(right != '.'):
        result_pre = preorder(right, result_pre)
    return result_pre


print(preorder('A', result_pre=''))


def inorder(node, result_in):
    left = nodes[node][0]
    right = nodes[node][1]
    if(left != '.'):
        result_in = inorder(left, result_in)
    result_in += node
    if(right != '.'):
        result_in = inorder(right, result_in)
    return result_in


print(inorder('A', result_in=''))


def postorder(node, result_post):
    left = nodes[node][0]
    right = nodes[node][1]
    if(left != '.'):
        result_post = postorder(left, result_post)
    if(right != '.'):
        result_post = postorder(right, result_post)
    result_post += node
    return result_post


print(postorder('A', result_post=''))

# 00:56:47
# 외우자 준영아.
# elif는 쓰면 안된다~
