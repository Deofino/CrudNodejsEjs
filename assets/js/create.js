'use strict';
let nome,email,assunto,mensagem,button;
nome = document.querySelector('#nome');
email = document.querySelector('#email');
assunto = document.querySelector('#assunto');
mensagem = document.querySelector('#mensagem');
button = document.querySelector('#form');
button.addEventListener('submit',async(evt)=>{
    evt.preventDefault();
    let req = await fetch('/create',{
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
            nome: nome.value,
            email: email.value,
            assunto: assunto.value,
            mensagem: mensagem.value,

        })
    });
    let res = await req.json();
    let alert = document.querySelector('.alert');
    if(res.status=='ok'){
        alert.classList.add('success');
        alert.classList.remove('error');
        alert.innerHTML = '<li>Mensagem cadastrada com sucesso!</li>';
        
        nome.value = '';
        email.value = '';
        assunto.value = '';
        mensagem.value = '';
    }else{
        alert.classList.add('error');
        alert.classList.remove('success');
        alert.innerHTML = '<li>Mensagem cadastrada com sucesso!</li>';
    }
   

    console.log(res);
})