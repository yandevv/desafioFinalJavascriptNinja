'use strict';

import DOM from "./DOM.js"

(function (doc) {
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

    async function deleteCar(placa) {
      await fetch('http://localhost:3000/car/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ placa: placa })
      })
    }

    function addTableHeaders($tableCars) {
      const tableRow = doc.createElement('tr');

      const tableHeaderImg = doc.createElement('th');
      tableHeaderImg.setAttribute('style', 'width: 200px; text-align: left;');
      tableHeaderImg.appendChild(doc.createTextNode('Imagem'));
      
      const tableHeaderAno = doc.createElement('th');
      tableHeaderAno.setAttribute('style', 'width: 200px; text-align: left;');
      tableHeaderAno.appendChild(doc.createTextNode('Ano'));

      const tableHeaderPlaca = doc.createElement('th');
      tableHeaderPlaca.setAttribute('style', 'width: 200px; text-align: left;');
      tableHeaderPlaca.appendChild(doc.createTextNode('Placa'));

      const tableHeaderCor = doc.createElement('th');
      tableHeaderCor.setAttribute('style', 'width: 200px; text-align: left;');
      tableHeaderCor.appendChild(doc.createTextNode('Cor'));
      
      const tableHeaderAcoes = doc.createElement('th');
      tableHeaderAcoes.setAttribute('style', 'width: 200px; text-align: left;');
      tableHeaderAcoes.appendChild(doc.createTextNode('Ações'));

      tableRow.append(tableHeaderImg, tableHeaderAno, tableHeaderPlaca, tableHeaderCor, tableHeaderAcoes);
      $tableCars.appendChild(tableRow);
    }

    function refreshCars(cars) {
      const $tableCars = doc.querySelector('[data-js="tableCars"]');

      $tableCars.innerHTML = '';

      addTableHeaders($tableCars);

      if (cars.length > 0) {
        const docFragment = new DocumentFragment();

        cars.forEach((car) => {
          const tableRow = doc.createElement('tr');

          const tableDataImg = doc.createElement('td');
          const img = doc.createElement('img');
          img.setAttribute('style', 'width: 250px; height: 250px;');
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
          docFragment.append(tableRow);

          button.addEventListener('click', async (e) => {
            e.preventDefault();
            await deleteCar(car.placa);
            fetchCars();
          })
        })

        $tableCars.appendChild(docFragment);
      }
    }

    function init() {
      async function submitHandler(e) {
        e.preventDefault();

        await uploadCar();

        fetchCars();
      }

      doc.querySelector('[data-js="submitForm"]').addEventListener('click', submitHandler);

      fetchCompanyInfo();

      fetchCars();
    }

    function fetchCompanyInfo() {
      const fetchApi = fetch('company.json').then((response) => response.json()).then((companyInfo) => assignCompanyInfo(companyInfo));
      fetchApi.catch((e) => console.error(`Erro: ${e}`))
    }

    function fetchCars() {
      const fetchCars = fetch('http://localhost:3000/car').then((response) => response.json()).then((response) => refreshCars(response));
      fetchCars.catch((e) => console.error(`Erro: ${e}`));
    }

    function assignCompanyInfo(companyInfo) {
      let $txtCompany = doc.querySelector('[data-js="txtCompany"]');
      let $txtTelefone = doc.querySelector('[data-js="txtTelefone"]');

      $txtCompany.innerHTML = companyInfo.name;
      $txtTelefone.innerHTML = companyInfo.phone;
    }

    return {
      "init": init
    }
  }
})(document)