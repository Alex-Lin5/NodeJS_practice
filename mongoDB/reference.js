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
  // console.log('Brief ', result);
  return brief;
}
function createDetail(description, answer){
  const detail = new Detail({
    description,
    answer
  });
  const result = detail.save();
  // console.log('Detail ', result);
  return detail;
}
function createQuestion(id, brief, detail){
  const question = new Question({
    id,
    brief,
    detail
  });
  const result = question.save();
  // console.log('question added ', result);
}
function listQuestions() {
  const questions = Question
    .find()
    .populate('brief')
    .select('id brief');
  // console.log('list question: ', questions);
}
async function updateBrief(brief) {
  const result = await brief.set({
    'name': 'sum updated'
  });
  await result.save();
  console.log('update brief ', result);
}
async function updateDetail(id) {
  // detail.set({
  //   'answer': 'no even updated'
  // });
  // detail.answer = 'no even updated';
  const result = await Detail.updateOne({id: id}, {
    $set: {
      answer: 'no even updated'
    }
  });
  // await detail.save();
  console.log('update detail: ', result);
}
async function initialize(){
  console.log('Initializing...')
  const brief = await creatBrief('sum up', 'Wed', true);
  const detail = await createDetail('sum up two number', 'none.');
  await createQuestion(6, brief, detail);

  // const brief = await Brief.findOne({name: 'sum up'});
  // const detail = await Detail.findOne({description: /.*sum.*/});
  // createQuestion(8, brief, detail._id);
  // listQuestions();
}
async function update(){
  // console.log('update here', Detail.findOne({id: 6}));
  // const detail = Detail.findOne({id: 6});
  // const brief = Brief.findOne({id: 6});
  console.log('Updatding...')
  updateDetail(6);
  updateBrief(Brief.findOne({id: 6}));
}
function run(){
  initialize();
  update();
  listQuestions();
}
run();