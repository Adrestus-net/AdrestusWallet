# AdrestusWallet
Officially supported wallet of Adrestus cryptocurrency publicly available **Under Maintenance**
## Overview
Welcome to the code that powers Adrestus Wallet! This repo will always 
contain the source code for the latest publicly available Adrestus Wallet 
version. We want to make sure that we focus not only on great features 
and experiences but also security, transparency, and community involvement.
## Features

- [x] Create/Import the wallet with Mnemonic, Private Key and Adrestus keystore
- [x] Deposit with the QR code.
- [x] Switch the network to Mainnet, Testnet or Localnet.
- [x] Send & receive ADR tokens (support the ledger wallet).
- [x] Export private key
- [x] View transaction history .
- [x] Provide the api for signing the transaction
- [x] Support our project
- [x] LockDashboard the wallet with the 4/6 digits PIN Code
- [x] Auto lock the wallet after timeout
- [x] Set the pin code, pin digits and lock timer on the settings
- [x] Add/Delete/Edit the contacts
- [ ] View and revoke the accounts connected to the third-party website
- [x] View the USD balance on the main page

## Development

- Install [node.js](https://nodejs.org/) and npm
- Install dependencies :
  ```
  npm install
  ```
- Run the project :
  ```
  npm run dev
  ```
- Go to Chrome Extensions page and activate the Developer Mode.
- Click `Load Unpacked` button and point it to `/dist` folder, the extension will be autoreloading as you change the codes.

## Build Frontend Extension

- Install [node.js](https://nodejs.org/) and npm.
- Navigate to the frontend path
  ```
  cd frontend-react-basic-app/
  ```
- Delete the following if folder  exists
  ```
  rm -rf node_modules/
  ```
- Install dependencies :
  ```
  sudo npm install
  ```
- Navigate to the following line of code at `config/Testnet.js` on your local repo [ChangeIP](https://github.com/Adrestus-net/AdrestusWallet/blob/master/frontend-react-basic-app/src/config/Testnet.js) and copy-paste your local ip.
  ```
  const Testnet = {
    LOGIN_URL:"http://ChangeIP:8080/authenticate",
    REGISTER_URL:"http://ChangeIP:8080/register",
    REFRESH_URL:"http://ChangeIP:8080/refreshtoken",
    TRANSACTION_URL:"http://ChangeIP:8080/api/v1/transaction/"
  }
  module.exports = Testnet;
  ```
- Run the project :
  ```
  npm start
  ```
- Navigate to the following link and check if working: **use localhost and NOT local ip like the above**
  ```
  http://localhost:3000/Register?
  ```
- Uncompressed build can be found in `/dist` folder, compressed build is `onewallet.zip`.
- Go to Chrome Extensions page and activate the Developer Mode.
- Click `Load Unpacked` button and point it to `/dist` folder.

---
## Build BackEnd Extension
- Make sure you start the mysql database with docker there is exist a docker compose.yml file
  ```
  cd frontend-react-basic-app/
  sudo docker compose up
  ```
- Open the project with IntelliJ and make sure you run the following commands
  `clean`, `Install`, `assembly:single`

- Navigate to the Backend path and run the jar backend
  ```
  cd backend-spring-boot-app\target
  java -jar original-backend-spring-boot-app-1.0-SNAPSHOT.jar
  ```
---

## Contributing
While our community is always welcome to contribute, please note that
new feature development happens outside of this repo which means that 
open issues/PRs might not see a lot of activity. We do this in order to
make sure that all code that is pushed here has passed our rigorous QA 
testing and high security standards. That being said, we’ll do our best 
to take note of feature requests or additions  some of which we might 
potentially incorporate into our codebase via our main development pipeline.


If you simply need help, want to report a bug, or want to suggest a feature, the best place to do so is via our officially repository:
- [Github](https://github.com/Adrestus-net/Adrestus)

And if you need support, our support knowledgebase and contact channels are here: [AdrestusWallet.app/support](https://www.adrestus.net/)