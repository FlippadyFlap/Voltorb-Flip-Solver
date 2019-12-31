window.onload = ()=>{
	closeErrorCallback()
}

function resetCallback(){

	let rows = document.getElementsByClassName('actualRow')
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++ ){
			putElementValue(rows[i].children[j], "")
		}
	}

	let rowsTotal = document.getElementsByClassName("row-total")
	Array.from(rowsTotal).forEach((item)=>{
		item.children[0].firstElementChild.firstElementChild.value = ""
		item.children[1].firstElementChild.firstElementChild.value = ""
	})

	let colsTotal = document.getElementsByClassName("col-total")
	Array.from(colsTotal).forEach((item)=>{
		item.children[0].firstElementChild.firstElementChild.value = ""
		item.children[1].firstElementChild.firstElementChild.value = ""
	})
}

function closeErrorCallback(){
	document.getElementById("error-box").style.display = "none"
}

function raiseError(errorMsg){
	e = document.getElementById("error-box")
	e.style.display = ""
	e.innerHTML = errorMsg + `<button onclick="closeErrorCallback()">X</button>`
}

function dropdownSetBomb(element){
	element.parentElement.previousElementSibling.value = String.fromCodePoint("0x1F4A3")
	element.parentElement.previousElementSibling.readOnly = true
}

function dropdownSetUnknown(element){
	element.parentElement.previousElementSibling.value = ""
	element.parentElement.previousElementSibling.readOnly = true
}

function dropdownSetValue(element){
	element.parentElement.previousElementSibling.value = ""
	element.parentElement.previousElementSibling.readOnly = false
	element.parentElement.previousElementSibling.focus()
}


function getBombRowsArray(){
	let rows = document.getElementsByClassName("row-total")
	let rowBombs = []
	Array.from(rows).forEach((item)=>{
		rowBombs.push(parseInt(item.children[1].firstElementChild.firstElementChild.value))
	})
	return rowBombs
}

function getBombColsArray(){
	let cols = document.getElementsByClassName("col-total")
	let colBombs = []
	Array.from(cols).forEach((item)=>{
		colBombs.push(parseInt(item.children[1].firstElementChild.firstElementChild.value))
	})
	return colBombs
}

function getValueColsArray(){
	let cols = document.getElementsByClassName("col-total")
	let colValues = []
	Array.from(cols).forEach((item)=>{
		colValues.push(parseInt(item.children[0].firstElementChild.firstElementChild.value))
	})
	return colValues
}

function getValueRowsArray(){
	let rows = document.getElementsByClassName("row-total")
	let rowValues = []
	Array.from(rows).forEach((item)=>{
		rowValues.push(parseInt(item.children[0].firstElementChild.firstElementChild.value))
	})
	return rowValues
}

function getElementValue(item){
	let value = item.firstElementChild.value

	switch (value){
		case '':
			return ''
			break
		case String.fromCodePoint('0x1F4A3'):
			return 'b'
		case String.fromCodePoint('0x2705'):
			return 's'
			break
		default:
			let temp = parseInt(value)
			if (temp != NaN){
				return temp
			}
			else{
				return ''
			}
	}
	return ''
}

function putElementValue(item, value){
	let element = item.firstElementChild
	switch (value){
		case '':
			element.value = ''
			break
		case 'b':
			element.value = String.fromCodePoint('0x1F4A3')
			break
		case "s":
			element.value = String.fromCodePoint('0x2705')
			break
		default:
			element.value = value
	}
}

function build2DGameBoard(){
	let game2DBoard = [[],[],[],[],[]]

	let rows = document.getElementsByClassName('actualRow')

	for(let i = 0; i < 5; i++){
		for(let j = 0; j < 5; j++ ){
			game2DBoard[i][j] = getElementValue(rows[i].children[j])
		}
	}
	return game2DBoard
}


function putGameBoard(gameBoard){
	let rows = document.getElementsByClassName('actualRow')

	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++ ){
			putElementValue(rows[i].children[j], gameBoard[i][j])
		}
	}
}

function checkRowBombTrivial(gameBoard, rowNum, rowBombs){
	let count = 0
	for(j = 0; j < 5; j++){
		if (gameBoard[rowNum][j] === "b"){
			count++
		}
	}
	if (count === rowBombs){
		for(j = 0; j < 5; j++){
			if (gameBoard[rowNum][j] === ""){
				gameBoard[rowNum][j] = "s"
			}
		}
	}
	return gameBoard
}

