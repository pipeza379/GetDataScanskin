function genID(acronym,count) {
    let id = acronym
    count=count.toString()
    if (count.length===1)
        id +=`00${count}`
    else if(count.length===2)
        id +=`0${count}`
    else if(count.length===3)
        id +=`${count}`
    return (id)
}
module.exports = genID