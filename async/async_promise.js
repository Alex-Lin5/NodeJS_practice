// cannot get result simultaneously within async block
console.log(__filename);
console.log('before');
async function getQuestion(){
  const id = await getID();
  console.log('ID: ', id);
  const brief = await getBrief(id);
  console.log(`Name: ${brief.name}, 
    done: ${brief.done}, Date: ${brief.date}`);
  const detail = await getDetail(id);
  console.log(`Description: ${detail.description}, 
    Answer: ${detail.answer}`);
}
getQuestion();
console.log('after');

function getID(){
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve({
        id: 3
      });
    }, 2000);
  });
}
function getBrief(id){
  return new Promise((resolve, reject)=>{
    if (id<0)
      reject(new Error('ID < 0.'))
    setTimeout(()=>{
      resolve({
        name: 'sum of two number',
        done: true,
        date: 'wednesday'
      });
    }, 2000);
  });
}
function getDetail(id){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve({
        description: 'sum up two number',
        answer: 'none'
      });
    }, 2000);
  });
}