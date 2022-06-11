const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/firstDB')
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('could not connect to MongoDB.', err)
);

const Question = mongoose.model('Question', new mongoose.Schema({
  id: Number,
  brief: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brief'
  },
  detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detail'
  }
}));
const Brief = mongoose.model('Brief', new mongoose.Schema({
  name: String,
  date: String,
  done: Boolean
}));
const Detail = mongoose.model('Detail', new mongoose.Schema({
  description: String,
  answer: String
}));

function creatBrief(name, date, done){
  const brief = new Brief({
    name,
    date,
    done
  });
  const result = brief.save();
  console.log('Brief ', result);
  return brief;
}
function createDetail(description, answer){
  const detail = new Detail({
    description,
    answer
  });
  const result = detail.save();
  console.log('Detail ', result);
  return detail;
}
function createQuestion(id, brief, detail){
  const question = new Question({
    id,
    brief,
    detail
  });
  const result = question.save();
  console.log('question added ', result);
}
function listQuestions() {
  const questions = Question
    .find()
    .select('id', 'brief');
  console.log(questions);
}
async function run(){
  // const brief = await creatBrief('sum up', 'Wed', true);
  // const detail = await createDetail('sum up two number', 'none.');
  // createQuestion(6, brief, detail);

  const brief = await Brief.findOne({name: 'sum up'});
  const detail = await Detail.findOne({description: /.*sum.*/});
  createQuestion(8, brief, detail._id);
}
run();
