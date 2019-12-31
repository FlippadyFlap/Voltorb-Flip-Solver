function buildKeys(max, zeroes){
	let array = []
	for(i = 0; i < zeroes; i++){
		array.push(0)
	}
	let values = Array(max).fill(1).map((x,y)=> x + y)
	return values.concat(array)
}

function sum(array){
	a = 0
	return array.forEach((item)=>{
		a+=item
	})
}

function permute(trackingArray, targetLength, targetSum, targetBombs, countBombs){
	if (targetLength === trackingArray.length-1){
		console.log("targetSum-sum(trackingArray)")
		console.log(targetSum-sum(trackingArray))
		console.log("Final Array")
		console.log(trackingArray.concat([targetSum-sum(trackingArray)]))
		console.log()
		return trackingArray.concat([targetSum-sum(trackingArray)])
	}
	let cumulativeArray = []
	let values = buildKeys(targetSum - sum(trackingArray) - (targetLength - trackingArray.length - 1 - targetBombs-countBombs), targetBombs-countBombs)
	console.log("values")
	console.log(values)
	values.forEach((value)=>{
	 	let permuteArray  = []
	 	if (value === 0){
	 		permuteArray = permute(trackingArray.concat([value]), targetLength, targetSum, targetBombs, countBombs+1)
	 	}
	 	else{
	 		permuteArray = permute(trackingArray.concat([value]), targetLength, targetSum, targetBombs, countBombs)
	 	}
	 	if (sum(permuteArray) === targetSum){
	 		cumulativeArray.push(permuteArray)
	 	}

	 })
	 return cumulativeArray


}