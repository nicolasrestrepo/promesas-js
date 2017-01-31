var fs = require('fs')
// esto no se debe hacer ya que caeriamos en el callback Hell, donde si tenemos mas callbacks el codigo se haria insostenible y no podriamos hacerle mantenimiento
// fs.readFile('./lorem.txt', function(err, content){
// 	fs.writeFile('cantidad.txt', content.length, function(err){
// 		console.log(content.length)
// 	})
// })

//implementaremos de nuevo el codigo usando Promises

function readFile(name){
 return  new Promise (function (resolve, reject){
 	fs.readFile(name, function(err, content){
 		if (err){
 		return	reject(err)
 		}
 		resolve(content)	
 	})
 })
}


function writeFile(name, content){
	return new Promise (function(resolve, reject){
		fs.writeFile(name, content, function(err){
			if(err){
				reject(err)
			}
			resolve()
		})
	})
}

//VAmos a ver como funciona el Promise.all
Promise.all([
	readFile('./lorem.txt'),
	readFile('./cantidad.txt'),
	readFile('./index.js')
	]).then(responses => console.log(responses.length))
//

readFile('./lorem.txt')
.then(content => writeFile('./cantidad.txt', content.length))
.catch(err => console.log('Hubo un error: ' + err))

