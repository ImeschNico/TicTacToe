/*die cells in der Konstante celss abspeichern*/
const cells = document.querySelectorAll('.cell');

/*Wechsel zwischen Spieler*/
let currentPlayer = 'X';                            //Startspieler ist X

/*Funktion für KI*/
function makeAIMove(){
    const emptyCells = [...cells].filter(cell => cell.textContent === ''); //Array von Zellen erstellen und nach leeren suchen
    
    /*Wenn keine Züge mehr möglich sind amcht die KI nichts*/
    if (emptyCells.length === 0) return; 

    /*wähle eine zufällig leere Zelle*/
    const randomIndex = Math.floor(Math.random()* emptyCells.length);   //liefert eine Zahl zwischen 1 und 0 und * mit leeren Zellen
    const chosenCell = emptyCells[randomIndex];                         //Math.floor = runden und gültigen Array-Index erzeugen


    /*KI setzt 'O' in die leere Zelle*/
    chosenCell.textContent = 'O';
    chosenCell.classList.add('player-o');        //Für CSS Klasse
 
    /*Überprüfung ob KI gewonnen hat*/
    if (checkWinner()){
    alert('O gewinnt');
    }
 
    /*Prüfung ob Untentschieden*/
    if (checkDraw()){
    alert('Unentschieden');
    }
    /*Wechsel zu SPieler*/
    currentPlayer = 'X';
}










/*Zellen mit click Listener versehen*/
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(cell.textContent === ''){                 //prüft ob zelle leer ist
            cell.textContent = currentPlayer;        //setzt Zeichen
            
            /*Klasse aktueller Spieler hinzufügen*/
            cell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');

            const winner = checkWinner();
            if (checkWinner()){
                alert(currentPlayer +" Gewinnt!");
                return;
            }
            if (checkDraw()){
                alert("Unentschieden");
            }
            currentPlayer =(currentPlayer ==='X') ? 'O' : 'X'; //tenäre Operator wechselt von X zu O

            //Wenn die KI dran ist
            if (currentPlayer === 'O'){
                setTimeout(() => {
                makeAIMove();
            }, 500);
        }
        }
    });
});

/*Spielstatus überprüfen*/
function checkWinner(){
    const winningCombinations=[
        [0,1,2],                    //verschiedene Gewinnreihen
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ];

    for (let combo of winningCombinations){         //Druch alle Kombinationen durchlaufen
        const [a,b,c] = combo;
        //Prüfen ob Zellen den gleichen Ihnalt haben
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent){
            return cells[a].textContent; //Gibt Gewinner aus 
        }
     }
    return null; // kein Gewinner
}

/*Unentschieden prüfen*/
function checkDraw(){
    return [... cells].every(cell => cell.textContent !== '');  //prüft alle Zellen ob ausgefüllt, wenn true = Unentschieden

}

/*Reset-Button*/
document.getElementById('resetButton').addEventListener('click',() =>{
    cells.forEach(cell =>{      
        cell.textContent = '';  //leert alle Zellen
});
    currentPlayer = 'X';        //setzt Spieler auf X zurück
});

