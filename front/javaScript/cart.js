
//Penser a mettre les commentaire avant le code pour que ce soit plus lisible



//fonction qui récupere les données du LocalStorage
function getLocalStorage() {
  let produitDansLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
  console.log(produitDansLocalStorage);

  // {id: {col: qt, col:qt}}   pour chaque id il ya un dictionnaire qui contient la couleur et la quanttié, si ces éléments sont pareils, la quantité augmente

  // Creation d'un dictionnaire pour stocker les données 
  let pannier = {};
  // Boucle for qui permet de récuperer chaque élément du panier  
  for(let k = 0; k < produitDansLocalStorage.length; k++) {
    // récupération de l'ID, couleur et quantité
    let id = produitDansLocalStorage[k][0];
    let col= produitDansLocalStorage[k][1];
    // ParseInt renvoie un entier au lieu d'une chaine de carctère 
    let qt = parseInt(produitDansLocalStorage[k][2]); 

   // Si le produit est déjà dans le panier 
    if (id in pannier) {
      if (col in pannier[id]) { // Si la couleur et l'id sont les même, on augmente la quantité
        pannier[id][col] += qt
      } else {
        pannier[id][col]  = qt // Sinon la quantité reste le meme
      }
      // A revoir avec les console log
    } else {
      pannier[id] = {};
      pannier[id][col] = qt;
    }
    
    
  } console.log(pannier)
  // On retourne le panier avec les éléments qui ont été modifier
  return pannier
}

//fonction qui envoie les données vers le localStorage
function setLocalStorage(pannier) {
  // On recrée le tableau du localStorage
  produitDansLocalStorage = []
  // A revoir avec les console log
  for (id in pannier) {
    for (col in pannier[id]) {
      produitDansLocalStorage.push( [id, col, pannier[id][col] ] )
    }
  }
  localStorage.setItem("productInCart", JSON.stringify(produitDansLocalStorage));
}

//On recupere les éléments du localStorage pour les stocker dans la variable pannier
let pannier = getLocalStorage();
//On se positionne dans le HTML
const positionHtml = document.querySelector('#cart__items');

//si le panier est vide on affiche
if ( Object.keys(pannier).length === 0 ){
  positionHtml.innerHTML = `  <H2>Le panier est vide</H2>  `;
  document.querySelector("#totalPrice").innerHTML = 0;
  document.querySelector("#totalQuantity").innerHTML = 0;
} else {
  //Sinon on charge les éléments de l'api et du localstorage 
  let totalPrice = 0;
  let totalProduct = 0;

  for (let id in pannier) {
      fetch("http://localhost:3000/api/products/" + id)
      .then((response)=>response.json())
      .then((data)=>{
        for (let col in pannier[id]) {
          positionHtml.innerHTML += showProduct(data, col, pannier[id][col]);
          
          
          //Prix de chaque article x quantité du produit choisie 
          totalPrice = totalPrice + data.price * pannier[id][col];
          document.querySelector("#totalPrice").innerHTML = totalPrice;
          
          //total du nombre d'artile + la quantité d'article choisie
          totalProduct = totalProduct + parseInt(pannier[id][col]);
          document.querySelector("#totalQuantity").innerHTML = totalProduct;
        }
      })
  }
    
    
}

//------------------------------Affichage des éléments dans le code HTML-----------------------------
function showProduct(data, color, quantity){
  
  let totalPerProduct = data.price * quantity;

  

  return `
         <article class="cart__item" data-id="${data._id}" data-color="${color}">
                 <div class="cart__item__img">
                   <img src=${data.imageUrl} alt="${data.altTxt}">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__titlePrice">
                     <h2>${data.name}</h2>
                     <p>${color}</p>
                     <p id="price">${totalPerProduct}.00 €</p>
                   </div>
                   <div class="cart__item__content__settings">
                     <div class="cart__item__content__settings__quantity">
                       <p>Qté : </p>
                       <input id="qty_${data._id}_${color}" onchange="changeQuantity('${data._id}','${color}')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                     </div>
                     <div class="cart__item__content__settings__delete">
                       <button class="deleteItem" onclick="deleteProduct('${data._id}','${color}')">Supprimer</button>
                     </div>
                   </div>
                 </div>
               </article>`;

}



