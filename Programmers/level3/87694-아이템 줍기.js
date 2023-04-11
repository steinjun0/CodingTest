const directions = [[0,1],[0,-1],[1,0],[-1,0]]

function fillRectangle(world, [lbx,lby,rtx,rty],value){
    for(let x=lbx;x<=rtx;x++){
        for(let y=lby;y<=rty;y++){
            world[x][y] = value
        }
    }
}

function isValid(x,y){
    return 0<=x&&x<51&&0<=y&&y<51
}

// function getBoxLines(x,y){
//     const points = [
//         [x-1,y-1],
//         [x-1,y],
//         [x-1,y+1],
//         [x,y+1],
//         [x+1,y+1],
//         [x+1,y],
//         [x+1,y-1],
//         [x,y-1],
//     ]
//     const result = []
    
//     for(let i=0;i<7;i++){
//         if(isValid(...points[i]) && isValid(...points[i+1])){
//             result.push([points[i],points[i+1]])    
//         }
//     }
//     if(isValid(...points[7]) && isValid(...points[8])){
//         result.push([points[7],points[0]])
//     }
//     return result
// }

function isOutline(world, [x,y]){
    if(world[x][y] !== 0){
        for(const [dx,dy] of [[-1,-1],[1,1],[1,-1],[-1,1],...directions]){
            const nx = dx+x
            const ny = dy+y
            if(world[nx][ny] === 0){
                return true
            }
        }
    }
    return false
}

function isInRectangle(rectangles, [x,y],[nx,ny]){
    for(const [lbx,lby,rtx,rty] of rectangles){
        if(x === nx && x>lbx && x<rtx){
            if((y === lby && ny == rty) || (y === rty && ny === lby)){
                return true
            }
        }
        if(y === ny && y> lby && y<rty){
            if((x === lbx && nx == rtx) || (x === rtx && nx === lbx)){
                return true
            }
        }
    }
    return false
}

function isOnLine(rectangles, [x,y], [nx,ny]){
    for(const [lbx,lby,rtx,rty] of rectangles){
        if(!isInRectangle(rectangles, [x,y],[nx,ny])){
            if(x === lbx && lby <= y && y <= rty){
                if(nx === lbx && lby <= ny && ny <= rty) return true
            }
            if(x === rtx && lby <= y && y <= rty){
                if(nx === rtx && lby <= ny && ny <= rty) return true
            }
            if(lbx <= x && x <= rtx && lby === y){
                if(lbx <= nx && nx <= rtx && lby === ny) return true
            }
            if(lbx <= x && x <= rtx && rty === y){
                if(lbx <= nx && nx <= rtx && rty === ny) return true
            }    
        }
        
    }
    return false
}


function getSecondPoint(world,[x,y]){
    for(const [dx,dy] of directions){
        const nx = dx+x
        const ny = dy+y
        if(isValid(nx,ny) && world[nx][ny] !== 0){
            return [nx,ny]
        }
    }
}

function solution(rectangles, characterX, characterY, itemX, itemY) {
    const N = 51 // 51!!
    const world = Array.from(Array(N),()=>Array(N).fill(0))
    
    for(let i=0;i<rectangles.length;i++){
        const rectangle = rectangles[i]
        fillRectangle(world,rectangle,i+1)    
    }
    for(const [lbx,lby,rtx,rty] of rectangles){
        fillRectangle(world,[lbx+1,lby+1,rtx-1,rty-1],0)
    }
    // console.table(world)
    
    const nextPoint = getSecondPoint(world,[characterX, characterY])
    
    const queue = [nextPoint]
    const outlineSet = new Set([characterX*N+characterY,nextPoint[0]*N+nextPoint[1]])
    const outline = [[characterX,characterY],nextPoint]
    // console.log(isOnLine(rectangles,[7,8],[6,8]))
    while(queue.length > 0){
        const [x,y] = queue.pop()
        for(const [dx,dy] of directions){
            const nx = dx+x
            const ny = dy+y
            // console.log([nx,ny],isValid(nx,ny) , 
            //     world[nx][ny] !== 0 , 
            //     !outlineSet.has(nx*N+ny) , 
            //     isOnLine(rectangles,[x,y],[nx,ny]) )
            if(
                isValid(nx,ny) && 
                world[nx][ny] !== 0 && 
                !outlineSet.has(nx*N+ny) && 
                isOnLine(rectangles,[x,y],[nx,ny]) 
            ){
                outlineSet.add(nx*N+ny)
                outline.push([nx,ny])
                queue.push([nx,ny])
            }
        }
    }
    // console.log(outline)
    
    const itemIndex = outline.findIndex(e=>e[0]===itemX && e[1] === itemY)
    
    
    return Math.min(outline.length - itemIndex, itemIndex);
}

// 01:56:00 통과