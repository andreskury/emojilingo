export const getRandom = ({collection, amount=10}) =>{
    const length = collection.length
    let collected = []
    let arr = []
    while(arr.length < amount){
        let r = Math.floor(Math.random() * length)
        if(arr.indexOf(r) === -1) {
            arr.push(r)
            collected.push(collection[r])
        }
    }
    return collected;
}