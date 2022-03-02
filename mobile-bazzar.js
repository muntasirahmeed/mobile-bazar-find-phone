// Loading data from API and add search option 
const phoneLoad = () => {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  const lowerCaseValue = inputValue.toLowerCase(inputField);
  if (lowerCaseValue == "") {
    const errorMsg = document.getElementById("error-msg1");
    errorMsg.innerText = "Please Enter a Phone Name!";
  } else {
    const errorMsg = document.getElementById('error-msg1')
    errorMsg.innerText = '';
    inputField.value = "";
    const link = `https://openapi.programming-hero.com/api/phones?search=${lowerCaseValue}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => phoneDisplay(data.data));
  }
};

const phoneDisplay = (phones) => {
  const phonesArray = phones.slice(0, 20);
  if (phonesArray.length == 0) {
    const errorMsg = document.getElementById("error-msg2");
    errorMsg.innerText = "Opps! Result Not Found";
  } else {
    const errorMsg = document.getElementById("error-msg2");
    errorMsg.innerText = "";
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    phonesArray.forEach((phone) => {
      console.log(phone);
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="col contain-info">
                    <div class="card h-100 rounded-3 contain-info">
                        <div class="image-div">
                           <img src="${phone.image}"  class="card-img-top image" alt="...">
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title"> ${phone.phone_name}</h5>
                            <h5 class="card-title">Brand: ${phone.brand}</h5>
                            <button onclick="showDetails('${phone.slug}')" class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="button-addon2">Explore</button>
                            
                        </div>
                    </div>
                </div>
            `;
      cardContainer.appendChild(div);
    });
  }
};

const showDetails = (details) => {
  const url = `https://openapi.programming-hero.com/api/phone/${details}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

const displayDetails = (details) => {
  console.log(details);
  const image = document.getElementById("phone-img");
  image.innerHTML = `
  <img src="${details.image}" class="image" alt="">
  <h1>${details.name}</h1>
  `;
  const table = document.getElementById("table");
  table.innerHTML = `
    <tbody>
      <tr>
    <th scope="row">Release Date:</th>
    <td>${details.releaseDate ? details.releaseDate : "Comming Soong"}</td>
  </tr>
  <tr>
    <th scope="row">Brand</th>
    <td>${details.brand}</td>
  </tr>
    <tr>
    <th >Features:</th>
     <td></td>
  </tr>
  <tr>
    <th scope="row">Porcessor</th>
    <td>${details.mainFeatures.chipSet}</td>
  </tr>
  <tr>
    <th scope="row">Display Size</th>
    <td>${details.mainFeatures.displaySize}</td>
  </tr>
  <tr>
    <th scope="row">Memory</th>
    <td>${details.mainFeatures.memory}</td>
  </tr>
  <tr>
    <th scope="row">Storage</th>
    <td>${details.mainFeatures.storage}</td>
  </tr>
  <tr>
    <th scope="row">Sensors</th>
    <td>${details.mainFeatures.sensors[0]} ${details.mainFeatures.sensors[1]} ${
    details.mainFeatures.sensors[2]
  } ${details.mainFeatures.sensors[3]} ${details.mainFeatures.sensors[4]} ${
    details.mainFeatures.sensors[5]
  }</td>
  </tr>
  <tr>
    <th>Others:</th>
  </tr>
  <tr>
    <th>Bluetooth</th>
    <td>${details.others?.Bluetooth}</td>
  </tr>
  <tr>
    <th>GPS</th>
    <td>${details.others?.GPS}</td>
  </tr>
  <tr>
    <th>NFC</th>
    <td>${details.others?.NFC}</td>
  </tr>
  <tr>
    <th>Radio</th>
    <td>${details.others?.Radio}</td>
  </tr>
  <tr>
    <th>USB</th>
    <td>${details.others?.USB}</td>
  </tr>
  <tr>
    <th>WLAN</th>
    <td>${details.others?.WLAN}</td>
  </tr>

    </tbody>
  `;
};
