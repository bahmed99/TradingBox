const express = require("express");

const app = express()

const morgan = require('morgan')

const cors = require('cors')

const mongoose = require("mongoose")

const port = process.env.PORT || 3001;

const {mongoURI} = require('./keys')

app.use(express.json())

app.use(cors())

app.use(morgan('tiny'))

app.use("/auth/admin",require("./routes/auth/admin.js"))
app.use("/auth/client",require("./routes/auth/client.js"))
app.use("/client",require("./routes/client/index"))
app.use("/admin",require("./routes/admin/index"))


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) =>
    console.log("connected to database"),
    app.listen(port, () => {
        console.log(`runinig on port ${port}`)
    }
    )

).catch(err => {
    console.log("error")
})
