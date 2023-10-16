let noteTitleId = document.getElementById("noteTitle")
let noteBodyId = document.getElementById("noteBody")
let noteTagsId = document.getElementById("noteTags")

let noteArr = []

class noteClass{
    constructor(title, body, tags){
        this.title = title
        this.body = body
        this.tags = tags
    }
}

function clearNote(){
    noteTitleId.value = ""
    noteBodyId.value = ""
    noteTagsId.value = ""
}

function addNote(){
    let totalTags = noteTagsId.value.split(/ |,/).filter((word) => word.length > 0).join(", ")

    let noteObj = new noteClass(noteTitleId.value, noteBodyId.value, totalTags)

    if(localStorage.getItem("note")){
        noteArr = JSON.parse(localStorage.getItem("note"))
        noteArr.push(noteObj)
        localStorage.setItem("note", JSON.stringify(noteArr))
    }else{
        noteArr.push(noteObj)
        localStorage.setItem("note", JSON.stringify(noteArr))
    }
}