# Color Match by joehannes

## Running locally

1. Clone the [repo](https://github.com/joehannes-jobs/lexie-color-alchemy)

2. Create a .env.local file in the root of the frontend directory and put:
```
WDS_SOCKET_HOST=0.0.0.0
WDS_SOCKET_PORT=0
```

3. Change to the backend/server dir and start the Backend:
    * `nvm use 14.17.3` ... you might need to install that node version first
    * `npm i`
    * `npm start`

4. Back in the frontend dir start the frontend dev server:
    * `nvm use`
    * `npm i`
    * `npm start`

