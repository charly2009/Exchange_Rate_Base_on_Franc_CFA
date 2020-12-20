const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    /**
     * firstly take the value of the currency one so we put ${currency_one} after the api link
     * in this case preselected value is usd dollar but we can select which we want
     * all currency value are in id currency-one.
     * we convert the value in json format in res and then extract the data from it 
     * 
     */
  const currency_one = currencyEl_one.value; // take the currency value 
  const currency_two = currencyEl_two.value;

  fetch('Currencies_Values.json')
    .then(res => res.json())
    .then(data => {
      //const rate = extract values of the currencies two from rates in api.exchange 
      const rate = data.rates[currency_two];
      const rate1 = data.rates[currency_one];
      
      
        // rateE1 is to display the result of exchange
        
      
        /**
         * according the selected currencies the amount_two value is equal
         * to the value of input 1 per rate which is value is from api.exchange
         * tpFixed(2) means 2 numbers after the comma
         * 
         */
        const base = 'XOF'
        const cfa = 5/`${rate1}`;
        if(currency_one === base){
          
        rateEl.innerText = `5 ${currency_one} = ${rate.toFixed(5)} ${currency_two} `;

        };
        if(currency_one !== base && currency_two=== base){ 
          rateEl.innerText = `1 ${currency_one} = ${cfa.toFixed(3)} ${currency_two}` ;
        };

   //amountEl_two.value = ((amountEl_one.value * rate)).toFixed(2);
        if(currency_one === base && currency_two!== base) {
          amountEl_two.value = ((amountEl_one.value * rate)/5).toFixed(3); 
        }else{
          amountEl_two.value = ((amountEl_one.value * cfa).toFixed(3)); 
       }

    })
  
  }
  
// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

/**
 * swap button is allowed to switch values from first one to second one
 * and it will run function calculate
 */
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate()
});

calculate();


