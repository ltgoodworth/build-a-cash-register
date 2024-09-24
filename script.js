let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashValue = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

const userInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const totalPrice = document.getElementById("price-total");
const changeDisplay = document.getElementById("change-display");
const changeDue = document.getElementById("change-due");

let cash = 0;
let change = 0;

changeDue.innerText = "";

const setChangeDisplay = () => {
  changeDisplay.innerHTML = `
  <h4>Change in drawer:</h4>
          <p class="money">${cid[0]}</p>
          <p class="money">${cid[1]}</p>
          <p class="money">${cid[2]}</p>
          <p class="money">${cid[3]}</p>
          <p class="money">${cid[4]}</p>
          <p class="money">${cid[5]}</p>
          <p class="money">${cid[6]}</p>
          <p class="money">${cid[7]}</p>
          <p class="money">${cid[8]}</p>
`;
};

purchaseBtn.addEventListener("click", () => {
  
  cashCalculation();
});

const cashCalculation = () => {

  cash = Number(userInput.value) * 100;
  price = price * 100;
  change = Number(cash - price);
  

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
  } else {

    cid.reverse();
    cashValue.reverse();
     
    let result = `Status: OPEN\n`;
    let closed = `Status: CLOSED\n`;
    let count = 0;
    
    for (let i = 0; i < cid.length; i++) {
      cid[i][1] = cid[i][1] * 100;
      cashValue[i][1] = cashValue[i][1] * 100;
    while (change >= cashValue[i][1] && cid[i][1] !== 0) {
      count++;
      cid[i][1] -= cashValue[i][1];
      change -= cashValue[i][1];
    }

    if (count > 0) {
      result += `${cid[i][0]}: $${cashValue[i][1] * count / 100}\n`;
      closed += `${cid[i][0]}: $${cashValue[i][1] * count / 100}\n`;
    }    
    cid[i][1] = cid[i][1] / 100;
    cashValue[i][1] = cashValue[i][1] / 100;
    count = 0;
  } 

  let cidTotal = cid[0][1] + cid[1][1] + cid[2][1] + cid[3][1] + cid[4][1] + cid[5][1] + cid[6][1] + cid[7][1] + cid[8][1];

  cid.reverse();
  cashValue.reverse();
  
  if (change > 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (change === 0 && cidTotal === 0) {
    changeDue.innerText = closed;
  } else {
    changeDue.innerText = result;
  }
  
  
  } 

  setChangeDisplay();

};