
console.log(__filename);
console.log('before');
getID(id => {
  console.log('ID: ', id);
  getBrief(id, brief =>{
    console.log(`Name: ${brief.name}, 
      done: ${brief.done}, Date: ${brief.date}`);
  });
  getDetail(id, detail => {
    console.log(`Description: ${detail.description}, 
      Answer: ${detail.answer}`);
  });
});
console.log('after');

function getID(callback){
  setTimeout(()=>{
    callback({
      id: 3
    });
  }, 2000);
  
}
function getBrief(id, callback){
  if (id<0)
    console.log(new Error('ID < 0.'));
  setTimeout(()=>{
    callback({
      name: 'sum of two number',
      done: true,
      date: 'wednesday'
    });
  }, 2000);
}
function getDetail(id, callback){
  setTimeout(()=>{
    callback({
      description: 'sum up two number',
      answer: 'none'
    });
  }, 2000);
}