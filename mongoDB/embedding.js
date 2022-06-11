const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/firstDB')
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.error('could not connect to MongoDB.', err)
    );

const briefSchema = new mongoose.Schema({
    name: String,
    date: String,
    done: Boolean
});
const detailSchema = new mongoose.Schema({
    description: String,
    answer: String
});
const Brief = mongoose.model('Brief', briefSchema);
const Detail = mongoose.model('Detail', detailSchema);
const Question = mongoose.model('Question', new mongoose.Schema({
    id: Number,
    brief: briefSchema,
    detail: detailSchema
}));

async function createQuestion(id, brief, detail){
    const question = new Question({
        id,
        brief,
        detail
    });
    const result = await question.save();
    console.log('question added:', result);
}
async function listQuestions() {
    const questions = await Question
        .find()
        // .select('id', 'brief');
    console.log(questions);
}

createQuestion(3,
  new Brief({name:'sum up', date:'Wed', done:true}),
  new Detail({description: 'sum up two number', answer: 'none.'})
  );
listQuestions();