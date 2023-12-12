let selectedValue = null;
var gridArr = [];
var errorCount=0;
let mistakecount = document.getElementById('mistakecount');
let insert_number = document.getElementById('insertNumber')
let main = document.getElementById('main')
let reset = document.getElementById("reset")
// window.onload = function(){
//     creatingTiles()
//     insertingRandomValues()
//     removeGridDuplicates()
//     removeingRowColDup()
//     numbers()
// }
window.onload = creatingTiles();
window.onload = insertingRandomValues();
window.onload = removeGridDuplicates();
window.onload = removeingRowColDup();
window.onload = numbers();
reset.addEventListener('click',()=>{
    window.location.reload();


})



console.log(insert_number)
// Creating Tiles for suduko
function creatingTiles()
{
    for(let i = 0;i<9;i++)
    {
        for(let j = 0;j<9;j++)
    {
        var div = document.createElement('div');
        main.appendChild(div)
        div.classList.add('tiles'); 
        if((i>=0 && i<=2)&&(j>=0 && j<=2))
        {
            div.classList.add('grid1');
        }
        if((i>=0 && i<=2)&&(j>2 && j<=5))
        {
            div.classList.add('grid2');
        }
        if((i>=0 && i<=2)&&(j>5 && j<=8))
        {
            div.classList.add('grid3');
        }
        if((i>2 && i<=5)&&(j>=0 && j<=2))
        {
            div.classList.add('grid4');
        }
        if((i>2 && i<=5)&&(j>2 && j<=5))
        {
            div.classList.add('grid5');
        }
        if((i>2 && i<=5)&&(j>5 && j<=8))
        {
            div.classList.add('grid6');
        }
        if((i>5 && i<=8)&&(j>=0 && j<=2))
        {
            div.classList.add('grid7');
        }
        if((i>5 && i<=8)&&(j>2 && j<=5))
        {
            div.classList.add('grid8');
        }
        if((i>5 && i<=8)&&(j>5 && j<=8))
        {
            div.classList.add('grid9');
        }
        div.setAttribute('row',i)
        div.setAttribute('col',j)
        div.classList.add('row'+i)
        div.classList.add('col'+j);
    }
    }
}
// console.log(main)


//  Extracting Corners Elements of an array 



function insertingRandomValues()
{
    let tiles = Array.from(main.children)
    for(let i = 0;i<tiles.length;i++)
    {
    let randomIndex = randomInd(tiles.length);
    let randomValue = randVal();
    if(typeof tiles[randomIndex]=='undefined')
    {
        continue;
    }
    else
    {
        tiles[randomIndex].innerText=randomValue;
    }  
}   
}

// Generating Random Values for tiles

function randVal()
{
    return Math.ceil(Math.random(1,9)*9);
}

// Generating Random index for random values

function randomInd(tilesLength)
{
   return Math.ceil(Math.random(0,1)*tilesLength);
}

