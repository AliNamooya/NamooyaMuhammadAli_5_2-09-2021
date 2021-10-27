let produitDansLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
console.log(produitDansLocalStorage);


panierVide(produitDansLocalStorage);


//----------Panier vide ----------
function panierVide(produitDansLocalStorage){

if (produitDansLocalStorage === null) {
  let seeElement = document.querySelector('#cart__items');
  const emptyCart = 
  `  <H2>Le panier est vide</H2>  `;
 seeElement.innerHTML = emptyCart;

 //--------------- Affichage panier-----------------
} else {
  let seeElement = document.querySelector('#cart__items');
  let productCartArray =  [];

  for(k = 0; k < produitDansLocalStorage.length; k++){
    productCartArray = productCartArray + `
     <div>
     <p>ID =${produitDansLocalStorage[k][0]}</p>
     <p>Image = </p>
     <p>Nom = </p>
     <p>Prix = </p>
     <p>Quantité = ${produitDansLocalStorage[k][2]}</p>
     <p>Couleur = ${produitDansLocalStorage[k][1]}</p>
   </div>
   <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
   </div>   
    `;
  }
  if(k == produitDansLocalStorage.length){
    seeElement.innerHTML = productCartArray;
  }
}
}



//--------Supprimer l'article-------------

// let deleteBtn = document.querySelectorAll('.deleteItem');
// console.log(deleteBtn);
// for (let l = 0; 1 < deleteBtn.length; l++){
//   deleteBtn[l].addEventListener("click", () => {
//     let selectProductToDelete = produitDansLocalStorage[l].productId;
//   })
  
// }

