import React from 'react';

class SubmitButton extends React.Compontent {

  render(){
    return (
      <div className="submitButton">
          <button
            classname = 'btn'
            disabled = {this.props.disabled}
            onClick = { () => this.props.onClick() }
          >
            {this.props.text}
          </button>
      </div>
    );
  }
}

export default SubmitButton;
