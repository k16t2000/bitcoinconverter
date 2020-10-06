//npm init, 
//npm i express body-parser axios
const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');
const ejs=require('ejs');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", ejs);

app.get('/', function(req, res){
    res.render("index.ejs", {rez: "", code: ""});
});


app.post('/',function(req,res){
    let url='https://api.coindesk.com/v1/bpi/currentprice.json';
    
    let currency=req.body.currency;
    

    axios.get(url)
    .then(function(response){
        let rate;
        let code;
        let num1=Number(req.body.num);
        
        if(currency==='EUR'){
            rate=response.data.bpi.EUR.rate_float;
            code=response.data.bpi.EUR.code; 

        }else{
            rate=response.data.bpi.USD.rate_float;
            code=response.data.bpi.USD.code;   
        }
        let disclaimer=response.data.disclaimer;
        
        let result=num1*rate;
        res.render(`index.ejs`,{rez: result, code: code });
        console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });

});
//your server will start on both localhost and the heroku servers
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running on port 3000.');
});
