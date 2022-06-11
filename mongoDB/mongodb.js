const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/firstDB')
  .then(() => console.log('Conneted to MongoDB.'))
  .catch(err => console.error('Could not connect to MongoDB.', err));

const questionSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    maxlength: 255,
    validate: {
      validator: function(v) {
        return v>0;
      },
      message: 'ID should be greater than zero.'
    }
    // match: //
  },
  name: { type: String, required: true},
  done: { type: Boolean, default: false},
  date: { type: Date, default: Date.now},
  description: String,
  answer: String
});
const Question = mongoose.model('Question', questionSchema);
const q1 = new Question({
  id: 3,
  name: 'sum up',
  done: true,
  description: 'sum up two number',
  answer: 'no for now'
})
const q2 = new Question({
  id: 5,
  name: 'sort up',
  done: true,
  description: 'sort up two number',
  answer: 'no for now'
})
async function getQuestions(){
  const pageNum = 3;
  const pageSize = 10;
  // /question?pageNum=3&pageSize=10
  const qFind = await Question
    .find()
    // .find({id: {$gt: 3}})
    // .find({answer: /.*no.*/})
    // .and([{done: true}, {name: /up$/i}]) // case insensitive
    // .limit(10)
    // .sort({id: -1})
    // // .select({id: 1, name: 1})
    // .count()
  console.log(qFind);  
  
}
async function updateQuestion(id){
  // query-first update
  // const question = await Question.findById(id);
  // if (!question) return;
  // question.done = false;
  // question.set({
  //   name: 'sum up two number',
  //   answer: 'no right now.'
  // });
  // await question.save();

  // update-first
  const result = await Question.update({ id: id}, {
    $set: {
      done: true,
      answer: 'no.'
    }
  });
  console.log(result);
}
async function deleteQuestion(id){
  const result = await Question.deleteOne({ id: id});
  console.log(result);
}
try{
  // q1.save(); // id=3
  // q2.save();
} catch (ex) {
    for (field in ex.errors)
      console.log(ex.errors[field]);
}

getQuestions();
// updateQuestion('62a2614ffd9a02eb9e8e2617');
// updateQuestion(3);
// deleteQuestion(3);
