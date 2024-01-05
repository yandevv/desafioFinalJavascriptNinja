'use strict';

import DOM from "./DOM.js"

(function(doc){
  doc.addEventListener('DOMContentLoaded', app().init);

  function app() {
    let carrosCadastrados = 0;

    function removeCar(dataAtr) {
      const $tgtTBody = doc.querySelector(dataAtr).parentNode;
      $tgtTBody.parentNode.removeChild($tgtTBody);
    }

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
          const vectorTrash = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyYXNoLTIiPjxwYXRoIGQ9Ik0zIDZoMTgiLz48cGF0aCBkPSJNMTkgNnYxNGMwIDEtMSAyLTIgMkg3Yy0xIDAtMi0xLTItMlY2Ii8+PHBhdGggZD0iTTggNlY0YzAtMSAxLTIgMi0yaDRjMSAwIDIgMSAyIDJ2MiIvPjxsaW5lIHgxPSIxMCIgeDI9IjEwIiB5MT0iMTEiIHkyPSIxNyIvPjxsaW5lIHgxPSIxNCIgeDI9IjE0IiB5MT0iMTEiIHkyPSIxNyIvPjwvc3ZnPg=="
          $tableCars.innerHTML += `<tr data-js="carro${++carrosCadastrados}"><td><img style="max-width: 250px; max-height: 250px;" src="${fr.result}"/></td><td>${$inputMarca.value}</td><td>${$inputAno.value}</td><td>${$inputPlaca.value}</td><td>${$inputCor.value}</td><td><button data-js="btnDelCarro${carrosCadastrados}"><img src="${vectorTrash}"/></button></td></tr>`
          doc.querySelector(`[data-js="btnDelCarro${carrosCadastrados}"]`).addEventListener('click', (e) => {
            e.preventDefault();
            app().removeCar(`[data-js="carro${carrosCadastrados}"]`);
          })
        }
        fr.readAsDataURL($inputImage.files[0]);
      }

      doc.querySelector('[data-js="submitForm"]').addEventListener('click', submitHandler);
    }

    function fetchCompanyInfo() {
      let fetchApi = fetch('company.json').then((response) => response.json()).then((companyInfo) => assignCompanyInfo(companyInfo));
      fetchApi.catch((e) => console.error(`Erro: ${e}`))
    }

    function assignCompanyInfo(companyInfo) {
      let $txtCompany = doc.querySelector('[data-js="txtCompany"]');
      let $txtTelefone = doc.querySelector('[data-js="txtTelefone"]');

      $txtCompany.innerHTML = companyInfo.name;
      $txtTelefone.innerHTML = companyInfo.phone;
    }

    return {
      "init": init,
      "removeCar": removeCar,
      "fetchCompanyInfo": fetchCompanyInfo
    }
  }
})(document)