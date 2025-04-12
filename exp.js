const result = {
    data: { id: 1, name: 'Rubbal' }
}

let abc = false;
if (result.data.length > 0) {
    abc = true;
}

console.log(Object.keys(result.data).length);