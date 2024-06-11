// Utils.js functions

export function getUrl() {
  return 'https://www.bashurov.net/tg_bashni/'
}



export function addMove(moves, i, j) {
  const m = [...moves];
  m.push(i)
  m.push(j)
  return m
}

export function clearMove(moves) {
  const m = moves.slice(0, -2);  
  console.log("m length -=-", m.length)
  return m
}


export function makeUndo(board, moves) {
  let b = [];

  for (let i = 0; i < board.length; i++) {
    b[i] = [];
    for (let j = 0; j < board[i].length; j++) {
        b[i][j] = board[i][j];
    }
  } 

  for (let i = 0; i < moves.length-2; i+=2) {




  for (let i3 = 0; i3 < 6; i3++) {
    let s = ''
    let f = board[i3] 
    for (let j = 0; j < f.length; j++) {
      let d = f[j]
      s += "," + d.number
    }
    console.log(s)
  }
    console.log('-----------------------------------')








    let i1 = moves[i]-1
    let i2 = moves[i+1]-1


    let m = b[i1][b[i1].length-1] 
    b[i1] = b[i1].slice(0,-1)
    console.log("i1 i2", i1, i2, m)

    b[i2].push(m)

    let flag = true

    while (flag) {
      let l2 = b[i2].length
      console.log("l2 length ", l2)
      flag = false
      if (l2>1) {
        const q1 = b[i2][l2-1] 
        const q2 = b[i2][l2-2]
        if (q1.color === q2.color && q1.number === q2.number) {
          flag = true
          b[i2] = b[i2].slice(0,-1)
          b[i2][l2-2].number += 1
        } 
      } 
    }
  }

  const cells = [];
  for (let i = 0; i < 6; i++) {
    let s = ''
    let f = b[i] 
    for (let j = 0; j < f.length; j++) {
      let d = f[j]
      cells.push({ row: 15-j, column: i+1, color: d.color, number: d.number, m: false })
      s += "," + d.number
    }
    console.log(s)
  }

  return cells
  
}





export const saveScore = (uid, score, puzzle, moves) =>  {
  const m = moves.join('')
  const url = getUrl()+`save_score.php?id=${uid}&score=${score}&puzzle=${puzzle}&moves=${m}`
  console.log("save score url ====================>>>>>>", url);
  fetch(url, { 
    headers: {}
  })
  .then(response => {
    return response.text(); // or response.text() if the response is not in JSON format
  })
  .catch(error => {
    console.error('fetch operation:', error); // Handle any errors
  });
}


export function initBlocks(seed) {
  const blocks = [
    { row: 15, column: 1, color: 1, number: 1, m: false },
    { row: 15, column: 2, color: 1, number: 1, m: false  },
    { row: 15, column: 3, color: 1, number: 1, m: false  },
    { row: 15, column: 4, color: 1, number: 1, m: false  },
    { row: 15, column: 5, color: 1, number: 2, m: false  },
    { row: 15, column: 6, color: 1, number: 2, m: false  },
    { row: 14, column: 1, color: 1, number: 2, m: false  },
    { row: 14, column: 2, color: 1, number: 2, m: false  },
    { row: 14, column: 3, color: 1, number: 3, m: false  },
    { row: 14, column: 4, color: 1, number: 4, m: false  },
    { row: 14, column: 5, color: 1, number: 4, m: false  },
    { row: 14, column: 6, color: 1, number: 6, m: false  },
    { row: 13, column: 1, color: 1, number: 7, m: false  },
    { row: 13, column: 2, color: 1, number: 8, m: false  },
    { row: 13, column: 3, color: 1, number: 9, m: false },
    { row: 13, column: 4, color: 2, number: 1, m: false  },
    { row: 13, column: 5, color: 2, number: 1, m: false  },
    { row: 13, column: 6, color: 2, number: 1, m: false  },
    { row: 12, column: 4, color: 2, number: 1, m: false  },
    { row: 12, column: 5, color: 2, number: 2, m: false  },
    { row: 12, column: 6, color: 2, number: 2, m: false  },
    { row: 12, column: 1, color: 2, number: 2, m: false  },
    { row: 12, column: 2, color: 2, number: 2, m: false  },
    { row: 12, column: 3, color: 2, number: 3, m: false   },
    { row: 11, column: 4, color: 2, number: 4, m: false   },
    { row: 11, column: 5, color: 2, number: 4, m: false   },
    { row: 11, column: 6, color: 2, number: 6, m: false   },
    { row: 11, column: 1, color: 2, number: 7, m: false   },
    { row: 11, column: 2, color: 2, number: 8, m: false   },
    { row: 11, column: 3, color: 2, number: 9, m: false  },
    // Add more blocks as needed
  ];

  var holdrand = seed; // Initial seed

  console.log("holdrand --------------------------------------", holdrand)


  // Function to generate the next random number
  function rand() {
    holdrand = (holdrand * 214013 + 2531011) & 0x7fffffff; // 0x7fffffff is 2^31 - 1
    return (holdrand >> 16) & 0x7fff; // Return upper 15 bits of holdrand
  }

  function randInRange(max) {
    return rand() % max;
  }

  const l = blocks.length
  for (let i = 0; i < 2103; i++) {
    let j = randInRange(l);
    let k = randInRange(l);
    let n = blocks[j].number
    let c = blocks[j].color
    blocks[j].number = blocks[k].number
    blocks[k].number = n
    
    blocks[j].color = blocks[k].color
    blocks[k].color = c
  }

  while (checkMerge(blocks)>0) {
    let index = mergeBlocks(blocks)
    blocks[index.add].number += 1
    blocks.splice(index.remove, 1)
    const holes = findHoles(blocks)
    if (holes.length>0) {
        holes.forEach(element => {
        let i = element.index
        let d = element.dist
        blocks[i].row += d
      });
    }
  }
  return blocks
}

