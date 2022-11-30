//RECUPERATION LOCALSTORAGE
let showProduct = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("basket"));

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

firstName.addEventListener("change", () => {
  if (regexOnlyLetter.test(firstName.value) === false) {
    firstNameError.innerHTML += `${"Veuillez renseignez un nom sans caractère spécial"}`;
  }
});
lastName.addEventListener("change", () => {
  if (regexOnlyLetter.test(lastName.value) === false) {
    lastNameError.innerHTML += `${"Veuillez renseignez un nom sans caractère spécial"}`;
  }
});
address.addEventListener("change", () => {
  let regexAdress =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.'-]+$/u;
  if (regexAdress.test(address.value) === false) {
    addressError.innerHTML += `${"Veuillez renseigner une adresse correct"}`;
  }
});
city.addEventListener("change", () => {
  if (regexOnlyLetter.test(city.value) === false) {
    cityError.innerHTML += `${"Veuillez renseignez un nom sans caractère spécial"}`;
  }
});
email.addEventListener("change", () => {
  let regexEmail = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regexEmail.test(email.value) === false) {
    emailError.innerHTML += `${"Veuillez renseigner un email correct"}`;
  }
});

//CREATION DE L'EVENEMENT

let submitForm = document.querySelector("#order");
let form = document.querySelector(".cart__order__form");
let inputForm = form.querySelectorAll("input");
submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(inputForm);

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
      return console.log(data);
    })
    .catch((err) => console.log(err));
});
