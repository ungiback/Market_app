
export default function New_arr(arr) {
    let new_arrr = []
    for (var i = 0; i < arr.length; i+=2) {
        new_arrr.push(arr.slice(i,i+2))
    }
    return new_arrr
}
