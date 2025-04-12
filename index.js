const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config();

const auth = require('./middleware/auth');
const authUserRoutes = require('./routes/authUserRoutes.js');
const authUserOrganisationRoutes = require('./routes/authUserOrganisationRoute.js');
const userRouter = require('./routes/userRoutes.js');
const leadTypeRouter = require('./routes/leadTypeRoutes.js');
const leadSourceRouter = require('./routes/leadSourceRoutes.js');
const organisationProfileRouter = require('./routes/organisationProfileRoutes.js');
const userOrganisationRouter = require('./routes/userOrganisationRoutes.js');
const leadRouter = require('./routes/leadRoutes.js');


const sequelize = require("./config/db.js");
const Role = require('./model/Role.js');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use("/api/auth", authUserRoutes);
app.use("/api/auth", authUserOrganisationRoutes);
app.use("/api/member", auth, userRouter);
app.use("/api/member", auth, leadTypeRouter);
app.use("/api/member", auth, leadSourceRouter);
app.use("/api/member", auth, organisationProfileRouter);
app.use("/api/member", auth, userOrganisationRouter);
app.use("/api/member", auth, leadRouter);
app.use("/", (req, res) => {
    res.status(404);
    res.write("<h1>Page not found</h1>");
    res.send();
})

async function syncAndSeedRoles() {
    try {
        await Role.sync();

        const existingRoles = await Role.findAll();
        if (existingRoles.length === 0) {
            await Role.bulkCreate([
                { role: 'admin' },
                { role: 'manager' },
                { role: 'employee' },
            ]);
        }
        return;
    } catch (error) {
        console.error('Error syncing or seeding roles table:', error);
        return;
    }
}

sequelize.sync().then(async () => {
    await syncAndSeedRoles();

    app.listen(PORT, () => {
        console.log("App is running on port ", PORT);
    })
}).catch((err) => {
    console.log(err);
})