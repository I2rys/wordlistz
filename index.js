//Dependencies
const BruteForceJS = require("bruteforcejs")
const ET = require("execution-time")()
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)
const WLMSP = Self_Args.slice(1).join(" ")

var WordListz_Data = {}
WordListz_Data.wordlists = ""
WordListz_Data.ismax = 0

//Main
if(WLMSP == ""){
    console.log(`node index.js <max_wordlists> <wordlists making starting point>
node index.js 1000 abcd`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log(`node index.js <max_wordlists> <wordlists making starting point>
node index.js 1000 abcd`)
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("max_wordlists is not an Int.")
    process.exit()
}

console.log("Generating, please wait.")
ET.start("apiCall")
BruteForceJS(WLMSP, word =>{
    if(WordListz_Data.ismax > Self_Args[0]){
        console.log(`${Self_Args[0]} successfully generated. Ended in just: ${ET.stop("apiCall").time.toFixed(2)} milliseconds`)
        Fs.writeFileSync("./output.txt", WordListz_Data.wordlists, "utf8")
        return true
    }

    if(WordListz_Data.wordlists.length == 0){
        WordListz_Data.wordlists = word
    }else{
        WordListz_Data.wordlists += `\n${word}`
    }

    WordListz_Data.ismax += 1
})