function findHoles(b) {
  const rows = 15;
  const columns = 6;
  const array2D = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0));

  for (let i = 0; i < b.length; i++) {
    let r = b[i].row-1
    let c = b[i].column-1
    array2D[r][c] = i+1
  }

  const drops = [];
  for (let i = 0; i < 6; i++) {
    var h = 0
    for (let j = 14; j >=0; j--) {
      let k = array2D[j][i]
      if (k>0) {
        if (h>0) {
          drops.push({index:k-1, dist:h});
        }
      } else {
        h += 1
      }
    }
  }
  return drops
}
 
export function topBlock(blocks, column) {
  let minRowIndex = -1;
  let minRowValue = 100;
    
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].column === column && blocks[i].row < minRowValue) {
        minRowValue = blocks[i].row;
        minRowIndex = i;
    }
  }
  return minRowIndex;
}




export function initCells(b) {
  const columns = 6;
  const array2D = Array.from({ length: columns }, () => Array.from({ length: 6 }, () => 0));

  for (let i = 0; i < b.length; i++) {
    let r = 15-b[i].row
    let c = b[i].column-1
    array2D[c][r] = {color: b[i].color, number: b[i].number}
  }



  for (let i = 0; i < columns; i++) {
    for (let j = 5; j >=0; j--) {
      if (array2D[i][j]===0) {
        array2D[i].splice(j, 1)
      }
    }
  }

   return array2D
}



export function putBlock(blocks, column, index) {
  const b2 = blocks[index]

  if (b2.column===column) {
    return 0
  }

  const i = topBlock(blocks, column)
  if (i<0) {
    return 15
  }
  const b1 = blocks[i]
  return (b1.color === b2.color && b1.number >= b2.number) ?  b1.row-1 : 0  
}


function checkMerge(b) {
  for (let i = 0; i < b.length; i++) {
    for (let j = i+1; j < b.length; j++) {
      if (b[i].column === b[j].column && b[i].number === b[j].number && b[i].color === b[j].color) {
        if (Math.abs(b[i].row - b[j].row)===1) {
          return 1
        }
      }
    }
  }
  return 0
}


function mergeBlocks(b) {
  for (let i = 0; i < b.length; i++) {
    for (let j = i+1; j < b.length; j++) {
      if (b[i].column === b[j].column && b[i].number === b[j].number && b[i].color === b[j].color) {
        if (b[i].row === b[j].row + 1) {
          return { add:i, remove:j }
        }
        if (b[i].row === b[j].row - 1) {
          return { add:j, remove:i }
        }
      }
    }
  }
  return 0
}



