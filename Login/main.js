var $ = document.querySelector.bind(document);
function ValidatorSignIn(data) {
  const formElement = $(data.form);
  if (formElement) {
    const btnSubmit = $(data.submit);
    const clickOnChange = $(data.changeForm);
    clickOnChange.onclick = (e) => {
      formElement.classList.toggle("active");
      $(data.formSignUp).classList.toggle("active");
    };
    formElement.onsubmit = (e) => {
      e.preventDefault();
      var enableInput = formElement.querySelectorAll("[name]");
      var formValues = Array.from(enableInput).reduce((values, input) => {
        values[input.name] = input.value;
        return values;
      }, {});
      data.onSubmit(formValues);
    };
  }
}
function ValidatorSignUp(data) {
  const formElement = $(data.form);
  if (formElement) {
    const btnSubmit = $(data.submit);
    const clickOnChange = $(data.changeForm);
    clickOnChange.onclick = (e) => {
      formElement.classList.toggle("active");
      $(data.formSignIn).classList.toggle("active");
    };
    formElement.onsubmit = (e) => {
      e.preventDefault();
      var enableInput = formElement.querySelectorAll("[name]");
      var formValues = Array.from(enableInput).reduce((values, input) => {
        values[input.name] = input.value;
        return values;
      }, {});
      data.onSubmit(formValues);
    };
  }
}
function getAccountUser(dataAccounts, dataInput) {
  var accountInput = {};
  var accountID = dataAccounts.find((data) => {
    if (data.id == dataInput.id && data.pass == dataInput.pass) return data;
  });
  if (accountID)
    accountInput = {
      ...accountID,
    };
  // console.log(accountInput);
  return accountInput;
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
function fetchJSON(pathToResource, callback) {
  fetch(pathToResource)
    .then(validateResponse)
    .then(function (response) {
      return response.json();
    })
    .then(callback)
    .catch(function (error) {
      console.log("Looks like there was a problem: \n", error);
    });
}
function loginAccount(url, dataInput) {
  // console.log(accountInput);
  fetchJSON(url, function (dataAccounts) {
    var accountUserID = dataAccounts.find((data) => {
      if (data.id == dataInput.id && data.pass == dataInput.pass) return data;
    });
    if (
      accountUserID !== undefined &&
      accountUserID.id == dataInput.id &&
      accountUserID.pass == dataInput.pass
    )
      alert("dang nhap thanh cong");
    else alert("dang nhap that bai");
  });
}

function creatAccount2(url, dataInput) {
  fetchJSON(url, function (dataAccounts) {
    var findAccount = dataAccounts.find((data) => {
      return data.id == dataInput.id;
    });
    if (findAccount !== undefined) alert("Trùng tài khoản đăng nhập");
    else {
      var options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInput),
      };
      fetch(url, options).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        alert("Đăng ký thành công");
        return response.json();
      });
    }
  });
}
