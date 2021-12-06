const cells = document.querySelectorAll('td'),
    table = document.querySelector('table'),
    movePlayer = document.getElementById('move-player'),
    countWinX = document.getElementById('count-win-X'),
    countWinO = document.getElementById('count-win-O'),
    countDraw = document.getElementById('count-draw'),
    info = document.getElementById('info'),
    button = document.querySelector('button'),
    arrWin = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

let arrCheckX = [], arrCheckO = [];
let newEl = document.createElement('p');

table.addEventListener('click', go);

function go (event) {
    if(event.target.classList.contains('X') || event.target.classList.contains('O')) {
        return;
    }
    else {
        event.target.classList.add(movePlayer.textContent);
        for (let i=0; i<cells.length; i++) {
            if(event.target == cells[i]) {
                if (movePlayer.textContent == 'X') {
                    movePlayer.textContent = 'O';
                    event.target.textContent = 'X';
                    arrCheckX.push(i);
                }
                else  {
                    movePlayer.textContent = 'X';
                    event.target.textContent = 'O';
                    arrCheckO.push(i);
                }        
            }
        }   
    }
    check();
}

function check () {
    for(let i=0; i<arrWin.length; i++) {
        let winArrX = [], winArrO = [];
        for(let j=0; j<3; j++) {

            if (arrCheckX.indexOf(arrWin[i][j]) != -1) {
                winArrX.push(arrWin[i][j]);
                if(winArrX.length == 3) {
                    countWinX.textContent = +countWinX.textContent+1;
                    newEl.innerHTML = 'Выиграл X!';
                    info.after(newEl);
                    info.hidden = true;
                    newEl.hidden = false;
                    table.removeEventListener('click', go);
                    return;
                }
            }
            
            if (arrCheckO.indexOf(arrWin[i][j]) != -1) {
                winArrO.push(arrWin[i][j]);
                if(winArrO.length == 3) {
                    countWinO.textContent = +countWinO.textContent+1;
                    newEl.innerHTML = 'Выиграл O!';
                    info.after(newEl);
                    info.hidden = true;
                    newEl.hidden = false;
                    table.removeEventListener('click', go);
                    return;
                }
            }

        }
    }

    if((arrCheckO.length+arrCheckX.length) == 9) {
        countDraw.textContent = +countDraw.textContent+1;
        newEl.innerHTML = 'Ничья!';
        info.after(newEl);
        info.hidden = true;
        newEl.hidden = false;
        table.removeEventListener('click', go);
    }
    
}

button.addEventListener('click', function () {
    arrCheckX.length = 0;
    arrCheckO.length = 0;
    table.addEventListener('click', go);
    for (const cell of cells) {
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.textContent = '';
    }
    info.hidden = false;
    newEl.hidden = true;
});