// index.js

const ramenMenu=document.getElementById("ramen-menu")
const ramenDetails=document.getElementById("ramen-detail")

// Callbacks
const handleClick = (ramen) => {
  // Update ramen detail image
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;

  // Update ramen name
  const ramenName = document.querySelector('#ramen-detail .name');
  ramenName.textContent = ramen.name;

  // Update restaurant name
  const restaurantName = document.querySelector('#ramen-detail .restaurant');
  restaurantName.textContent = ramen.restaurant;

  // Update rating
  const ratingDisplay = document.getElementById('rating-display');
  ratingDisplay.textContent = ramen.rating;

  // Update comment
  const commentDisplay = document.getElementById('comment-display');
  commentDisplay.textContent = ramen.comment;
};


const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener("submit",(e)=>{
e.preventDefault()
const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;


    const newRamen={
      "name":name,
      "restaurant": restaurant,
      "image": image,
      "rating": rating,
      "comment": comment
    }
    fetch("http://localhost:3000/ramens",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
      },
      body:JSON.stringify(newRamen)
    })
    .then(res=>res.json())
    .then(data=>{
    console.log("Ramen has been posted", data)
    })

    displayRamens(newRamen)
  })


}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
  .then(res=>res.json())
  .then(ramens=>{
    ramens.forEach(ramen=>{
      let image= document.createElement("img")
image.src=ramen.image
ramenMenu.appendChild(image)
     image.addEventListener("click",()=>{
      handleClick(ramen)
    
    
    })
    })

  })
};



const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
