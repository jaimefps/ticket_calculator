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

const Checkbox = ({ isChecked, onChange, label }) => (
  <div className="checkbox">
    <label> {label} </label>
    <input
      type="checkbox"
      value="bug"
      checked={isChecked}
      onChange={onChange}
    />
  </div>
);

const DEFAULT_STATE = {
  mode: "",
  form: {
    mixed_calls: "",
    new_calls: "",
    new_components: "",
    new_validations: "",
    ui_complexity: "",
  },
  isBug: false,
  error: false,
  result: null,
};

const SAFE_MODE = 'safe';
const YOLO_MODE = 'yolo';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.clear = this.clear.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  /**
   * Gets emoji.
   * 
   * @param {string} name
   * @return {emoji}
   */
  getEmoji(name) {
    return emoji.get(name);
  }

  /**
   * See: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
   */
  getResultEmoji() {
    const { result } = this.state;
    const emojiMap = {
      0: "bug",
      1: "sunglasses",
      2: "grinning",
      3: "slightly_smiling_face",
      5: "no_mouth",
      8: "cold_sweat",
      13: "scream",
    };
    const name = emojiMap[result] || "no_good";
    return this.getEmoji(name);
  }

  submit(e) {
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
    let result;
    const { form, mode } = this.state;
    const fibonacci = [0, 1, 2, 3, 5, 8, 13];

    const total = Object.values(form)
      .reduce((a,b) => {
        return Number(a) + Number(b);
      }, 0);

    if (fibonacci.includes(total)) {
      return total;
    }

    for (let i = 0; i < fibonacci.length; i++) {
      if (total >= fibonacci[i] && total <= fibonacci[i+1]) {
        if (mode === SAFE_MODE) {
          result = fibonacci[i+1];
          break;
        } else if (mode === YOLO_MODE) {
          result = fibonacci[i];
          break;
        }
      }
    }

    return result ? result : total;
  }

  clear() {
    this.setState({
      mode: "",
      form: {
        mixed_calls: "",
        new_calls: "",
        new_components: "",
        new_validations: "",
        ui_complexity: "",
      },
      isBug: false,
      error: false,
      result: null,
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

  handleCheckbox (e) {
    const { isBug } = this.state;

    if (!isBug) {
      this.setState({
        mode: SAFE_MODE,
        form: {
          mixed_calls: "0",
          new_calls: "0",
          new_components: "0",
          new_validations: "0",
          ui_complexity: "0",
        },
        isBug: true,
        error: false,
        result: 0,
      });
    } else {
      this.clear();
    }
  }

  checkIncomplete() {
    const { form, mode } = this.state;
    return Object.values(form).includes("") || mode === "";
  }

  render() {
    const { result, form, error, mode, isBug } = this.state;
    const basicOpts = [["", "Pick"], 0, 1, 2, 3, 4, 5, 6, 7];

    const fields = [{
      name: 'mixed_calls',
      label: 'Simultaneous API Calls',
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
          <div>{this.getEmoji('coffee')}</div> 
          <div>Ticket Calculator</div> 
          <div>{this.getEmoji('pizza')}</div>
        </h1>

        <div className='clear'>
          <Checkbox
            label="Bug"
            isChecked={isBug}
            onChange={this.handleCheckbox}
          />
          <button className="submitButton" onClick={this.clear}>Clear</button>
        </div>

        <div className='mode'>
          <Dropdown
            name='mode'
            label='Mode'
            value={mode}
            options={[["", "Pick"], SAFE_MODE, YOLO_MODE]}
            onChange={(e) => this.setState({ mode: e.target.value })}
          />
        </div>

        <div className="form">

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

          <button className="submitButton" onClick={this.submit}>Submit</button>
        </div>
        { error &&
          <div className="error">
            Error: All fields required!
          </div>
        }
        {result !== null &&
          <h1 className="result">
            <div>{this.getResultEmoji()}</div> 
            <div>{result}</div> 
            <div>{this.getResultEmoji()}</div>
          </h1>
        }
      </div>
    );
  }
}

export default App;
