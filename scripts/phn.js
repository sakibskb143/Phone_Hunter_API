const loadsSmartPhone = async(searchText='13',isShowAll) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
      const data = await res.json();
      const phones = data.data ;
    //   console.log(data.data);
      displaySmartphone(phones,isShowAll);



}

const displaySmartphone = (phones,isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container');
    // // Clear previous content before adding new phones
    phoneContainer.innerHTML = '';
    // console.log(phoneContainer);
    // console.log(phones.length);
    // show all display if length is more then 12 
    const display = document.getElementById('show-all-btn');
    if(phones.length >12 && !isShowAll){
      
        display.classList.remove('hidden');
    }
    else {
        display.classList.add('hidden');
    }  

    // display only 13 limited phone
    if(!isShowAll){
      phones = phones.slice(0,12);
    }

   

    phones.forEach(phone => {

        //   console.log(phone);

          // create div 
          const phoneCard = document.createElement('div');
          phoneCard.classList = 'card bg-gray-100  p-4';
          phoneCard.innerHTML = `
          <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            
            <div onclick="showDetailHandler('${phone.slug}'); " class="card-actions justify-center">
              <button class="btn btn-primary">Show Details</button>
            </div>
          </div>
          `;
          phoneContainer.appendChild(phoneCard);

    });
    // hidden loading spriner
    toggleSpiners(false); 

}

 const searchHandler = (isShowAll) => {
    // hidden loading spinner
    toggleSpiners(true); 
    const inputField = document.getElementById('search-field');
    const searchText =  inputField.value ;
    // console.log(searchText);
    loadsSmartPhone(searchText,isShowAll);

 }

 const showDetailHandler = async (id) =>{
  // console.log("connected" , id);
  //load single data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data =await res.json();
  const phones = data.data ;
  displayModalDetails(phones);

  }

// display Modal  
const displayModalDetails = (phone) =>{
  console.log(phone);
  // document.getElementById('phone-name').innerText =phone.name ;
  const showDetailContainer = document.getElementById('showDetailsContainer');
  showDetailContainer.innerHTML = `
  <div class = "bg-[#0D6EFD0D] flex justify-center items-center py-12 m-4">  <img src="${phone.image}" alt=""/> </div>
 
  <p ><spam class = "text-2xl font-bold">Phone Name : </spam>${phone.name}</p>
  <p ><spam class = "text-2xl font-bold">ChipSet : </spam>${phone.mainFeatures
    .chipSet}</p>
  <p ><spam class = "text-2xl font-bold">DisplaySize : </spam>${phone.mainFeatures
    .displaySize}</p>
  
  `;
  show_details_modal.showModal() ; 
}

const toggleSpiners =(isLoading) =>{
    const spinners = document.getElementById('spinner');
   
    if(isLoading){
        spinners.classList.remove('hidden');
    }
    else {
        spinners.classList.add('hidden');
    }
}

const showAllSmartPhone = () => {
  console.log("connected");
  searchHandler(true);
}
loadsSmartPhone();