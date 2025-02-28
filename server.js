var express=require("express");
var bodyParser=require('body-parser')
var app=express()
var http=require('http').Server(app)
var io=require('socket.io')(http)
var mongoose=require('mongoose');

app.use(express.static(__dirname))
app.use(bodyParser.json())
var dbUrl=`mongodb+srv://zahrahakimi777:13741117@cluster0.ja9cgkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
app.use(bodyParser.urlencoded({extended:false}));

var Message=mongoose.model('Message',{
   name:String,
   message:String
})


app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find(); 
        res.send(messages);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


app.get('/messages/:user', async (req, res) => {
    try {
        const user = req.params.user; 
        const messages = await Message.find({ name: user });
        res.send(messages);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);
        await message.save(); 

        var censored=await Message.findOne({message:"badword"})

        if(censored){
            console.log('censored word found',censored)
            await Message.deleteOne({_id:censored.id})
        }else{
            io.emit('message', req.body);
            res.sendStatus(200);
        }
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } 
});

io.on('connection',(socket)=>{
    console.log('a user is connected')
})


mongoose.connect(dbUrl)


var server=http.listen(3000,()=>{
    console.log('server is listening to',server.address().port)
})



