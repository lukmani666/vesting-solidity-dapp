const { ethers } = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contrats with the account:", deployer.address);
    const OrganizationToken = await ethers.getContractFactory("OrganizationToken");
    const token = await OrganizationToken.deploy("My Token", "MTK", ethers.utils.parseUnits("1000000", 18));
    await token.deployed();
    console.log("Token deployed to:", token.address);

    const Vesting = await ethers.getContractFactory("Vesting");
    const vesting = await Vesting.deploy(token.address);

    await vesting.deployed();
    console.log("Vesting deployed to:", vesting.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1);
    });