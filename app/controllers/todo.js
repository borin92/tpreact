const todoModel = require('../models/todo.js');

module.exports = class todos {
    constructor(app, connect) {
        this.app = app;
        this.todoModel = connect.model('todo', todoModel);
        this.run();
    }

    run() {
        this.app.get("/", (req, res) => {
            console.log(todoModel)
            res.json({ message: "Hello from server!" });
        });
        this.app.post('/todos/add', (req, res) => {
            try {
                const todoModel = new this.todoModel({ title: req.body.title, state: "active" });
                console.log(todoModel)
                todoModel.save().then((todo) => {

                    res.status(200).json(todo || {});

                }).catch((err) => {

                    console.log(err);

                    res.status(200).json({ err });

                });

            }
            catch (err) {
                console.error(`[ERROR] post:todos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/todos/delete', (req, res) => {
            try {
                this.todoModel.deleteOne({ _id: req.body.id }).then((user) => {

                    res.status(200).json(user || {});

                }).catch((err) => {

                    console.log(err);

                    res.status(200).json({ err });

                });


            }
            catch (err) {
                console.error(`[ERROR] post:todos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/todos/deleteAll', (req, res) => {
            try {
                this.todoModel.remove({}).then((user) => {

                    res.status(200).json(user || {});

                }).catch((err) => {

                    console.log(err);

                    res.status(200).json({ err });

                });


            }
            catch (err) {
                console.error(`[ERROR] post:todos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.get('/todos/getOne', (req, res) => {
            try {
                this.todoModel.findOne({
                    _id: req.body.id
                }).then(dbtodoData => {
                    if (!dbtodoData) {
                        res.status(404).json({
                            message: 'No todo found with this id.'
                        });
                        return;
                    }
                    res.json(dbtodoData);
                })
            }
            catch (err) {
                console.error(`[ERROR] post:todos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
        this.app.get('/todos/getAll', async (req, res) => {
            try {
                this.todoModel.find().sort({ _id: -1 }).then(dbtodoData => {
                    if (!dbtodoData) {
                        res.status(404).json({
                            message: 'No todo found with this id.'
                        });
                        return;
                    }
                    res.json(dbtodoData);
                })
            }
            catch (err) {
                console.error(`[ERROR] post:todos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
    }

}