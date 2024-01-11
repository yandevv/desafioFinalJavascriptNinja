'use strict';

import DOM from "./DOM.js"

(function(doc){
  doc.addEventListener('DOMContentLoaded', app().init);

  function app() {
    async function uploadCar() {
      const car = {
        imageLink: doc.querySelector('[data-js="inputImage"]').value,
        marca: doc.querySelector('[data-js="inputMarca"]').value,
        ano: doc.querySelector('[data-js="inputAno"]').value,
        placa: doc.querySelector('[data-js="inputPlaca"]').value,
        cor: doc.querySelector('[data-js="inputCor"]').value
      }

      await fetch('http://localhost:3000/car/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      })
    }

    function refreshCars(cars) {
      const $tableCars = doc.querySelector('[data-js="tableCars"]');

      cars.forEach((car) => {
        const tableRow = doc.createElement('tr');
  
        const tableDataImg = doc.createElement('td');
        const img = doc.createElement('img');
        img.setAttribute('style', `width: 250px; height: 250px;`);
        img.setAttribute('src', `${car.imageLink}`);
        tableDataImg.appendChild(img);
  
        const tableDataMarca = doc.createElement('td');
        tableDataMarca.appendChild(doc.createTextNode(`${car.marca}`));
  
        const tableDataAno = doc.createElement('td');
        tableDataAno.appendChild(doc.createTextNode(`${car.ano}`));
  
        const tableDataPlaca = doc.createElement('td');
        tableDataPlaca.appendChild(doc.createTextNode(`${car.placa}`));
  
        const tableDataCor = doc.createElement('td');
        tableDataCor.appendChild(doc.createTextNode(`${car.cor}`));
        
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
      })
    }

    function init() {
      async function submitHandler(e) {
        e.preventDefault();

        await uploadCar();

        app().fetchCars();
      }

      doc.querySelector('[data-js="submitForm"]').addEventListener('click', submitHandler);

      app().fetchCompanyInfo();

      app().fetchCars();
    }

    function fetchCompanyInfo() {
      let fetchApi = fetch('company.json').then((response) => response.json()).then((companyInfo) => assignCompanyInfo(companyInfo));
      fetchApi.catch((e) => console.error(`Erro: ${e}`))
    }

    function fetchCars() {
      fetch('http://localhost:3000/car').then((response) => response.json()).then((response) => refreshCars(response));
    }

    function assignCompanyInfo(companyInfo) {
      let $txtCompany = doc.querySelector('[data-js="txtCompany"]');
      let $txtTelefone = doc.querySelector('[data-js="txtTelefone"]');

      $txtCompany.innerHTML = companyInfo.name;
      $txtTelefone.innerHTML = companyInfo.phone;
    }

    return {
      "init": init,
      "uploadCar": uploadCar,
      "fetchCompanyInfo": fetchCompanyInfo,
      "fetchCars": fetchCars
    }
  }
})(document)