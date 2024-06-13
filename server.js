const cors = require('cors');
const app = require('express')();
const bodyparser = require('body-parser');
const connectDB = require('./db/config')
const userRoutes = require('./routes/userRoutes');
const docRoutes = require('./routes/docRoutes');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT||5000;

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use('/user',userRoutes);
app.use('/auth',authRoutes);
app.use('/docs',docRoutes);

connectDB().then(()=>{
    app.listen(5000,()=>{
        console.log(`Server started on port ${PORT}`);
    })
});