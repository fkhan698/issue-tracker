const express = require('express');
const Issue = require('../models/issue')
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('issues/new', {issue: new Issue()})
})

router.get('/edit/:id', async (req, res) => {
    const issue = await Issue.findById(req.params.id)
    res.render('issues/edit', {issue: issue})
})


router.get('/:slug', async(req, res) => {
    let issue = await Issue.findOne({ slug: req.params.slug })
    if(issue === null) res.redirect('/')
    res.render('issues/show', {issue: issue})
})

router.post('/', async (req, res, next) => {
req.issue = new Issue()
next()
}, saveIssueAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.issue = await Issue.findById(req.params.id)
    next()
    }, saveIssueAndRedirect('edit'))


router.delete('/:slug', async(req, res) => {
    await Issue.findByIdAndDelete(req.params.slug)
    res.redirect('/')
})

function saveIssueAndRedirect(path){
    return async (req, res) => {
        let issue = req.issue
        issue.title = req.body.title
        issue.description = req.body.description
        issue.project = req.body.project
        try {
            issue = await issue.save()
            res.redirect(`/issues/${issue.slug}`)
        } catch(e) {
            res.render(`/issues/${path}`, {issue: issue})
        }
    }
}

module.exports = router;