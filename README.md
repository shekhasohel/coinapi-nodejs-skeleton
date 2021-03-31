### Query the Coin API - https://docs.coinapi.io/
This sample app makes call to Coin API and retrieves the transactions of USD/BTC over the last 'N' number of events and extract the following information:
  - The average price for that period
  - The average trade size for that period

### The code
  - index.js file consist of business logic and calculates average price for given number of events
  - Repository directory consist of classes to make calls to api - specifically in this case, Coin API
  - Configs are retrieved from config folder, we are using this to store api key of coin api which could be changed for non-dev environment using secrets or key-vault in deployment
  - Test folder consist of unit test for the application

### Output folder
The retrieved and extracted data is stored locally in the output folder as a json file for further computation, file is also compressed with gz.

