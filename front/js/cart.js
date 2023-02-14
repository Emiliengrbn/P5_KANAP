//RECUPERATION LOCALSTORAGE
let basket = JSON.parse(localStorage.getItem("basket"));

let showProduct = document.getElementById("cart__items");
//APPEL DE L'API
fetch(`http://localhost:3000/api/products/`)
  .then((res) => res.json())
  .then((products) => {
    //RECUPERATION DES OBJETS DANS L'API
    basket.forEach((b) => {
      let foundProductId = products.find((p) => p._id == b.id);
      showProduct.innerHTML += `<article class="cart__item" data-id="${b.id}" data-color="${b.color}">
          <div class="cart__item__img">
            <img src="${foundProductId.imageUrl}" alt="${foundProductId.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${foundProductId.name}</h2>
              <p>${b.color}</p>
              <p>${foundProductId.price} €</p>
              </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${b.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
              </div>
              </div>
              </article>`;
      totalPriceBasket();
      totalQuantity();
    });

    function totalPriceBasket() {
      const price = document.getElementById("totalPrice");
      tP = 0;
      basket.forEach((b) => {
        let foundProductId = products.find((p) => p._id == b.id);
        let totalPrice = foundProductId.price * b.quantity;
        tP += totalPrice;
        price.innerHTML = tP;
      });
    }

    // ADDITIONNER LES QUANTITEES
    function totalQuantity() {
      const quantity = document.getElementById("totalQuantity");
      const resultTotal = basket.reduce(
        (total, product) => total + product.quantity,
        0
      );
      quantity.innerHTML = resultTotal;
    }

    // MODIFICATION QUANTITES

    let inputQuantity = document.querySelectorAll(".itemQuantity");
    inputQuantity.forEach((q, i) => {
      q.addEventListener("change", () => {
        basket[i].quantity = parseInt(q.value);
        localStorage.setItem("basket", JSON.stringify(basket));
        totalPriceBasket();
        totalQuantity();
      });
    });

    // SUPPRIMER UN PRODUIT DANS LE PANIER

    let deleteItem = document.querySelectorAll(".deleteItem");
    deleteItem.forEach((d, i) => {
      d.addEventListener("click", () => {
        basket.splice(i, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        location.reload();
        if (basket.length === 0) {
          localStorage.clear();
        }
      });
    });
  })
  .catch(function (err) {
    console.log(err);
  });

// // //----------------------------------------------------------------------------------------------------------

//VERIFICATION DU FORMULAIRE
let firstName = document.getElementById("firstName");
let firstNameError = document.getElementById("firstNameErrorMsg");
let lastName = document.getElementById("lastName");
let lastNameError = document.getElementById("lastNameErrorMsg");
let address = document.getElementById("address");
let addressError = document.getElementById("addressErrorMsg");
let city = document.getElementById("city");
let cityError = document.getElementById("cityErrorMsg");
let email = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg");
let regexOnlyLetter =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
let firstNameCheck = false;
let lastNameCheck = false;
let addressCheck = false;
let cityCheck = false;
let emailCheck = false;

firstName.addEventListener("change", () => {
  if (regexOnlyLetter.test(firstName.value) === false) {
    firstNameError.innerHTML =
      "Veuillez renseignez un nom sans caractère spécial";
    firstNameCheck = false;
  } else {
    firstNameError.innerHTML = "";
    firstNameCheck = true;
  }
});

// ajouter un evenement au changement sur le input id firstName
// si la valeur de l'input firstName ne correspond pas au regex onlyletter
// j'affiche un message pour informer l'utilisateur
//je bloque la possiblilité d'envoyer le fetch
// sinon je vide le message d'erreur et j'ouvre la possiblité d'evoyé le fetch

lastName.addEventListener("change", () => {
  if (regexOnlyLetter.test(lastName.value) === false) {
    lastNameError.innerHTML =
      "Veuillez renseignez un nom sans caractère spécial";
    lastNameCheck = false;
  } else {
    lastNameError.innerHTML = "";
    lastNameCheck = true;
  }
});
address.addEventListener("change", () => {
  let regexAdress =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.'-]+$/u;
  if (regexAdress.test(address.value) === false) {
    addressError.innerHTML = "Veuillez renseigner une adresse correct";
    addressCheck = false;
  } else {
    addressError.innerHTML = "";
    addressCheck = true;
  }
});
city.addEventListener("change", () => {
  if (regexOnlyLetter.test(city.value) === false) {
    cityError.innerHTML = "Veuillez renseignez un nom sans caractère spécial";
    cityCheck = false;
  } else {
    cityError.innerHTML = "";
    cityCheck = true;
  }
});
email.addEventListener("change", () => {
  let regexEmail = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regexEmail.test(email.value) === false) {
    emailError.innerHTML = "Veuillez renseigner un email correct";
    emailCheck = false;
  } else {
    emailError.innerHTML = "";
    emailCheck = true;
  }
});

if (localStorage.length === 0) {
  alert("Votre panier est vide");
}
//CREATION DE L'EVENEMENT

let submitForm = document.querySelector("#order");
let form = document.querySelector(".cart__order__form");
let inputForm = form.querySelectorAll("input");
submitForm.addEventListener("click", (e) => {
  e.preventDefault();

  if (localStorage.length === 0) {
    alert("Votre panier est vide");
  }

  //RECUPERATION DES ID
  let ids = [];
  basket.forEach((b) => {
    let id = b.id;
    ids.push(id);
  });

  //CREATION DE L'OBJET CONTACT
  let body = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: ids,
  };

  if (
    firstNameCheck &&
    lastNameCheck &&
    addressCheck &&
    cityCheck &&
    emailCheck
  ) {
    //ENVOI DES INFOS A L'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //REDIRECTION VERS LA PAGE CONFIRMATION
        let orderId = data.orderId;
        window.location.href = "./confirmation.html" + "?orderId=" + orderId;
      })
      .catch((err) => console.log(err));
  } else {
    alert("Merci de remplir le formulaire correctement");
  }
});
