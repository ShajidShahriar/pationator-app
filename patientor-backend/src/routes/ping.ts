import express from "express";
const router = express.Router()

router.get('/' , (req ,res ) => {
    console.log('someone pinged')
    res.send('pong')
})

export default router