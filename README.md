### Query the Coin API - https://docs.coinapi.io/
Using their public API, retrieved the transactions of USD/BTC over the last 'N' events and extract the following information:
  - The average price for that period
  - The average trade size for that period

### The code
  - index.js file consist of business logic and calculates average price for given number of events
  - Repository directory consist of classes to make calls to api - specifically in this case coinapi
  - Configs are retrieved from config folder, we are using here to store api key of coinapi which could be changed non-dev environment using secrets or key-vault during deployment
  - Test folder consist of unit test for the application

### Output folder
The retrieved and extracted data is stored locally in output folder as a json file for further computation, file is also compressed with gz.

