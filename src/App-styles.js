import { css } from 'emotion';

export default {
  app: css(`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto;
    width: 450px;

    * {
     margin: 0;
     color: white;
    }

    .header {
      width: 100%;
      display: flex;
      justify-content: space-around;
      background-color: #9ACD32;
      padding: 20px 0;
    }

    .clear {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: coral;
    }

    .formContainer {
      margin: 10px 0;
      width: 100%;
    }

    .mode {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: orange;
    }

    .form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      background-color: pink;
    }
    
    label {
      width: 255px;
    }

    .dropdown {
      display: flex;
      justify-content: center;
      margin: 10px 0;
      padding: 4px;
    }

    .submitButton {
      border: 1px solid white;
      box-shadow: 2px 2px 1px grey;
      cursor: pointer;
      padding: 5px 20px;
      width: 100px;
      margin: 10px;
      color: black;
    }

    .submitButton:hover { 
      box-shadow: 4px 4px 2px grey;
      color: white;
      background-color: grey;
      border: 1px solid grey;
      box-shadow: 3px 3px 4px white;
    }

    .error {
      width: 100%;
      padding: 20px 0;
      background-color: red;
      font-weight: bold;
      text-align: center;
    }

    .result {
      display: flex;
      justify-content: space-around;
      background-color: lightblue;
      width: 100%;
      padding: 10px 0;
    }

  `),
}