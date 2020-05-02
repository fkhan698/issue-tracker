const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
// const createDomPurify = require('dompurify')
// const { JSDOM } = require('jsdom');
// const dompurify = createDomPurify(new JSDOM().window)
const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    project: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    // sanitizedHTML: {
    //     type: String,
    //     required: true
    // }

})

issueSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    // if(this.markdown){
    //     this.markdown = dompurify.sanitize(marked(this.markdown))
    // }
    next()
})
module.exports = mongoose.model('Issue', issueSchema)