import React, { Component } from "react"

// Import static files
import './FileInput.css'
import iconFile from "~user/static/icons/clip.svg"

export default class FileInput extends Component {
    state = {
        fileName: ''
    }

    componentDidMount() {
        const { fileName } = this.props

        fileName && this.setState({fileName})
    }

    onLoad = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.addEventListener('load', event => {


            // Validation

            // if (!file.type) {
            //     status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
            //     return;
            // }
            // if (!file.type.match('image.*')) {
            //     status.textContent = 'Error: The selected file does not appear to be an image.'
            //     return;
            // }

            this.setState({
                fileName: event.target.result
            })
        })
        
        reader.readAsDataURL(file)

        this.props.onLoadFile(e)
    }

    render() {
        const { name } = this.props
        const { fileName } = this.state

        const changeFile = (
            <div className="file__change">
                <img src={fileName} className="file__image" aria-hidden={true}/>
                <label htmlFor="file" className="file__input form__file form__input">
                    <p>изменить</p>
                </label>
            </div>
        )

        const addFile = (
            <label htmlFor="file" className="file__input form__file form__input">
                <svg className="file__icon" aria-hidden={true}><use xlinkHref={iconFile}/></svg>
                <p>выберете или перетащите файл</p>
            </label>
        )

        return (
            <>
                <input
                    type="file"
                    id="file"
                    name={name}
                    onChange={this.onLoad}
                    hidden
                />
                {fileName ? changeFile : addFile}
            </>
        );
    }
}