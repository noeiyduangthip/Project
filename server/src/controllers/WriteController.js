const { Write } = require('../models')
module.exports = {
    // indx with serach write
    async index(req, res) {
        try {
            let writes = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                writes = await Write.findAll({
                    where: {
                        $or: [
                            'title', 'content', 'category'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                writes = await Write.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(writes)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the writes'
            })
        }
    },
    // create write
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const write = await Write.create(req.body)
            res.send(write.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create write incorrect'
            })
        }
    },
    // edit write, suspend, active
    async put(req, res) {
        try {
            await Write.update(req.body, {
                where: {
                    id: req.params.writeId
                }
            })
            res.send(req.body)
        } catch (err) {
            200
            req.status(500).send({
                error: 'Update write incorrect'
            })
        }
    },
    // delete write
    async remove(req, res) {
        try {
            const write = await Wring.findOne({
                where: {
                    id: req.params.writeId
                }
            })
            if (!write) {
                return res.status(403).send({
                    error: 'The write information was incorrect'
                })
            }
            await write.destroy()
            res.send(write)
        } catch (err) {
            req.status(500).send({
                error: 'The write information was incorrect'
            })
        }
    },
    // get write by id
    async show(req, res) {
        try {
            const write = await Write.findById(req.params.writeId)
            res.send(write)
        } catch (err) {
            req.status(500).send({
                error: 'The write information was incorrect'
            })
        }
    }
}