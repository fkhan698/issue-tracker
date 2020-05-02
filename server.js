const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const Issue = require('./models/issue')
const issueRouter = require('./routes/issues');
const methodOverride = require('method-override');


mongoose.connect('mongodb://localhost/issue-tracker', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use('/public', express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))



app.get('/', async (req, res) => {
   const issues = await Issue.find().sort({createdAt: 'desc'});
    res.render('issues/index', {issues: issues})
})

app.use('/issues', issueRouter);

app.listen(3000)