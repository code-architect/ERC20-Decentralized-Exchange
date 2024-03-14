const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;


const tokenAbi = [
    "constructor(uint256 initialSupply)",
    "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
    "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
    "error ERC20InvalidApprover(address approver)",
    "error ERC20InvalidReceiver(address receiver)",
    "error ERC20InvalidSender(address sender)",
    "error ERC20InvalidSpender(address spender)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 value) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint256 value) returns (bool)",
    "function transferFrom(address from, address to, uint256 value) returns (bool)"
];
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let tokenContract = null;

const cacAbi = [
    "constructor(address _token, uint256 _price)",
    "function associatedToken() view returns (address)",
    "function buy(uint256 numTokens) payable",
    "function getToenBalance() view returns (uint256)",
    "function getprice(uint256 numTokens) view returns (uint256)",
    "function sell()",
    "function withdrawFunds()",
    "function withdrawTokens()"
];
const cacAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
let cacContract = null;

async function getAccess()
{
    if(tokenContract) return;
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
    cacContract = new ethers.Contract(cacAddress, cacAbi, signer);    
}

async function getPrice()
{
    await getAccess();
    const price = await cacContract.getprice(1);
    document.getElementById("tokenPrice").innerHTML = price;
    return price;
}

async function getTokenBalance()
{
    await getAccess();    
    const balance = await tokenContract.balanceOf(await signer.getAddress());
    document.getElementById("tokenBalance").innerHTML = balance;
}

async function getTokensAvailable()
{
    await getAccess();
    const tokens = await cacContract.getToenBalance();
    document.getElementById("tokensAvailable").innerHTML = tokens;
}


async function grantAccess()
{
    await getAccess();
    const value = document.getElementById("tokenGrant").value;
    await tokenContract.approve(cacAddress, value).then(() => alert("Success")).catch((error) => alert(error));
}

async function sell()
{
    await getAccess();
    await cacContract.sell().then(() => alert("Success")).catch((error) => alert(error));
}

async function buyTokens()
{
    await getAccess();
    const tokenAmount = document.getElementById("tokensToBuy").value;
    const value = (await getPrice()) * tokenAmount;
    await cacContract.buy(tokenAmount, {value: value}).then(() => alert("Success")).catch((error) => alert(error));
}