//----------------------Modification de la quantité dans le panier----------------------
function changeQuantity(id, col){
  const input_id = `qty_${id}_${col}`;
  const input = document.querySelector('input[type="number"]#'+input_id) //Comme avec le 'on click' on traque le changement de valeur 
  const new_qty = input.value    //On stock la nouvelle valeur dans cett variable 

  let pannier = getLocalStorage()
  pannier[id][col] = new_qty;
  setLocalStorage(pannier); //On met la nouvelle valuer dans le local storage
  location.reload(); //lorsqu'on reload, ca change le total du panier 
} 


//----------------------Suppression des produits dans le panier----------------------
function deleteProduct(id, col){
  pannier = getLocalStorage();
  delete pannier[id][col];
  setLocalStorage(pannier)
  location.reload()
}



//-------------------Formulaire regExp------------------------
// on selection le formulaire dans le HTML
let form = document.querySelector('.cart__order__form');

//-------- Validation Prenom------------------
form.firstName.addEventListener('change', function(){
  validfirstName(this);
});
const validfirstName = function(inputfirstName){
 
  let firstNameRegExp = new RegExp ("^[A-Za-z ,']{3,20}$", 'g');
  let errorMsg = document.querySelector('#firstNameErrorMsg');

  if(firstNameRegExp.test(inputfirstName.value)){
    errorMsg.innerHTML= ""
    return true;
  }
  else{
    errorMsg.innerHTML= "Prénom non valide"
  }

};

//-------- Validation Nom------------------
form.lastName.addEventListener('change', function(){
  validlastName(this);
});
const validlastName = function(inputlastName){
 
  let lastNameRegExp = new RegExp ("^[A-Za-z ,']{3,20}$", 'g');
  let errorMsg = document.querySelector('#lastNameErrorMsg');

  if(lastNameRegExp.test(inputlastName.value)){
    errorMsg.innerHTML= ""
    return true;
  }
  else{
    errorMsg.innerHTML= "Nom non valide"
  }

};

//-------- Validation Adresse------------------
form.address.addEventListener('change', function(){
  validAddress(this);
});
const validAddress = function(inputAddress){
 
  let addressRegExp = new RegExp ("[A-Za-z0-9'\.\-\s\,]", 'g');
  let errorMsg = document.querySelector('#addressErrorMsg');

  if(addressRegExp.test(inputAddress.value)){
    errorMsg.innerHTML= ""
    return true;
  }
  else{
    errorMsg.innerHTML= "Address non valide"
  }

};

//-------- Validation Ville------------------
form.city.addEventListener('change', function(){
  validCity(this);
});
const validCity = function(inputCity){
 
  let cityRegExp = new RegExp ("^[A-Za-z ,.'-]{3,20}$", 'g');
  let errorMsg = document.querySelector('#cityErrorMsg');

  if(cityRegExp.test(inputCity.value)){
    errorMsg.innerHTML= ""
    return true;
  }
  else{
    errorMsg.innerHTML= "Ville non valide"
  }

};


//-------- Validation e-mail------------------
form.email.addEventListener('change', function(){
  validEmail(this);
});
const validEmail = function(inputEmail){
  //creation de la regExp pour la validation de l'email
  let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  let errorMsg = document.querySelector('#emailErrorMsg');

  if(emailRegExp.test(inputEmail.value)){
    errorMsg.innerHTML= ""
    return true;
  }
  else{
    errorMsg.innerHTML= "Email non valide"
  }

};




//---------------------Soumission du formulaire---------------------
form.addEventListener('submit', function(e){
  //par defaut rien ne se passe lorqu'on appuie sur submit
  e.preventDefault();
  // si tout les éléments sont true, le bouton commande renvoit vers la page confirmation 
  if(validfirstName(form.firstName) && validlastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)){
    recupInfoForm(this);
  }
});

function recupInfoForm(form) {
  const pannier = getLocalStorage();
  const body = {
    'contact': {
      'firstName': form.firstName.value,
      'lastName' : form.lastName.value,
      'address'  : form.address.value,
      'city'     : form.city.value,
      'email'    : form.email.value,
    },
    'products': Object.keys(pannier)
  }

  console.log(body);



  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then( res => res.json() ).then(
    js => {
      location.href =  `./confirmation.html?orderid=${js['orderId']}`
    })
  
}
