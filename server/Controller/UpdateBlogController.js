const path = require("path")
const AsyncHandler = require("express-async-handler")
const { BlogModel } = require("../Model/BlogModel")
const { userModel } = require("../Model/UserModel")
const fs = require('fs')

const UpdateBlog = AsyncHandler(async (req, res) => {
    try {
        let { blog, heading, categories, content } = req.body
        let blogId = req.params.id
        let existingImag = await BlogModel.findOne({ _id: blogId })
        let imageFromDatabase = existingImag.image?.split("/")[3]
        let image;
        // not updated image
        if (existingImag.image !== null && blog !== null) {
            image = blog
        }
        // delete image
        if (existingImag.image !== null && blog === null || blog==="null" && fs.existsSync(path.join(__dirname, `../Storage/blogUploads/${imageFromDatabase}`))) {
            try {
                let pathOfImageToDelete = path.join(__dirname, `../Storage/blogUploads/${imageFromDatabase}`)
                try {
                    fs.unlinkSync(pathOfImageToDelete)
                } catch (error) {
                    console.log(error,"error");
                    return res.json({ message: error.message });
                }
                let updateBlog = await BlogModel.updateOne({ _id: blogId }, {
                    $set: {
                        image: null
                    }
                })
            } catch (error) {
                console.log(error,"error")
            }
        }
        // update the new Image and delete old image
        if (existingImag.image !== null && !blog ) {
            let pathOfImageToDelete = path.join(__dirname, `../Storage/blogUploads/${imageFromDatabase}`)
            console.log(pathOfImageToDelete,"pathOfImageToDelete")
            try {
                fs.unlinkSync(pathOfImageToDelete)
            } catch (error) {
                console.log(error);
                return res.json({ message: error.message });
            }
       
            image = `${process.env.BASE_URL}/${req.file.filename}`
        }

        // add new Image
        if (existingImag.image === null && !blog) {
            image = `${process.env.BASE_URL}/${req.file.filename}`
        }
        let updatedBlog = await BlogModel.updateOne({ _id: blogId }, {
            $set: {
                image: image !== "null" ? image : null,
                heading,
                categories: JSON.parse(categories).map((ele) => ele.value),
                content
            }
        })

        if (updatedBlog) {
            res.json({ message: "blog updated successfully" })
        }

    } catch (error) {
        res.json({ message: error.message })
        console.log(error.message)
    }
})
module.exports = { UpdateBlog }