// Extracting Grids from suduko
function removeGridDuplicates()
{
for(let i = 1;i<=9;i++)
{
    var grid = document.querySelectorAll('.grid'+i)
    gridArr.push([...grid])
}
for(let i=0;i<gridArr.length;i++)
    {
        for(let j = 0;j<gridArr[i].length;j++)
        {
            var item=gridArr[i][j]
            // console.log(item.innerText)
            var count=0
            for(let k=0;k<9;k++)
            {
                if(item.innerText!=' ')
                {
                    if((gridArr[i][k].innerText==item.innerText))
                    {
                        count++
                        if(count>=2)
                        {
                            gridArr[i][k].innerText=' ';
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
            }
        }
    }
}
       
// Removing duplicate Elements from row and column

function removeingRowColDup()
{
var allDiv = main.children;
for(let i=0;i<allDiv.length;i++)
{
    if(allDiv[i].innerText!='')
    {
        var item = allDiv[i]
        var row = item.getAttribute('row')
        var col = item.getAttribute('col');
        var rowArr = document.getElementsByClassName('row'+row);
        var colArr = document.getElementsByClassName('col'+col);
        var countrow=0;
        var countcol=0;
        for(let i =0;i<rowArr.length;i++)
        {
            if(item.innerText==rowArr[i].innerText)
            {
                countrow++;
                if(countrow>=2)
                {
                    rowArr[i].innerText=' ';
                }
            }
        }
        for(let i =0;i<colArr.length;i++)
        {
            if(item.innerText==colArr[i].innerText)
            {
                countcol++;
                if(countcol>=2)
                {
                    colArr[i].innerText=' ';
                }
            }
        }
     }        
 }
}
let divElements = main.children
for(i=0;i<divElements.length;i++)
{
    if(divElements[i].innerText=='')
    {
        divElements[i].classList.add('inputField')
        // console.log(divElements[i])
        divElements[i].addEventListener('click',selectedElem)
    }
}
function numbers() {
    for (let i = 1; i <= 9; i++) {
        const number_div = document.createElement('div');
        number_div.classList.add('num');
        insert_number.appendChild(number_div)
        number_div.innerText = i;
        number_div.addEventListener('click', mapped_value)
    }
}


function selectedElem(e)
{
    if(selectedValue!=null)
    {
    selectedValue.classList.remove('inputSelected')
    }
    selectedValue = e.target
    this.classList.add('inputSelected')
}
function mapped_value()
{
    selectedValue.innerText = this.innerText;
    let row = selectedValue.getAttribute('row')
    let col = selectedValue.getAttribute('col');
    let inputValue = selectedValue.innerText;
    if(validForGrid(row,col,inputValue))
    {
        if(validForRowCol(row,col,inputValue))
        {
            selectedValue.classList.remove('wrong')
            selectedValue.classList.add('correct');
            if(winingCondition())
            {
                alert("Congratulations you won the game")
            }
        }
        else
        {
            errorCount++;
            mistakecount.innerText=errorCount+`/3`
            selectedValue.classList.add('wrong')
            if(errorCount>2)
            {
                alert('You lost ')
            }
        }
    }
    else
    {
        errorCount++;
        mistakecount.innerText=errorCount+`/3`
        selectedValue.classList.add('wrong')
        if(errorCount>2)
        {
            alert('You lost')
        }
    }

}

function validForRowCol(row,col,inputValue)
{
    var count = 0;
    let rowArr = document.getElementsByClassName('row'+row)
    let colArr = document.getElementsByClassName('col'+col);
    for(let i =0;i<9;i++)
    {
        if(rowArr[i].innerText==inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
var countCol=0;
for(let i =0;i<9;i++)
{
    if(colArr[i].innerText==inputValue)
    {
        countCol++;
        if(countCol>=2)
        {
            return false;
        }
    }
}
return true;
}


function validForGrid(row,col,inputValue)
{
  let count = 0;
  if((row>=0 && row<=2)&&(col>=0 && col<=2))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[0][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>=0 && row<=2)&&(col>2 && col<=5))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[1][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>=0 && row<=2)&&(col>5 && col<=8))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[2][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>2 && row<=5)&&(col>=0 && col<=2))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[3][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>2 && row<=5)&&(col>2 && col<=5))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[4][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>2 && row<=5)&&(col>5 && col<=8))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[5][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>5 && row<=8)&&(col>=0 && col<=2))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[6][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else if((row>5 && row<=8)&&(col>2 && col<=5))
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[7][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true;
  }
  else
  {
    for(let i=0;i<gridArr[0].length;i++)
    {
        if(gridArr[8][i].innerText == inputValue)
        {
            count++;
            if(count>=2)
            {
                return false;
            }
        }
    }
    return true; 
  }
}

function winingCondition()
{
    for(let i=0;i<allDiv.length;i++)
    {
        if(allDiv[i].innertext=='')
        {
            return false;
        }
    }
    return true;
}




