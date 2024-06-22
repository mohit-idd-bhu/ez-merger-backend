const cors = require('cors');
const app = require('express')();
const http = require('http');
const {Server} = require('socket.io');
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

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:['http://localhost:3000','http://https://ez-merger-backend.onrender.com'],
    }
});

io.on('connection',(socket)=>{
    console.log(`Socket User Id : ${socket.id}`);

    socket.on('join-document',(documentId)=>{
        socket.join(documentId);
    });

    socket.on('update',(update)=>{
        const {id,title,content} = update;
        io.to(id).emit('update',{title,content});
    })

    socket.on('leave-document',(documentId)=>{
        socket.leave(documentId);
    });

    socket.on('disconnect',()=>{
        console.log("User Disconnected");
    });
});

connectDB().then(()=>{
    server.listen(5000,()=>{
        console.log(`Server started on port ${PORT}`);
    })
});