
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const loadingSpinner = document.getElementById('loadingSpinner');


// Input field event listener
searchInput.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        if(searchInput.value !== ''){
            loadPhones(searchInput.value, 4);
            forLoading(true);
            phoneNameForShowAllBtn = searchInput.value;
        }else {
            alert('Enter any phone name.');
            phoneNameForShowAllBtn = searchInput.value;
        }
    }
})


// Searching the phones.
let phoneNameForShowAllBtn = 'iphone';
searchBtn.addEventListener('click', function(){
    if(searchInput.value !== ''){
        loadPhones(searchInput.value, 4);
        forLoading(true);
        phoneNameForShowAllBtn = searchInput.value;
    }else {
        alert('Enter any phone name.');
        phoneNameForShowAllBtn = searchInput.value;
    }
})


// Load phones from the server through API.
function loadPhones(searchText , quantity) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => {
        forLoading(true);
        return res.json()
    })
    .then(data => {
            displayPhones(data.data, quantity);
    })
}

// For Showing initial phones in the webpage so that user don't have to search first to see the phones.
loadPhones('Iphone', 4);


// Displaying the phones in the web page.
function displayPhones(phones, quantity){
    const noPhoneMsg = document.getElementById('noPhoneMsg');
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = "";
    if(phones.length != 0) {
        noPhoneMsg.style.display = 'none';
        forLoading(false);
        if(phones.length > quantity) {
            phones.slice(0,quantity).forEach(phone => {
                phoneContainer.innerHTML += `
                <article class="phone h-full border px-6 py-6 shadow-lg rounded-lg">
                <div class="h-1/2 mb-3">
                  <img src="${phone.image}" class="mx-auto h-full" alt="" />
                </div>
                <div class="h-1/2 w-full">
                  <h2 class="text-xl font-semibold mb-2">${phone.phone_name}</h2>
                  <h3 class="text-lg font-semibold mb-2">${phone.brand}</h3>
                  <p class="text-sm text-justify w-full">The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.</p>
                  <!-- Button trigger modal -->
                  <button class="w-full border border-purple-700 cursor-pointer font-semibold rounded-xl mt-2 py-1 text-purple-700 hover:text-white hover:bg-purple-700 duration-300" 
                   data-bs-toggle="modal"
                   data-bs-target="#staticBackdrop"
                   onclick="loadDetails('${phone.slug}')"
                   >View Details</button>
                </div>
              </article>
                `;
                showAllBtn.style.display = 'inline';
            });
        } else {
            phones.forEach(phone => {
                phoneContainer.innerHTML += `
                <article class="phone h-full border px-6 py-6 shadow-lg rounded-lg">
                <div class="h-1/2 mb-3">
                  <img src="${phone.image}" class="mx-auto h-full" alt="" />
                </div>
                <div class="h-1/2 w-full">
                  <h2 class="text-xl font-semibold mb-2">${phone.phone_name}</h2>
                  <h3 class="text-lg font-semibold mb-2">${phone.brand}</h3>
                  <p class="text-sm text-justify w-full">The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.</p>
                  <!-- Button trigger modal -->
                  <button class="w-full border border-purple-700 cursor-pointer font-semibold rounded-xl mt-2 py-1 text-purple-700 hover:text-white hover:bg-purple-700 duration-300" 
                   data-bs-toggle="modal"
                   data-bs-target="#staticBackdrop"
                   onclick="loadDetails('${phone.slug}')"
                   >View Details</button>
                </div>
              </article>
                `;
                showAllBtn.style.display = 'inline';
            });
        }
    } else if(phones.length == 0) {
        forLoading(false);
        noPhoneMsg.style.display = 'block';
        showAllBtn.style.display = 'none';
    }
}


// Showing all the phones.
showAllBtn.addEventListener('click', function(){
    loadPhones(phoneNameForShowAllBtn);
    forLoading(true);
})


// Loading the details of particular phone
function loadDetails(slug) {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(data => {
        showDetails(data.data);
    })
}

// Showing the details of particular phone
function showDetails(details) {
    const modalTitle = document.getElementById('staticBackdropLabel');
    const modalBody = document.getElementById('modal-body');
    modalTitle.innerText = details.name;
    modalBody.innerHTML = `
    <div class="modal-body h-auto p-2 rounded-md">
      <img id="modal-img" src="${details.image}" class="mx-auto h-72 mb-3 rounded-md" />
      <div class="w-full space-y-1">
        <p class="text-md"><span class='font-semibold'>ChipSet</span> : ${details.mainFeatures.chipSet}</p>
        <p class="text-md"><span class='font-semibold'>Display</span> : ${details.mainFeatures.displaySize}</p>
        <p class="text-md"><span class='font-semibold'>Memory</span> : ${details.mainFeatures.memory}</p>
        <p class="text-md"><span class='font-semibold'>Storage</span> : ${details.mainFeatures.storage}</p>
    </div>
    </div>
    `;
}






// Loading spinner feature.
function forLoading(isTrue){
    const phoneContainer = document.getElementById('phone-container');
    if(isTrue){
        phoneContainer.innerHTML = '';
        loadingSpinner.style.display = 'flex';
    } else {
        loadingSpinner.style.display = 'none';
    }
}