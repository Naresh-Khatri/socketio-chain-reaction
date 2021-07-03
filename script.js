cellContainer = document.querySelector(".cell-container")



let turn = 0

for(let i=1; i<=100; i++){

	cell = document.createElement("button")
	// cell.innerHTML = i

	cell.classList.add('cell', `cell${i}`)

	cell.addEventListener('click', cellClicked)

	cellContainer.appendChild(cell)

}



function cellClicked(e){

	clickednum = getNum(e.target.classList[1])

	turn++;

	clickedCellHTML = document.querySelector(`.cell${clickednum}`).innerHTML

	if(clickedCellHTML.length >=1 && [1,10,91,100].includes(clickednum)){

		explode(clickednum)

	}

	else if(clickedCellHTML.length>=2 && 

			(clickednum<=10 || clickednum>=91 ||

			(clickednum-1)%10==0 || clickednum%10==0)){

		explode(clickednum)

	}

	else if (clickedCellHTML.length>=3){

		explode(clickednum)

	}

	else{

		markCell(clickednum)

	}



}



function markCell(num){

	cell = document.querySelector(`.cell${num}`)

	cell.innerHTML += `${turn%2==0?'O':'*'}`

}



function getNum(numStr){

	num = ''

	for(let i=0; i<numStr.length; i++){

		if(Number.isInteger(Number.parseInt(numStr[i]))){

 			num+=numStr[i]

		}

	}

 	return Number.parseInt(num)

}



// async function explode(index){

// 	await sleep(500)



// }

async function explode(index){

	await sleep(500)



	expType = getExpType(index)

	console.log(`explode type: ${expType}`)



	//get explosion type from upper, lower, right, left...etc

	



	//apply explosion wrt its type

	if(expType==`U`){

		console.log(`upper`)

		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index-1,index+1,index+10])



		//apply recursion to the receiving indices

		console.log(document.querySelector(`.cell${index+1}`).innerHTML.length)

		if(document.querySelector(`.cell${index}`).innerHTML.length>=3)	explode(index)

		if(document.querySelector(`.cell${index+1}`).innerHTML.length>=3) explode(index+1)

		if(document.querySelector(`.cell${index-1}`).innerHTML.length>=3) explode(index-1)

		if(document.querySelector(`.cell${index+10}`).innerHTML.length>=4) explode(index+10)

	}

	else if(expType==`R`){

		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index-1,index-10,index+10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=3)	explode(index)

		if(document.querySelector(`.cell${index-1}`).innerHTML.length>=4) explode(index-1)

		if(document.querySelector(`.cell${index-10}`).innerHTML.length>=3) explode(index-10)

		if(document.querySelector(`.cell${index+10}`).innerHTML.length>=3) explode(index+10)

		console.log(`right`)

	}

	else if(expType==`L`){



		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index+1,index-10,index+10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=3)	explode(index)

		if(document.querySelector(`.cell${index+1}`).innerHTML.length>=4) explode(index+1)

		if(document.querySelector(`.cell${index-10}`).innerHTML.length>=3) explode(index-10)

		if(document.querySelector(`.cell${index+10}`).innerHTML.length>=3) explode(index+10)

		

		console.log(`left`)

	}

	else if(expType==`B`){



		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index+1,index-1,index-10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=3)	explode(index)

		if(document.querySelector(`.cell${index+1}`).innerHTML.length>=3) explode(index+1)

		if(document.querySelector(`.cell${index-1}`).innerHTML.length>=3) explode(index-1)

		if(document.querySelector(`.cell${index-10}`).innerHTML.length>=4) explode(index-10)

	

		console.log(`bottom`)

	}

	else if(expType==`UL`){

		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index+1,index+10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=2)	explode(index)

		if(document.querySelector(`.cell${index+1}`).innerHTML.length>=3)	explode(index+1)

		if(document.querySelector(`.cell${index+10}`).innerHTML.length>=3) explode(index+10)



	}

	else if(expType==`UR`){

		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index-1,index+10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=2)	explode(index)

		if(document.querySelector(`.cell${index-1}`).innerHTML.length>=3)	explode(index-1)

		if(document.querySelector(`.cell${index+10}`).innerHTML.length>=3) explode(index+10)



	}

	else if(expType==`BL`){

		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index+1,index-10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=2)	explode(index)

		if(document.querySelector(`.cell${index+1}`).innerHTML.length>=3)	explode(index+1)

		if(document.querySelector(`.cell${index-10}`).innerHTML.length>=3) explode(index-10)



	}

	else if(expType==`BR`){

		document.querySelector(`.cell${index}`).innerHTML = ``

		appendMarkers([index-1,index-10])



		if(document.querySelector(`.cell${index}`).innerHTML.length>=2)	explode(index)

		if(document.querySelector(`.cell${index-1}`).innerHTML.length>=3)	explode(index-1)

		if(document.querySelector(`.cell${index-10}`).innerHTML.length>=3) explode(index-10)



	}



	else{

		document.querySelector(`.cell${index}`).innerHTML = ``

		document.querySelector(`.cell${index-1}`).innerHTML += `O`

		document.querySelector(`.cell${index+1}`).innerHTML += `O`

		document.querySelector(`.cell${index-10}`).innerHTML += `O`

		document.querySelector(`.cell${index+10}`).innerHTML += `O`

		

		if(document.querySelector(`.cell${index}`).innerHTML.length>=4)	explode(index)

		if(document.querySelector(`.cell${index-1}`).innerHTML.length>=4)	explode(index-1)

		if(document.querySelector(`.cell${index-10}`).innerHTML.length>=4) explode(index-10)

		if(document.querySelector(`.cell${index+1}`).innerHTML.length>=4) explode(index+1)

		if(document.querySelector(`.cell${index+10}`).innerHTML.length>=4) explode(index+10)

		console.log(`lower`)



	}

	console.log(`exploded`)

}

function getExpType(index){

	if(index==1)

		expType=`UL`

	else if(index==10)

		expType=`UR`

	else if(index==91)

		expType=`BL`

	else if(index==100)

		expType=`BR`



	else if(index<=10)

		expType=`U`

	else if(index>=90)

		expType=`B`

	else if(index%10==0)

		expType=`R`

	else if((index-1)%10==0)

		expType=`L`



	else

		expType=``



	return expType

}

function sleep(ms){

	return new Promise((resolve, reject)=>{

		setTimeout(()=>{resolve()},ms)

	})

}

function appendMarkers(indexList){

	indexList.forEach(index=>{

		document.querySelector(`.cell${index}`).innerHTML += `${turn%2==0?'O':'*'}`

	})

}
