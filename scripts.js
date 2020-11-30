const notyf = new Notyf({
  types: [
    {
      position: {
        x: 'center',
        y: 'bottom',
      },
      type: 'info',
      icon: false,
      className: 'toast',
      dismissible: true,
      duration: 5000,
    },
  ],
});

window.onload = () => {
  checkTheme();
  refreshCard();
};

function setTheme(input) {
  const el = document.getElementById('particles-js');
  if (input.checked) {
    el.className = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    el.className = 'light';
    localStorage.setItem('theme', 'light');
  }
}

function setLanguage(input) {
  // TODO IBM Watson Translation API
  if (input.checked) {
    notyf.open({
      type: 'info',
      message: 'Not implemented yet',
    });
  }
}

function checkTheme() {
  const local = localStorage.getItem('theme');
  if (local === 'dark') {
    document.getElementById('particles-js').className = local;
    document.getElementById('theme-input').checked = true;
  }
}

function refreshCard() {
  showSpinner();
  hideUpper();
  hideLower();
  async function getJoke() {
    let response = await fetch('https://sv443.net/jokeapi/v2/joke/Any');
    let data = await response.json();
    return data;
  }

  getJoke().then((data) => {
    hideSpinner();
    console.log(data);
    if (data.joke) {
      document.getElementById('upper').textContent = data.joke;
      showUpper();
    } else {
      document.getElementById('upper').textContent = data.setup;
      document.getElementById('lower').textContent = data.delivery;
      showUpper();
      showLower();
    }
  });
}

function hideSpinner() {
  document.getElementsByClassName('spinner-ripple')[0].style.display = 'none';
}

function showSpinner() {
  document.getElementsByClassName('spinner-ripple')[0].style.display = '';
}

function hideUpper() {
  document.getElementById('upper').style.display = 'none';
}

function showUpper() {
  document.getElementById('upper').style.display = '';
}

function hideLower() {
  document.getElementById('lower').style.display = 'none';
}

function showLower() {
  document.getElementById('lower').style.display = '';
}
