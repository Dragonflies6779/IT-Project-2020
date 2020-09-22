function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

class FileDialogue extends React.Component {
  componentDidMount(){
    this.fileSelector = buildFileSelector();
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
  }

  render(){
    return <a href="" onClick={this.handleFileSelect}>Select files</a>
  }
}
