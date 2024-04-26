const loadPhone = async (searchtext, isShowAll) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(data.data);
  displayPhones(phones, isShowAll);



}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container after append the data 
  phoneContainer.textContent = '';

  const showAll = document.getElementById('show_all_btn');
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove('hidden');
  }
  else {
    showAll.classList.add('hidden');
  }
  // display only 12 phones for each search
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }


  phones.forEach(phone => {
    console.log(phone);
    // create div
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card   bg-gray-100 p-4 ';
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick="showDetailDisplay('${phone.slug}');">Show Details</button>
          </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
}

// search handler

const searchHandler = (isShowAll) => {

  toggleSpinner(true);
  const inputField = document.getElementById('input-field');
  const searchtext = inputField.value;
  // console.log(searchtext);
  loadPhone(searchtext, isShowAll);

}
// show all details handler 
const showAllHandler = () => {
  searchHandler(true);
  // console.log("connected");
}
const toggleSpinner = (isLoading) => {

  const spin = document.getElementById('spinner');
  if (isLoading) {
    spin.classList.remove('hidden');
  } else {
    spin.classList.add('hidden');
  }
}

const showDetailDisplay = async (id)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const phones = await res.json();
  const phone = phones.data ;
    console.log("connected id ",phone);
    displayModalDetails(phone);
}

const displayModalDetails = (phone) =>{
   
  const showDetailContainer = document.getElementById('showDetailsContainer');
  showDetailContainer.innerHTML = `
  <div class = "bg-[#0D6EFD0D] flex justify-center items-center py-12 m-4">  <img src="${phone.image}" alt=""/> </div>
 
  <p ><spam class = "text-2xl font-bold">Phone Name : </spam>${phone.name}</p>
  <p ><spam class = "text-2xl font-bold">ChipSet : </spam>${phone.mainFeatures
    .chipSet}</p>
  <p ><spam class = "text-2xl font-bold">DisplaySize : </spam>${phone.mainFeatures
    .displaySize}</p>
  
  `;
  show_details_modal.showModal();
}