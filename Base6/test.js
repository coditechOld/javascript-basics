function readFile(filename,encoding,callback){
    setTimeout(callback,1000)
}

readFile('blah','utf8',function(){
    console.log('1')
})

console.log('2')