const Community = require('../models/community-model')

createAggregates = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Aggregate',
        })
    }

    const aggregate = new Community(body)
    if (!aggregate) {
        return res.status(400).json({ success: false, error: err })
    }

    aggregate
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                aggregate: aggregate,
                message: 'Aggregate Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Aggregate Not Created!'
            })
        })
}

updateAggregates =  async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Community.findOne({ _id: req.params.id }, (err, aggregate) => {
        console.log("aggregate found: " + JSON.stringify(aggregate));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Aggregate not found!',
            })
        }

        console.log(body)

        aggregate.topItems = body.topItems
        aggregate.itemsCount = body.itemsCount
        aggregate.users = body.users

        aggregate
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: aggregate._id,
                    message: 'Aggregate updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Aggregate not updated!',
                })
            })
    })
}

getAllAggregates = async (req, res) => {
    await Community.find({}, (err, aggregates) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!aggregates.length) {
            return res
                .status(404)
                .json({ success: false, error: `Aggregates not found` })
        }
        return res.status(200).json({ success: true, aggregates: aggregates })
    }).catch(err => console.log(err))
}

deleteAggregates =  async (req, res) => {
    Community.findById({ _id: req.params.id }, (err, aggregates) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Aggregates not found!',
            })
        }
        Community.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: aggregates })
        }).catch(err => console.log(err))
    })
}

module.exports = {
    createAggregates,
    updateAggregates,
    deleteAggregates,
    getAllAggregates
}