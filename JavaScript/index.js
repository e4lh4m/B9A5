const setValById = (id, val) => {
  document.getElementById(id).innerText = val;
};

const totalP = (id, val) => {
  //total price
  const total = parseInt(document.getElementById(id).innerText);
  setValById(id, total + parseInt(val));
};

const getValById = (id) => {
  return document.getElementById(id).value;
};

const btns = document.querySelectorAll('#add-seat');
let count1 = 0, count2 = 40;

const handleSeatSelection = (e) => {
  // Seewt select
  if (count1 <= 3) {
    count1++;
    count2--;
    totalP("total-price", document.getElementById("seat-per-pay").innerText);
    const selArea = e.target.innerText;
    const price = document.getElementById("seat-per-pay").innerText;
    const div = document.createElement("div");
    div.innerHTML = `<h4>${selArea}</h4><h4>Economy</h4><h4>${price}</h4>`;
    div.className = "flex justify-between w-full text-left mb-4";
    document.getElementById("selected-container").appendChild(div);
    e.target.classList.add("text-white", "bg-[#1DD100]", "pointer-events-none");
  } else {
    // alert if select mr tn 4 seat
    alert("You can only select four seats");
  }

  setValById("seat-count", count1);
  setValById("seat-left", count2);
  grandTotal();

  const button = document.getElementById("modal-btn");
  if (document.getElementById("number-phone").value.length > 0 && count1 > 0) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
};


for (const btn of btns) {
  btn.addEventListener('click', handleSeatSelection);
}

const grandTotal = () => {
  // cpn add and calculate 
  setValById("grand-total", parseInt(document.getElementById("total-price").innerText));
};
document.getElementById("apply").addEventListener("click", () => {
  const inputCpn = getValById("cpn");
  const total = parseInt(document.getElementById("total-price").innerText);
  let discount = 0;
  
  switch (inputCpn) {
    case "NEW15":
      discount = total * 0.15;
      break;
    case "Couple 20":
      discount = total * 0.2;
      break;
    default:

      //Wrong cpn
      alert("Invalid Coupon");
      return;
  }

  document.getElementById("discount").innerText = discount;
  setValById("grand-total", total - discount);
  document.getElementById("hidden").className = "hidden";
  document.getElementById("discount-percent").classList.remove("hidden");
});
