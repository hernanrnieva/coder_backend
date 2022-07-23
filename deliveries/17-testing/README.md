# backend_d17
17th delivery for CoderHouse's Backend Dev. course

## Clone

Use the below command to clone into an empty repository

```bash
git clone https://github.com/hernanrnieva/backend_d17.git .
```

## Usage

### Install dependencies

```bash
npm install
```

#### Run

```bash
npm start
```

Start from the [Home](http://localhost:8080/login) section

### Tests

npm test

## Considerations

- Immutability of the Factory instance is checked in [Factory Date route](http://localhost:8080/test/factory)
- Persistence mode is defined by variables in .env file, not command lines
- MessageDTO is not used because of the existing usage of normalized data
- UserDTO is not used because of the existing usage of passport module
- Tests are run on a separate route a controller due to main one using renders and not responding values ideal for testing