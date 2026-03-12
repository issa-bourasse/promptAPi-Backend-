const Prompt  = require('../models/Prompt');


const createPrompt = async(req , res , next)=>{
    try {
        const {title , description , promptText , category , tags} = req.body;


        if(!title || !description || !promptText){
            return res.status(400).json({message:"Title , description and prompt text are required"})
        }

        const prompt = await Prompt.create({
            title,
            description,
            promptText,
            category,
            tags,
        })
        res.status(201).json({message:"Prompt created successfully" , prompt})  
    }catch (error) {
        console.error('Error creating prompt:', error)
        next(error)
    }
}

const getPrompt = async(req , res , next)=>{
    try{
        const search = req.query.search || '';
        const category = req.query.category || '';

        const filter= {}

        if(search){
            filter.$or = [
                {title:{$regex:search , $options:'i'}},
                {description:{$regex:search , $options:'i'}},
                {promptText:{$regex:search , $options:'i'}},
                {tags:{$elemMatch:{$regex:search , $options:'i'}}}
            ]
        }
            if(category){
                filter.category ={$regex:`${category}` , $options:'i'}
            }

            const prompts = await Prompt.find(filter).sort({createdAt:-1})

            res.json(prompts)
        }catch (error) {
            next(error)
        }
}


const getPromptById  = async(req , res , next)=>{
    try{
    const prompt = await Prompt.findById(req.params.id)

    if(!prompt){
        return res.status(404).json({message:"Prompt not found"})
    }
    res.json(prompt)
    }catch (error) {
        next(error)
    }
}



const updatePrompt = async(req , res , next)=>{
    try{
        const prompt  =await Prompt.findById(req.params.id)

        if(!prompt){
            return res.status(404).json({message:"Prompt not found"})
        }

        prompt.title = req.body.title || prompt.title
        prompt.description = req.body.description || prompt.description
        prompt.promptText = req.body.promptText || prompt.promptText
        prompt.category = req.body.category || prompt.category
        prompt.tags = req.body.tags || prompt.tags

        const updatedPrompt = await prompt.save()
        res.json(updatedPrompt)
    }catch (error) {
        next(error)
    }
}

const deletePrompt = async(req , res , next)=>{
    try{
        const prompt = await Prompt.findById(req.params.id)

        if(!prompt){
            return res.status(404).json({message:"Prompt not found"})
        }

        await prompt.deleteOne()
        res.json({message:"Prompt deleted successfully"})
    }catch (error) {
        next(error)
    }
}

const upvotePrompt = async(req , res , next)=>{
    try{
        const prompt = await Prompt.findById(req.params.id)

        if(!prompt){
            return res.status(404).json({message:"Prompt not found"})
        }

        prompt.upvotes += 1
        const updatedPrompt = await prompt.save()
        res.json(updatedPrompt)
    }catch (error) {
        next(error)
    }
}

module.exports = {
    createPrompt,
    getPrompt,
    getPromptById,
    updatePrompt,
    deletePrompt,
    upvotePrompt,
};