function checkRowValueTrivial(gameBoard, rowNum, rowValue){
	let count = 0
	for(j = 0; j < 5; j++){
		if (Number.isInteger(gameBoard[rowNum][j])){
			count+= gameBoard[rowNum][j]
		}
	}
	if (count === rowValue){
		for(j = 0; j < 5; j++){
			if (gameBoard[rowNum][j] === ""){
				gameBoard[rowNum][j] = "b"
			}
		}
	}
	return gameBoard
}

function checkColBombTrivial(gameBoard, colNum, colBombs){
	let count = 0
	for(j = 0; j < 5; j++){
		if (gameBoard[j][colNum] === "b"){
			count++
		}
	}
	if (count === colBombs){
		for(j = 0; j < 5; j++){
			if (gameBoard[j][colNum] === ""){
				gameBoard[j][colNum] = "s"
			}
		}
	}
	return gameBoard
}

function checkColValueTrivial(gameBoard, colNum, colValue){
	let count = 0
	for(j = 0; j < 5; j++){
		if (Number.isInteger(gameBoard[j][colNum])){
			count+= gameBoard[j][colNum]
		}
	}
	if (count === colValue){
		for(j = 0; j < 5; j++){
			if (gameBoard[j][colNum] === ""){
				gameBoard[j][colNum] = "b"
			}
		}
	}
	return gameBoard
}

function checkEquality(arr1, arr2){
	for(k = 0; k < 5; k++){
		for(j=0; j < 5; j++){
			if (arr1[k][j] != arr2[k][j]){
				return false
			}
		}
	}
	return true
}

function checkTrivialAll(gameBoardTrivial, colBombs, colValues, rowBombs, rowValues){
	

	do{
		var tempGameBoard = gameBoardTrivial.map((row)=>{
			return row.slice()
		})
		for(i = 0; i < 5; i++){		
			gameBoardTrivial = checkRowValueTrivial(gameBoardTrivial, i, rowValues[i])
			gameBoardTrivial = checkRowBombTrivial(gameBoardTrivial, i, rowBombs[i])
			gameBoardTrivial = checkColValueTrivial(gameBoardTrivial, i, colValues[i])
			gameBoardTrivial = checkColBombTrivial(gameBoardTrivial, i, colBombs[i])
		}
	} while (!checkEquality(gameBoardTrivial, tempGameBoard))
	return gameBoardTrivial
}

function checkForErrors(gameBoard, colBombs, colValues, rowBombs, rowValues){

	if (colBombs.includes(NaN)){
		return "Missing # of bombs in a column"
	}
	else if (rowBombs.includes(NaN)){
		return "Missing # of bombs in a row"
	}
	else if (colValues.includes(NaN)){
		return "Missing total value in a column"
	}
	else if (rowValues.includes(NaN)){
		return "Missing total value in a row"
	}
	
	for(i = 0; i < 5; i++){
		let valueColCount = 0
		let bombColCount = 0
		let valueRowCount = 0
		let bombRowCount = 0
		for(j = 0; j < 5; j++){
			if (gameBoard[i][j] === "b"){
				bombRowCount++
			}
			else if (parseInt(gameBoard[i][j]) != NaN){
				valueRowCount += gameBoard[i][j]
			}

			if (gameBoard[j][i] === "b"){
				bombColCount++
			}
			else if (parseInt(gameBoard[j][i]) != NaN){
				valueColCount += gameBoard[j][i]
			}
		}

		if(bombRowCount > rowBombs[i]){
			return "Too many bombs in row " + i
		}
		else if(bombColCount > colBombs[i]){
			return "Too many bombs in col " + i
		}
		else if(valueRowCount > rowValues[i]){
			return "Too high value in row " + i
		}
		else if(valueColCount > colValues[i]){
			return "Too high value in col " + i
		}
	}
	return false
}

function calculateCallback(){



	var colBombTotals= getBombColsArray()
	var rowBombTotals = getBombRowsArray()
	var colValueTotals = getValueColsArray()
	var rowValueTotals = getValueRowsArray()



	var topLevelGameBoard = build2DGameBoard()
	if((e = checkForErrors(topLevelGameBoard, colBombTotals, colValueTotals, rowBombTotals, rowValueTotals))){
		return raiseError(e)
	}
	// console.log(topLevelGameBoard)
	// console.log("colBombTotals")
	// console.log(colBombTotals)
	// console.log("rowBombTotals")
	// console.log(rowBombTotals)
	// console.log("colValueTotals")
	// console.log(colValueTotals)
	// console.log("rowValueTotals")
	// console.log(rowValueTotals)
	// console.log(topLevelGameBoard)

	topLevelGameBoard = checkTrivialAll(topLevelGameBoard, colBombTotals, colValueTotals, rowBombTotals, rowValueTotals)
	putGameBoard(topLevelGameBoard)
	// console.log(topLevelGameBoard)
}