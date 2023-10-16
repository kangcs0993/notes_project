let noteTitleId = document.getElementById("noteTitle")
let noteBodyId = document.getElementById("noteBody")
let noteTagsId = document.getElementById("noteTags")

let noteTitleValue
let noteBodyValue
let noteTagsValue
let noteTagsArr

let initNote = JSON.parse(localStorage.getItem("note"))

let initNoteObj = {}
let initNoteArr = []

for(let i = 0; i < initNote.length; i++){
    initNoteObj[i] = initNote[i]
}

class noteClass{
    constructor(title, body, tags, index){
        let noteDiv = document.createElement("div")

        let noteTitle = document.createElement("input")
        let noteBody = document.createElement("textarea")
        let noteTags = document.createElement("input")

        noteTitle.value = title
        noteBody.value = body
        noteTags.value = tags

        noteTitle.readOnly = true;
        noteBody.readOnly = true;
        noteTags.readOnly = true;

        noteTitle.setAttribute("class", "singleNoteTitle")
        noteBody.setAttribute("class", "singleNoteBody")
        noteTags.setAttribute("class", "singleNoteTags")

        noteDiv.appendChild(noteTitle)
        noteDiv.appendChild(noteBody)
        noteDiv.appendChild(noteTags)

        noteDiv.setAttribute("class", "singleNote")
        noteDiv.setAttribute("id", "singleNote" + index)

        return noteDiv
    }
}

class editNoteClass{
    constructor(index){
        let noteInfo = initNoteObj[index]

        let noteEditDiv = document.createElement("div")

        let noteTitleEdit = document.createElement("input")
        let noteBodyEdit = document.createElement("textarea")
        let noteTagsEdit = document.createElement("input")

        noteTitleEdit.setAttribute("class", "noteTitleEdit")
        noteBodyEdit.setAttribute("class", "noteBodyEdit")
        noteTagsEdit.setAttribute("class", "noteTagsEdit")

        noteTitleEdit.value = noteInfo.title
        noteBodyEdit.value = noteInfo.body
        noteTagsEdit.value = noteInfo.tags

        noteEditDiv.appendChild(noteTitleEdit)
        noteEditDiv.appendChild(noteBodyEdit)
        noteEditDiv.appendChild(noteTagsEdit)

        noteEditDiv.setAttribute("id", "noteEdit" + index)
        noteEditDiv.setAttribute("class", "noteEdit")

        return noteEditDiv
    }
}

function cancelEdit(index){
    let noteLi = document.createElement("li")

    let singleNoteDiv = new noteClass(initNote[index].title, initNote[index].body, initNote[index].tags, index)
    let buttonDiv = new noteButtonClass(index)

    noteLi.appendChild(singleNoteDiv)
    noteLi.appendChild(buttonDiv)

    noteLi.setAttribute("id", "note"+index)

    document.getElementById("editNote" + index).replaceWith(noteLi)
}

function saveEdit(index){
    let editNote = document.getElementById("editNote" + index).firstChild
    editNote = editNote.childNodes

    let editTitle = editNote[0].value
    let editBody = editNote[1].value
    let editTags = editNote[2].value

    let totalTags = editTags.split(/ |,/).filter((word) => word.length > 0).join(", ")

    initNote[index].title = editTitle
    initNote[index].body = editBody
    initNote[index].tags = totalTags

    let noteLi = document.createElement("li")

    let singleNoteDiv = new noteClass(initNote[index].title, initNote[index].body, initNote[index].tags, index)
    let buttonDiv = new noteButtonClass(index)

    noteLi.appendChild(singleNoteDiv)
    noteLi.appendChild(buttonDiv)

    noteLi.setAttribute("id", "note"+index)

    document.getElementById("editNote" + index).replaceWith(noteLi)
}

class editButtonClass{
    constructor(index){
        let editButtonDiv = document.createElement("div")

        let cancelEditButton = document.createElement("button")
        let saveEditButton = document.createElement("button")

        cancelEditButton.innerHTML = "cancel edit"
        saveEditButton.innerHTML = "save edit"

        cancelEditButton.setAttribute("class", "cancelEditButton")
        saveEditButton.setAttribute("class", "saveEditButton")

        cancelEditButton.addEventListener("click", function(){
            cancelEdit(index)
        })
        saveEditButton.addEventListener("click", function(){
            saveEdit(index)
        })

        editButtonDiv.appendChild(cancelEditButton)
        editButtonDiv.appendChild(saveEditButton)

        editButtonDiv.setAttribute("class", "editButtonDiv")

        return editButtonDiv
    }
}

function editSingleNote(index){
    let noteLi = document.createElement("li")

    let editNote = new editNoteClass(index)
    let editButton = new editButtonClass(index)

    noteLi.appendChild(editNote)
    noteLi.appendChild(editButton)

    noteLi.setAttribute("id", "editNote" + index)

    document.getElementById("note" + index).replaceWith(noteLi)
}

function deleteSingleNote(index){
    document.getElementById("note"+index).remove()
    delete initNoteObj[index]

    if(Object.keys(initNoteObj).length === 0){
        localStorage.clear("note")
    }else{
        for(let note in initNoteObj){
            initNoteArr.push(initNoteObj[note])
        }
        localStorage.setItem("note", JSON.stringify(initNoteArr))
    }
}

class noteButtonClass{
    constructor(index){
        let buttonDiv = document.createElement("div")
    
        let editButton = document.createElement("button")
        let deleteButton = document.createElement("button")

        editButton.innerHTML = "edit note"
        deleteButton.innerHTML = "delete note"

        editButton.setAttribute("class", "editButton")
        deleteButton.setAttribute("class", "deleteButton")

        editButton.addEventListener("click", function(){
            editSingleNote(index)
        })
        deleteButton.addEventListener("click", function(){
            deleteSingleNote(index)
        })

        buttonDiv.appendChild(editButton)
        buttonDiv.appendChild(deleteButton)

        buttonDiv.setAttribute("class", "buttonDiv")

        return buttonDiv
    }
}

for(let i = 0; i < initNote.length; i++){
    let noteLi = document.createElement("li")

    let singleNoteDiv = new noteClass(initNote[i].title, initNote[i].body, initNote[i].tags, i)
    let buttonDiv = new noteButtonClass(i)

    noteLi.appendChild(singleNoteDiv)
    noteLi.appendChild(buttonDiv)

    noteLi.setAttribute("id", "note"+i)

    document.getElementById("notesList").appendChild(noteLi)
}

function searchFunction(event){
    let searchTerm = event.target.value.toLowerCase()
    let noteList = document.querySelectorAll("#notesList li")

    for(let note of noteList){
        let noteBody = note.firstChild

        let noteTags = (JSON.stringify(noteBody.lastChild.value)).toLowerCase()

        if(noteTags.includes(searchTerm)){
            note.style.display = "inline-block"
        }else{
            note.style.display = "none"
        }
    }
}

document.getElementById("tagSearch").addEventListener("input", function(event){
    searchFunction(event)
})

function deleteNotes(){
    let noteList = document.getElementById("notesList")
    while(noteList.firstChild){
        noteList.lastChild.remove()
    }

    localStorage.removeItem("note")
}