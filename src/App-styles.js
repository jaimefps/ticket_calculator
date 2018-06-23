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
      flex-direction: column;
      align-items: center;
      background-color: pink;
      padding: 10px 0;
    }

    .mode {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: coral;
    }

    .form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      background-color: lightgreen;
      margin: 10px 0;
    }
    
    label {
      width: 175px;
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
      outline: none;
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
      justify-content: center;
      background-color: lightblue;
      width: 100%;
      padding: 10px 0;
    }

  `),
}