import IMask from "imask";

  const orderForm          = document.querySelector(".order-form");
  // const orderFormInputs    = document.querySelectorAll(".order-form input");
  const orderFormName      = document.querySelector(".order-form__name");
  const orderFormPhone     = document.querySelector(".order-form__phone");
  const orderFormMessage   = document.querySelector(".order-form__message");

  const nameErrorImg       = document.querySelector(".order-form__name-error-img");
  const phoneErrorImg      = document.querySelector(".order-form__phone-error-img");
  const messageErrorImg    = document.querySelector(".order-form__message-error-img");

  const namePlaceholder    = document.querySelector(".order-form__name-placeholder");
  const phonePlaceholder   = document.querySelector(".order-form__phone-placeholder");
  const messagePlaceholder = document.querySelector(".order-form__message-placeholder");

  const submitBtn = document.querySelector(".order-form__button");

  const sendMessageUrl = "/php/send-order-form.php";

  // let sendFlag = false; // Проверяем как отработали проверочные функции nameCheck(),
                        // которые возвращают true/false и присваиваем флагу true, если ошибок нет
  // submitBtn.disabled = "disabled";

// ОЖИДАЕМ ЗАГРУЗКУ ВСЕЙ СТРАНИЦЫ
window.onload = function () {

  const maskOptions = {
    mask: "+7 (000) 000-00-00",
    startsWith: "7",
    lazy: false,
    country: "Russia",
  };
  const mask = IMask(orderFormPhone, maskOptions);

  // РАБОТА С ПЛЕЙСХОЛДЕРАМИ, МАСКА ТЕЛЕФОНА
  orderFormName.addEventListener("focus", (e) => {
    namePlaceholder.classList.add("phMove");
  });
  orderFormName.addEventListener("blur", (e) => {
    if (orderFormName.value.trim() === "") namePlaceholder.classList.remove("phMove");
  });
  namePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormName.focus();
  });  

  orderFormPhone.addEventListener("focus", (e) => {
    phonePlaceholder.classList.add("phMove");
  });
  phonePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormPhone.focus();
  });
  orderFormPhone.addEventListener("blur", (e) => {
    // console.log("mask.unmaskedValue.length:", mask.unmaskedValue.length);
    if (mask.unmaskedValue.length < 1) {
      phonePlaceholder.classList.remove("phMove");
    }
  });  
  
  orderFormMessage.addEventListener("focus", (e) => {
    messagePlaceholder.classList.add("phMove");
  });
  orderFormMessage.addEventListener("blur", (e) => {
    if (orderFormMessage.value.length < 1) {
      messagePlaceholder.classList.remove("phMove");
    }
  });
  messagePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormMessage.focus();
  });



  // ОБРАБОТКА ОШИБОК
  orderFormName.value = "";
  orderFormPhone.value = "";
  orderFormPhone.value = "+7 (___) ___-__-__";
  mask.updateValue();
  orderFormPhone.click();
  orderFormMessage.value = "";

  function nameCheck() {
    let orderFormNameValue = orderFormName.value.trim();
    if (orderFormNameValue.length < 2) {
      nameErrorImg.style.opacity = "1";
      if (orderFormName.classList.contains("checked")) {
        orderFormName.classList.remove("checked");
        nameErrorImg.setAttribute("src", "/img/order/exclamation.svg");
      }
      return false;
    } else if (orderFormNameValue.length >= 2) {
      nameErrorImg.setAttribute("src", "/img/order/checked.svg");
      orderFormName.classList.add("checked");
      return true;
    }
  }
  function phoneCheck() {
    let orderFormPhoneValue = orderFormPhone.value.trim();
    if (orderFormPhoneValue.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/) == null) {
      phoneErrorImg.style.opacity = "1";
      if (orderFormPhone.classList.contains("checked")) {
        orderFormPhone.classList.remove("checked");
        phoneErrorImg.setAttribute("src", "/img/order/exclamation.svg");
      }
      return false;
    } else if (orderFormPhoneValue.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/) != null) {
      phoneErrorImg.setAttribute("src", "/img/order/checked.svg");
      orderFormPhone.classList.add("checked");
      return true;
    }
  }
  function messageCheck() {
    let orderFormMessageValue = orderFormMessage.value.trim();
    if (orderFormMessageValue.length < 10) {
      messageErrorImg.style.opacity = "1";
      if (orderFormMessage.classList.contains("checked")) {
        orderFormMessage.classList.remove("checked");
        messageErrorImg.setAttribute("src", "/img/order/exclamation.svg");
      }
      return false;
    } else if (orderFormMessageValue.length >= 10) {
      messageErrorImg.setAttribute("src", "/img/order/checked.svg");
      orderFormMessage.classList.add("checked");
      return true;
    }
  }


  
  orderFormName.addEventListener("keyup", (e) => {
    nameCheck();
  });
  orderFormName.addEventListener("blur", (e) => {
    nameCheck();
  });

  orderFormPhone.addEventListener("focus", (e) => {
    mask.updateValue();
  });
  orderFormPhone.addEventListener("keyup", (e) => {
    phoneCheck();
  });
  orderFormPhone.addEventListener("blur", (e) => {
    phoneCheck();    
  });

  orderFormMessage.addEventListener("keyup", (e) => {
    messageCheck();
  });
  orderFormMessage.addEventListener("blur", (e) => {
    messageCheck();
  });  

  // AJAX
  // функция очистки
  function cleanForm() {
    orderFormName.value = "";
    orderFormPhone.value = "+7 (___) ___-__-__";
    mask.updateValue();
    orderFormMessage.value = "";
    orderFormMessage.classList.remove("no-before");

    namePlaceholder.classList.remove("phMove");
    phonePlaceholder.classList.remove("phMove");
    messagePlaceholder.classList.remove("phMove");

    nameErrorImg.style.opacity = "0";
    phoneErrorImg.style.opacity = "0";
    messageErrorImg.style.opacity = "0";
  }

  // Функция отправки формы fetch
  async function postData(sendMessageUrl, data = {}) {
    const response = await fetch(sendMessageUrl, {
      method: "POST",
      body: data,
    });
    return await response.json();
  }

  // отправка
  // при отправке формы любым способом
  orderForm.addEventListener("submit", function (e) {
    // запрещаем стандартное действие
    e.preventDefault();
    // создаем объект новый
    let data = new FormData(orderForm);

    // передаем в фукцию fetch данные и получаем результат
    postData("/php/send-order-form.php", data).then((data) => {
      // обработка ответа от сервера
      if (nameCheck() === false) return false;
      if (phoneCheck() === false) return false;
      if (messageCheck() === false) return false;
      
      if (data.error == "") {
        alert(data.success);
        cleanForm();
      } else {
        alert(data.error);
      }
    });
  });
};