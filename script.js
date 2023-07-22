const content = document.getElementById('mealsContainer'); 
const favourite_meals = document.getElementById('favorite-button');
const search = document.getElementById('search'); 
// Array to store favorite meals 
let favoriteMeal = []; 




// function to show search result 
async function displaySearchResults() {
  let search_value = search.value;
  let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_value}`;
    const response = await fetch(URL);
    const data = await response.json();
    content.innerHTML = '';
    for (let meals of data.meals) {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <img src="${meals.strMealThumb}" alt="">
        <div class="name">
        <h2>${meals.strMeal}</h2>
        </div>
        <div class= "detail-sec">
        ${
            favoriteMeal.includes(meals.idMeal) ? `<a href="" class='favourite clicked' id='${meals.idMeal}'><i class="fa-sharp fa-solid fa-heart fa-xl"></i></a>` : `<a href="" class='favourite' id='${meals.idMeal}'><i class="fa-sharp fa-solid fa-heart fa-xl"></i></a>`
        }
        <button type="button" class=' more-details' id='${meals.idMeal}'>More Details</button>
        </div>
    `;
      content.append(div);
    }

    var favoriteButton = document.querySelectorAll('a');
    for (let button of favoriteButton) {
      button.addEventListener('click', toggleFavorites);
    }

    var moreDetailsbutton = document.querySelectorAll('.more-details');
    for (let button of moreDetailsbutton) {
      button.addEventListener('click', moreDetails);
  } 
}



      // function to show details of any meal
async function moreDetails() {
content.innerHTML = '';
    let id = this.id;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
       
        let meal = data.meals[0];
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('card2');
        div.innerHTML = `
        <div class="left">
        <div class="left-mid">
            <img src="${meal.strMealThumb}"
                alt="">
        </div>
    </div>
    <div class="right">
        <div class="right-mid">
            <div class="name">
                <p>${meal.strMeal}</p>
            </div>
            <div class="category_and_area">
                <h4>TYPE:${meal.strCategory}</h4>
                <h4>AREA:${meal.strArea}</h4>
            </div>
            <div class="recipe">
                <h4>recipe:</h4>

                <p>${meal.strInstructions}?</p>
            </div>
            <div class="moredetails">
                <a href= "${meal.strYoutube}"><button class="video-button">video</button></a>
                <a href= "${meal.strSource}"><button class="more-button">More</button></a>
            </div>
        </div>
        `
        content.append(div);
    })
}



            //  function to add any meal in favorite array and remove meal from the favourite array 
function toggleFavorites(e) {
  e.preventDefault();
  let index = favoriteMeal.indexOf(this.id);
  if (index == -1) {
    favoriteMeal.push(this.id);
    this.classList.add('clicked');
  } else {
    favoriteMeal.splice(index, 1);
    this.classList.remove('clicked');
  }

  localStorage.setItem("favoriteMeal", JSON.stringify(favoriteMeal));
}



    // function to display all favorite meals 
 function displayFavoriteMeals() {
  console.log('click')
  content.innerHTML = '';
  for(let meal of favoriteMeal){
      let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
      fetch(url)
      .then(res => {
          return res.json();
      })
      .then(data =>{
          let meal = data.meals[0];
      const div = document.createElement('div');
      div.classList.add('card');
  
  div.innerHTML = `
  <img src="${meal.strMealThumb}" alt="">
  <div class="name">
  <h2>${meal.strMeal}</h2>
  </div>
  <div class= "detail-sec">
  ${
    favoriteMeal.includes(meal.idMeal) ? `<a href="#" class='favourite clicked' id='${meal.idMeal}'><i class="fa-sharp fa-solid fa-heart fa-xl"></i></a>` : `<a href="#" class='favourite' id='${meal.idMeal}'><i class="fa-sharp fa-solid fa-heart fa-xl"></i></a>`
}
<button type="button" class=' more-details' id='${meal.idMeal}'>More Details</button>
</div>
  `;
  content.append(div);
var favoriteButton = document.querySelectorAll('a');
for (let button of favoriteButton) {
  button.addEventListener('click', toggleFavorites);
}

var moreDetailsbutton = document.querySelectorAll('.more-details');
for (let button of moreDetailsbutton) {
  button.addEventListener('click', moreDetails);
}
})
    }
  }


    //  function to start the app 
function appStar(){
search.addEventListener('input', displaySearchResults); 
favourite_meals.addEventListener('click', displayFavoriteMeals);
}appStar();