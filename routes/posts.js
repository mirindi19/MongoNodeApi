const router=require("express").Router();
const Post=require("../models/Post");
//create a post
router.post("/insert", async(req,res) =>{
    const newPost=new Post(req.body);
    try {
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);

        
    } catch (error) {
        res.status(500).json(error)
        
    }
});

/// delete post
router.delete("/:id",async (req,res) => {
    try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(200).send(
            res.status(200).json({
                status:200,
                message:"Deleted Successfull",
            }) 
        ) 
	} catch {
		res.status(404)
		res.send({ error: "Check your Id !" })
	}  
});
//// update 
router.patch("/Update/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
//// find by ID
router.get("/Search/:id", async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id })
	res.send(post)
})

////find all Post///////////////////////
router.get("/all", async (req, res) => {
	const post = await Post.find()
	res.send(post)
   
})
module.exports =router;