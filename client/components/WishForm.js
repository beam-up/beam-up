import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'


class WishForm extends Component {

  constructor() {
    super()
    this.state = {
      selectedFile: null,
      num: 0
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
  }

 fileSelectedHandler = async evt => {
   const file = evt.target.files[0]
   await this.setState({
      num: this.state.num + 1,
      selectedFile: file
    })
    console.log('state', this.state)
 }

  fileUploadHandler = () => {
    const fd = new FormData()
    console.log('state info when upload', this.state.selectedFile)
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    console.log('file data', fd)
  }

  render() {
    return (
      <div>
        <input type='file'
        onChange={this.fileSelectedHandler}
        />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    )
  }
}

export default WishForm
