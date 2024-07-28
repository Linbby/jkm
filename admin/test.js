async function as1(){
    console.log(111);
    await as2();
    console.log(222);
}

async function as2(){
    console.log(333);
    await as3();
    console.log(444);
}

async function as3(){
    console.log(555);
    console.log(666);
}
as1()
console.log('000');



// console.log(111);
// console.log(333);
// console.log(555);
// console.log(666);
// console.log(444);
// console.log('000');
// console.log(222);
// 



//     console.log(444);