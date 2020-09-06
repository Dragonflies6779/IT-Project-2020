import React from 'react';

class InputField extends React.Compontent {

  render(){
    return (
      <div className="inputField">

        <input
          classname = 'input'
          type = {this.props.type}
          placeholder = {this.props.placeholder}
          value = {this.props.value}
          onChange = { (e) => this.props.onChange(e.target.value)}
        />

      </div>
    );
  }
}

export default InputField;
