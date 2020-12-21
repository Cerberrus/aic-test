import React, { Component } from "react"

// Import static files
import './FileInput.css'
import iconFile from "~src/static/icons/clip.svg"
import iconEdit from "~src/static/icons/edit.svg"
import Dropzone from "react-dropzone";

export default class FileInput extends Component {
    state = {
        fileName: '',
        error: ''
    }

    componentDidMount() {
        const { fileName } = this.props
        fileName && this.setState({fileName})
    }

    onLoad = (files) => {
        const { onLoadFile } = this.props
        const reader = new FileReader()
        const file = files[0]

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
        onLoadFile(file)
    }

    render() {
        const { name } = this.props
        const { fileName, error } = this.state

        const changeFile = (
            <div>
                <img src={fileName} className="file__image" aria-hidden={true}/>
                <div className="file__input form__input">
                    <svg className="file__icon" aria-hidden={true}><use xlinkHref={iconEdit}/></svg>
                    <p>изменить</p>
                </div>
            </div>
        )

        const addFile = (
            <div className="file__input form__input">
                <svg className="file__icon" aria-hidden={true}><use xlinkHref={iconFile}/></svg>
                <p>выберите или перетащите файл</p>
            </div>
        )

        return (
            <>
                <Dropzone
                    onDrop={this.onLoad}
                    accept="image/*"
                >
                    {({getRootProps, getInputProps}) => (
                        <div
                            {...getRootProps({
                                title: 'Выберите файл',
                                role:  'input',
                                className: 'file__wrapper'
                            })}
                        >
                            <input
                                {...getInputProps({
                                    multiple: false,
                                    name:    {name},
                                })}
                            />
                            {fileName ? changeFile : addFile}
                        </div>
                    )}
                </Dropzone>

                {error && <p className="admin__error">{error}</p>}
            </>
        );
    }
}
