 const logincontroller = (req, res) => {
    const {
        usuario, senha
}= req.body
        let senhaaprovada = false
        console.log(usuario, senha)
    if(usuario==="admin" && senha==='123'){
        senhaaprovada = true
    }
    res.json ({
        retorno:senhaaprovada
    })
  }


  export default logincontroller