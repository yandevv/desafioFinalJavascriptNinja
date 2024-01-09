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
          const tableRow = doc.createElement('tr');

          const tableDataImg = doc.createElement('td');
          const img = doc.createElement('img');
          img.setAttribute('style', 'max-width: 250px; max-height: 250px;');
          img.setAttribute('src', `${fr.result}`);
          tableDataImg.appendChild(img);

          const tableDataMarca = doc.createElement('td');
          tableDataMarca.appendChild(doc.createTextNode(`${$inputMarca.value}`));

          const tableDataAno = doc.createElement('td');
          tableDataAno.appendChild(doc.createTextNode(`${$inputAno.value}`));

          const tableDataPlaca = doc.createElement('td');
          tableDataPlaca.appendChild(doc.createTextNode(`${$inputPlaca.value}`));

          const tableDataCor = doc.createElement('td');
          tableDataCor.appendChild(doc.createTextNode(`${$inputCor.value}`));
          
          const tableButton = doc.createElement('td');
          const button = doc.createElement('button');
          const trashVector = doc.createElement('img');
          trashVector.setAttribute('src', './vectors/trash-2.svg');
          button.appendChild(trashVector);
          tableButton.appendChild(button);

          tableRow.append(tableDataImg, tableDataMarca, tableDataAno, tableDataPlaca, tableDataCor, tableButton);
          $tableCars.appendChild(tableRow);

          button.addEventListener('click', (e) => {
            e.preventDefault();
            tableRow.parentNode.removeChild(tableRow);
          })
        }
        fr.readAsDataURL($inputImage.files[0]);
      }

      doc.querySelector('[data-js="submitForm"]').addEventListener('click', submitHandler);

      fetchCompanyInfo();
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
      "fetchCompanyInfo": fetchCompanyInfo
    }
  }
})(document)