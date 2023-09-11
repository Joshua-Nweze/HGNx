import User from "../model/User.model.js"

export default async function createUser (req, res) {
    try {
        let { name } = req.body

        // let user = await User.find({name: { $regex: name, $options: 'i' } })

        // if (user) {
        //     res.status(500).json({ message: `User with name ${name} already exists` })
        //     return
        // }

        const newUser = new User({
            name
        })

        let createNewUser = await newUser.save()

        if (createNewUser) {
            res.json(201).json({ message: 'User created successfully' })
        } else{
            res.status(500).json({ message: 'Something went wrong' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
