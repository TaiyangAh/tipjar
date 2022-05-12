//引入web3对象
const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector("form");

if (window.ethereum) {
  form.classList.add("has-eth");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (window.ethereum) {
    const input = document.querySelector("input");
    send(input.value);
  } else {
    alert("Please install MetaMask");
  }
});

const send = async (amount) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const wei = web3.utils.toWei(amount);

  if (accounts.length > 0) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0x853bFDF175EEdcA95a013e4A6091c9b7b68f055E",
          value: web3.utils.toHex(wei),
        },
      ],
    });
  }
};
