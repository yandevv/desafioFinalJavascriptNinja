/*
Vamos estruturar um pequeno app utilizando módulos.
Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
seguinte forma:
- No início do arquivo, deverá ter as informações da sua empresa - nome e
telefone (já vamos ver como isso vai ser feito)
- Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
um formulário para cadastro do carro, com os seguintes campos:
  - Imagem do carro (deverá aceitar uma URL)
  - Marca / Modelo
  - Ano
  - Placa
  - Cor
  - e um botão "Cadastrar"

Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
aparecer no final da tabela.

Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
Dê um nome para a empresa e um telefone fictício, preenchendo essas informações
no arquivo company.json que já está criado.

Essas informações devem ser adicionadas no HTML via Ajax.

Parte técnica:
Separe o nosso módulo de DOM criado nas últimas aulas em
um arquivo DOM.js.

E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
que será nomeado de "app".
*/

'use strict';

import DOM from "./DOM.js"

(function(doc){
  doc.addEventListener('DOMContentLoaded', app().init);

  function app() {
    function init() {
      function submitHandler(e) {
        e.preventDefault();

        const $inputImage = doc.querySelector('[data-js="inputImage"]');
        const $inputMarca = doc.querySelector('[data-js="inputMarca"]');
        const $inputAno = doc.querySelector('[data-js="inputAno"]');
        const $inputPlaca = doc.querySelector('[data-js="inputPlaca"]');
        const $inputCor = doc.querySelector('[data-js="inputCor"]');
        const $tableCars = doc.querySelector('[data-js="tableCars"]');

        const fr = new FileReader();

        fr.onload = () => {
          $tableCars.innerHTML += `<tr><td><img style="max-width: 250px; max-height: 250px;" src="${fr.result}"/></td><td>${$inputMarca.value}</td><td>${$inputAno.value}</td><td>${$inputPlaca.value}</td><td>${$inputCor.value}</td></tr>`
        }
        fr.readAsDataURL($inputImage.files[0]);
      }

      function assignCompanyInfo(companyInfo) {
        let $txtCompany = doc.querySelector('[data-js="txtCompany"]');
        let $txtTelefone = doc.querySelector('[data-js="txtTelefone"]');

        $txtCompany.innerHTML = companyInfo.name;
        $txtTelefone.innerHTML = companyInfo.phone;
      }

      doc.querySelector('[data-js="submitForm"]').addEventListener('click', submitHandler);

      let fetchApi = fetch('company.json').then((response) => response.json()).then((companyInfo) => assignCompanyInfo(companyInfo));

      fetchApi.catch((e) => console.error(`Erro: ${e}`))
    }

    return {
      init: init(),
    }
  }
})(document)