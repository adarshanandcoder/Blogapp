const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const BlogPost = require('./models/BlogPost')
const app = express();

const PORT = 5000;

connection();

//middlewares

app.use(express.json());
app.use(cors());

//Routes
app.post('/postblog', async(req,res) => {
    let blog = new BlogPost ({
        title:req.body.title,
        description:req.body.description,
    })
    await blog.save();
    res.status(200).json({message : "Blog Posted Successfully.", blog})
});

app.get('/getblogs', async(req,res)=>{
    let blogs = await BlogPost.find();
    if(!blogs){
        res.status(404).json({message : "No blogs found"})
    }
    res.json({blogs});
});

app.delete("/deleteblog/:id" , async(req,res)=>{
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if(!blog){
        res.status(404).json({message : "No blog found."})
    }
    res.status(200).json({message : "Blog Deleted Successfully."})
});

app.put('/updateblog/:id', async(req,res)=>{
    let blog = await BlogPost.findByIdAndUpdate(req.params.id);
    if(!blog){
        res.status(404).json({message : "No blog found"})
    }
    if(!req.body.title && !req.body.description){
        res.json({message : "Provide the title and description"})
    }else if(!req.body.title){
        blog.description = req.body.description;
    }else if(!req.body.description){
        blog.title = req.body.title;
    }else{
        blog.title = req.body.title;
        blog.description = req.body.description;
    }
    await blog.save();
    res.status(200).json({message : "Blog updated successfully" , blog}) 
})

app.get('/' , async(req,res)=>{
    res.json({message : "Welcome to client server"});
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});