import User from "../model/User.model.js"

async function createUser (req, res) {
    try {
        let { name } = req.body

        if ( typeof name !== 'string') {
            res.status(400).json({ message: 'Name must be a String' })
            return
        }

        if(!name || name.trim() == ''){
            res.status(400).json({ message: 'Name is not valid' })
            return
        }

        const newUser = new User({
            name
        })

        let createNewUser = await newUser.save()

        if (createNewUser) {
            res.status(201).json({ message: 'User created successfully', newUser: {id: createNewUser._id, name: createNewUser.name} })
        } else {
            res.status(500).json({ message: 'Something went wrong' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

async function getUser(req, res){
    try {
        let { user_id } = req.params

        let user = await User.findById(user_id)

        if (user) {
            res.status(200).json({id: user._id, name: user.name})
        } else {
            res.status(404).json({message: 'User with ID not found'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

async function updateUser(req, res){
    try {
        let { user_id } = req.params
        let { name } = req.body

        if ( typeof name !== 'string') {
            res.status(400).json({ message: 'Name must be a String' })
            return
        }

        if(!name || name.trim() == ''){
            res.status(400).json({ message: 'Name is not valid' })
            return
        }

        let user = await User.updateOne(
            { _id: user_id },
            { name }
        )

        if (user) {
            res.status(200).json({ message: 'User updated' })
        } else {
            res.status(404).json({ message: 'User with ID not found' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

async function deleteUser(req, res){
    try {
        let { user_id } = req.params

        let user = await User.findByIdAndDelete(user_id)

        if (user) {
            res.status(200).json({ message: 'User deleted' })
        } else {
            res.status(404).json({ message: 'User with ID not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser
}