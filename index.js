  /*Get the from and to select elements */
 const fromSelect = document.querySelector('#from');
 const toSelect = document.querySelector('#to');

 /*Make an API call to get the list of currencies */
 fetch('https://api.exchangerate.host/symbols')
   .then((response) => {
    /*Convert the response to JSON */
     return response.json();
   })
   .then((data) => {
     /*Get the list of currency codes */
     const currencies = data.symbols;
     /* Create an option element for each currency code*/
     for (const code in currencies) {
       const option = document.createElement('option');
     /*   console.log(code)*/
       option.value = code;
       option.textContent = code;
       /* Add the option element to the from and to select elements*/
       fromSelect.appendChild(option.cloneNode(true));
       toSelect.appendChild(option.cloneNode(true));
     }
   })
   .catch((error) => {
    /* Handle any errors that may occur*/
     console.error(error);
   });

 /* Get the form element*/
 const form = document.querySelector('form');

 /* Add an event listener for the submit event*/
 form.addEventListener('submit', (event) => {
  /* Prevent the default action of the form submission*/
   event.preventDefault();

   /* Perform the currency conversion and update the page*/
   convertCurrency();
 });

 function convertCurrency() {
   /* Get the amount, from, and to values from the form*/
   const amount = document.querySelector('#amount').value;
   const from = document.querySelector('#from').value;
   const to = document.querySelector('#to').value;

   /* Make an API call to convert the currency*/
   fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
     .then((response) => {
       /* Convert the response to JSON*/
       return response.json();
     }).then((data) => {
/* Check if the conversion was successful*/
if (data.success) {
/* Update the converted amount */
const converted_Amount = data.result;
document.querySelector('#converted_Amount').textContent = converted_Amount;
} else {
/* Display an error message */
alert(data.error);
}
})
.catch((error) => {
/* Handle any errors that may occur */
console.error(error);
});
}