const button = document.getElementById("convert-button")
const select = document.getElementById("currency_select")
const clearButton = document.getElementById("reset_btn")






const convertValues = async () => {

    const input = document.getElementById("inputValue").value
    const real = document.getElementById("real-value-text")
    const currencyValueText = document.getElementById("currency_value-text")

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json())

    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high

    real.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(input);

    if(select.value === "€ Euro"){

        currencyValueText.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(input / euro);
    

    }else if(select.value === "US$ Dólar americano"){


    currencyValueText.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(input / dolar);


    }else{

        currencyValueText.innerHTML = (input/bitcoin).toFixed(4)

    }

  

}


changeCurrency = () => {
    const currencyImage = document.getElementById("currency_img")
    const currencyName = document.getElementById("currency_name")
    convertValues()
   
    switch (select.value) {
        case "€ Euro":
            currencyImage.src = "./img/euro.svg"
            currencyName.innerText = select.value
          
            break;



        case "US$ Dólar americano":
            currencyImage.src = "./img/logo_eua.svg"
            currencyName.innerText = select.value
            break;



        default:
            currencyImage.src = "./img/bitcoin.svg"
            currencyName.innerText = select.value

            break;
    }



}

reset = () => {
    location.reload()
}

button.addEventListener('click', convertValues)
select.addEventListener('change', changeCurrency)
clearButton.addEventListener('click', reset)