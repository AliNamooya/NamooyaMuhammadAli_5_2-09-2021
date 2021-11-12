let str = window.location.href;
let url = new URL(str);
let productId = url.searchParams.get("id");
console.log(productId);


// Récupération des articles de l'API grace a l'ID. On ajoute l'ID que l'on a recuperer a la fin de l'URl grace a la variable productId a la fin de l'url
function getProduct() {
    fetch("http://localhost:3000/api/products/" + productId)
    .then(function (response) {
        return response.json();
    })
    .catch((error) => {
        console.log("Erreur");
    })

    // Inserer les données de l'API dans le HTML (DOM) grace à la fonction viewProduct.
    .then(function (viewProduct) {
        const product = viewProduct;
        console.log(product);

        // Insertion de l'image
        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = product.imageUrl;
        productImg.alt = product.altTxt;

        // Modification du titre 
        let productName = document.querySelector('#title');
        productName.innerHTML = product.name;

        // Modification du prix
        let productPrice = document.querySelector('#price');
        productPrice.innerHTML = product.price;

        // Modification de la description
        let productDescription = document.querySelector('#description');
        productDescription.innerHTML = product.description;

        // Options de couleur. la boucle for parcours tous les éléments du key = 'colors'
        // La variable productColors insere les options de couleurs dans le HTML (DOM)
      


         for (let colors of product.colors){
           console.log(colors);
           let productColors = document.createElement("option");
             document.querySelector("#colors").appendChild(productColors);
             productColors.value = colors;
        productColors.innerHTML = colors;
     }


    });
//-------------Panier-------------------
     const addToCartBtn = document.getElementById("addToCart");
     addToCartBtn.addEventListener("click", () => {
         // Envoyer vers le localStorage
    
        
         let productColor = document.getElementById("colors").value;
         let productQuantity = document.getElementById("quantity").value;
         


         // si la couleur n'est pas renseigner, afficher l'alerte
         if (productColor == "") {
              alert("Choississez une couleur");
              // si la quantité est à 0 ou supérieur à 100, afficher l'alerte
          } else if (productQuantity == 0 || productQuantity >= 101) {
             alert("Choississez une quantitée valable");
          } else {
              
              let productInCart = localStorage.getItem('productInCart');
            
              // si le localstorage est vide, crée un tableau avec les 3 éléments
              if (productInCart === null){
                 let cartArray = [[productId, productColor, parseInt(productQuantity)]];

                 let cartArrayStr = JSON.stringify(cartArray) 
                 localStorage.setItem('productInCart', cartArrayStr)

             }
            
             // s'il y a déja des éléments dans le localstorage, push ces éléments dans le tableau
             else {
                 let cartArray = JSON.parse(productInCart);
                
                 cartArray.push ([productId, productColor, productQuantity])
                 let cartArrayStr = JSON.stringify(cartArray) 
                 localStorage.setItem('productInCart', cartArrayStr)


                 // cumuler les quantitées ici
                 
             }


             // ouvrir cart.html si tous les éléments sont validés
                 window.location.href = "./cart.html";
        }
     });

}
getProduct();