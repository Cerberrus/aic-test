import React, { Component } from "react"

// Import static files
import './FileInput.css'
import iconFile from "~user/static/icons/clip.svg"
import iconEdit from "~user/static/icons/edit.svg"

export default class FileInput extends Component {
    state = {
        fileName: '',
        error: ''
    }

    componentDidMount() {
        const { fileName } = this.props

        fileName && this.setState({fileName})
    }

    onLoad = (e) => {
        const { onLoadFile } = this.props
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.addEventListener('load', event => {
            // Validation
            if (!file.type) {
                this.setState({
                    error: 'Данный тип файла не поддерживается'
                })
                return
            }

            if (!file.type.match('image.*')) {
                this.setState({
                    error: 'Выбранный файл не является изображением'
                })
                return
            }

            this.setState({
                fileName: event.target.result,
                error: false,
            })
        })

        reader.readAsDataURL(file)
        onLoadFile(e)
    }

    render() {
        const { name } = this.props
        const { fileName, error } = this.state

        const changeFile = (
            <div className="file__change">
                <img src={fileName} className="file__image" aria-hidden={true}/>
                <label htmlFor="file" className="file__input form__file form__input">
                    <svg className="file__icon" aria-hidden={true}><use xlinkHref={iconEdit}/></svg>
                    <p>изменить</p>
                </label>
            </div>
        )

        const addFile = (
            <label htmlFor="file" className="file__input form__file form__input">
                <svg className="file__icon" aria-hidden={true}><use xlinkHref={iconFile}/></svg>
                <p>выберите или перетащите файл</p>
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
                {error && <p className="admin__error">{error}</p>}
            </>
        );
    }
}
