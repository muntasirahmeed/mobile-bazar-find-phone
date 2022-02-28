// getting data from api and input input value
const loadData = () => {
  const input = document.getElementById("search-input");
  const inputText = input.value;
  console.log(inputText);
  input.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
// display phone image ,title , brand
const displayData = (allPhones) => {
  const phones = allPhones.slice(0, 20);
  const container = document.getElementById("container");
  container.textContent = "";
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
         <div class="card info p-1">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">
               <b>Brand:</b> ${phone.brand}
              </p>
              <button class="btn btn-info text-center" onclick="loadPhoneDetails('${phone.slug}')">Explore</button>
            </div>
          </div>
        `;
    container.appendChild(div);
  });
};
// load data for getting phone
const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetials(data.data));
};
// display phone details
const displayPhoneDetials = (phone) => {
  console.log(phone);
  const container = document.getElementById("details");
  container.innerHTML = "";
  container.innerHTML = `
    <div class="card p-1">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              
              <p class="card-text">
                <span><b>Release-Date:</b> ${phone.releaseDate}</span><br>
              </p>
              <p>
              <span><b>Fetures:</b></span><br>
              <span><b>Chipset:</b>${phone.mainFeatures.chipSet}</span><br>
              <span><b>Display:</b>${phone.mainFeatures.displaySize}</span><br>
              <span><b>Mamory:</b>${phone.mainFeatures.memory}</span><br>
              </p>
              <p>
              <span><b>Sensors:</b></span><br>
              
              ${phone.mainFeatures.sensors[0]},
               ${phone.mainFeatures.sensors[1]},
              ${phone.mainFeatures.sensors[2]},
               ${phone.mainFeatures.sensors[3]},
              ${phone.mainFeatures.sensors[4]},
               ${phone.mainFeatures.sensors[5]},
              </p>
              <p>
              <span><b>Sensors:</b></span><br>
              
              <span class="me-2"><b>Bluetooth:</b> ${phone.others.Bluetooth}</span>
              <span class="me-2"><b>GPS:</b> ${phone.others.GPS}</span>
              <span class="me-2"><b>NFC:</b> ${phone.others.NFC}</span>
              <span class="me-2"><b>Radio:</b> ${phone.others.Radio}</span>
              <span class="me-2"><b>USB:</b> ${phone.others.USB}</span>
              <span class="me-2"><b>WLAN:</b> ${phone.others.WLAN}</span>
             
              </p>
              <button class="btn btn-info text-center">hello</button>
            </div>
          </div>
    
    `;
};
