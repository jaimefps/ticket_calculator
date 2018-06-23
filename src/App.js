import React, { Component } from 'react';
import styles from './App-styles.js';
import emoji from 'node-emoji';

const Dropdown = ({ label, value, options, name, onChange }) => (
  <div className="dropdown">
    <label> {label} </label>
    <select value={value} name={name} onChange={onChange}>
      {
        options.map((opt, idx) => {
          if (Array.isArray(opt)) {
            return <option key={idx} value={opt[0]}>{opt[1]}</option>
          }
          return <option key={idx} value={opt}>{opt}</option>
        })
      }
    </select>
  </div>
);

const DEFAULT_STATE = {
  result: null,
  mode: '',
  form: {
    mixed_calls: "",
    new_calls: "",
    new_components: "",
    new_validations: "",
    ui_complexity: "",
  },
  error: false,
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clear = this.clear.bind(this);
  }

  /**
   * Gets emoji.
   * See: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
   * 
   * @param {string} name
   * @return {emoji}
   */
  getEmoji(name) {
    return emoji.get(name);
  }

  getResultEmoji() {
    const { result } = this.state;
    const emojiMap = {
      0: "mask",
      1: "sunglasses",
      2: "grinning",
      3: "slightly_smiling_face",
      5: "no_mouth",
      8: "cold_sweat",
      13: "scream",
    };
    console.log('in result:', result);
    const name = emojiMap[result] || "no_good";
    console.log('name:',name);
    return this.getEmoji(name);
  }

  calculate(e) {
    const incomplete = this.checkIncomplete();

    if (incomplete) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
        result: this.aproximate(),
      });
    }
  }

  aproximate() {
    const { form } = this.state;
    // const fibonacci = [0, 1, 2, 3, 5, 8, 13];
    const total = Object.values(form).reduce((a,b) => {
      return Number(a) + Number(b);
    }, 0);
    console.log('aproximate:', total);
    return total;
  }

  clear() {
    this.setState({
      result: null,
      mode: '',
      form: {
        mixed_calls: "",
        new_calls: "",
        new_components: "",
        new_validations: "",
        ui_complexity: "",
      },
      error: false,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({
      form,
    });
  }

  checkIncomplete() {
    const { form, mode } = this.state;
    return Object.values(form).includes("") || mode === "";
  }

  isBug() {
    this.setState({
      form: {
        mixed_calls: 0,
        new_calls: 0,
        new_components: 0,
        new_validations: 0,
        ui_complexity: 0,
      },
    });
  }

  render() {
    const { result, form, error, mode } = this.state;
    const basicOpts = [["", "Pick"], 0, 1, 2, 3, 4, 5, 6, 7];

    const fields = [{
      name: 'mixed_calls',
      label: 'Mixed of API Calls',
    }, {
      name: 'new_calls',
      label: 'New API Calls',
    }, {
      name: 'new_components',
      label: 'New Components',
    }, {
      name: 'new_validations',
      label: 'New Validations',
    }, {
      name: 'ui_complexity',
      label: 'Complexity of UI',
    }];

    return (
      <div className={styles.app}>

        <h1 className="header">
          {this.getEmoji('coffee')} Ticket Calculator {this.getEmoji('pizza')}
        </h1>

        <div className='mode'>
          <Dropdown
            name='mode'
            label='Mode'
            value={mode}
            options={[["", "Pick"], 'Safe', 'Yolo']}
            onChange={(e) => this.setState({ mode: e.target.value })}
          />
        </div>

        <div className="form">
          <button className="submitButton" onClick={this.clear}>Clear</button>

          {fields.map((x, idx) => (
            <Dropdown
              key={idx}
              name={x.name}
              label={x.label}
              value={form[x.name]}
              options={basicOpts}
              onChange={this.handleChange}
            />
          ))}

          <button className="submitButton" onClick={this.calculate}>Calculate</button>
        </div>
        { error &&
          <div className="error">
            Error: All fields required!
          </div>
        }
        {result !== null &&
          <h1 className="result">
            {this.getResultEmoji()} {result} {this.getResultEmoji()}
          </h1>
        }
      </div>
    );
  }
}

export default App;
