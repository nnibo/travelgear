//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");




//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3001;




//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/travelgear',
{  
    useNewUrlParser: true,
    useUnifiedTopology: true
   
});




//criando a model do seu projeto
const usuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
    
});

const produtoViagemSchema = new mongoose.Schema({
    id_protudoviagem : {type : Number, required : true},
    descricao : {type : String},
    fornecedor : {type : String},
    DataFabricacao : {type : Date},
    QuantidadeEstoque : {type : Number}
})

const Usuario = mongoose.model("Usuario", usuarioSchema);
const Produto = mongoose.model("Produto", produtoViagemSchema);




//configurando os roteamentos

//roteamento usuario
app.post("/cadastrousuario", async(req, res)=>{
    
    const email = req.body.email;
    const senha = req.body.senha

    

    const usuario = new Usuario({
        
        email : email,
        senha : senha,
        
    })


    
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }


});

//roteamento produto viagem

app.post("/cadastroprodutoviagem", async (req, res)=>{
    const id_protudoviagem = req.body.id_protudoviagem;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const DataFabricacao = req.body.DataFabricacao;
    const QuantidadeEstoque = req.body.QuantidadeEstoque;

    const produto = new Produto({
        id_protudoviagem : id_protudoviagem,
        descricao : descricao,
        fornecedor : fornecedor,
        DataFabricacao : DataFabricacao,
        QuantidadeEstoque : QuantidadeEstoque,

    })

    
    
    try{
        const newProduto = await produto.save();
        res.json({error : null, msg : "Cadastro do produto ok", produtoId : newProduto._id});
    } catch(error){
        res.status(400).json({error});
    }



})


//rota para o get de cadastro
app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrousuario.html");
});
app.get("/cadastroprodutoviagem", async(req,res)=>{
    res.sendFile(__dirname +"/cadastroprodutoviagem") // tem q criar o html
})




//rota raiz - inw
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});




//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
