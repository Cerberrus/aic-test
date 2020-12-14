import React, { Component } from "react"
import { FacebookShareButton, VKShareButton} from "react-share"
import { useLocation } from "react-router-dom"

import Modal from '~user/components/modal/Modal'

// Import static files
import './Footer.css'
import Logo         from "~user/components/logo/Logo"
import iconVk       from '~user/static/icons/vk.svg'
import iconFacebook from '~user/static/icons/facebook.svg'

export default class Footer extends Component {
    state = {
        showModal: false
    }

    toggleModal = () => {
        const { showModal } = this.state

        this.setState({
            showModal: !showModal
        })
    }

    render() {
        const { showModal } = this.state
        const { location }  = this.props

        const modalTitle = 'Обработка данных'
        const modalContent = (
            <>
                <p style={{marginBottom: '26px', fontSize: '18px'}}>1. Что регулирует настоящая политика конфиденциальности</p>
                <p style={{marginBottom: '48px'}}>
                    Настоящая политика конфиденциальности (далее — Политика) действует в отношении всей информации, включая персональные данные в понимании применимого законодательства (далее — «Персональная информация»), которую ООО «Гросс маркет» и/или его аффилированные лица, в том числе входящие в одну группу с ООО «Гросс маркет» (далее — «Гросс маркет»), могут получить о Вас в процессе использования Вами любых сайтов, программ, продуктов и/или сервисов Гросс маркет (далее вместе «Сервисы»), информацию о которых Гросс маркет может также получать Персональную информацию от своих партнеров (далее — «Партнеры»), сайты, программы, продукты или сервисы которых Вы используете (например, от рекламодателей Гросс маркет или службами такси). В таких случаях передача Персональной информации возможна только в случаях, установленных применимым законодательством, и осуществляется на основании специальных договоров между Гросс маркет и каждым из Партнеров.
                    <br/><br/><br/>
                    <span style={{color: '#B3B3B3'}}>Пожалуйста, обратите внимание, что использование любого из Сайтов и/или Сервисов может регулироваться дополнительными условиями, которые могут вносить в настоящую Политику изменения и/или дополнения, и/или иметь специальные условия в отношении персональной информации, размещенные в соответствующих разделах документов для таких Сайтов /или Сервисов.</span>
                </p>
                <p style={{marginBottom: '26px', fontSize: '18px'}}>2. Кто обрабатывает информацию</p>
                <p style={{marginBottom: '48px'}}>Для обеспечения использования Вами Сайтов и Сервисов Ваша Персональная информация собирается и используется Яндексом, в том числе включая общество с ограниченной ответственностью «Гросс маркет», юридическое лицо, созданное по законодательству Российской Федерации и зарегистрированное по адресу: 123351, Россия, Москва, ул. Гроссова, д. 12 (ООО «Гросс маркет»), или его аффилированным лицом, предоставляющим соответствующий Сервис в иных юрисдикциях. С информацией о том, какое лицо предоставляет тот или иной Сервис, Вы можете ознакомиться в условиях использования соответствующего Сервиса.</p>
                <p style={{marginBottom: '26px', fontSize: '18px'}}>3. Какова цель данной Политики</p>
                <p style={{marginBottom: '48px'}}>Защита Вашей Персональной информации и Вашей конфиденциальности чрезвычайно важны для Гросс маркета. Поэтому при использовании Вами Сайтов и Сервисов Гросс маркет защищает и обрабатывает Вашу Персональную информацию в строгом соответствии с применимым законодательством.></p>
                <p style={{marginBottom: '26px', fontSize: '18px'}}>4. Какую Персональную информацию о Вас собирает Гросс маркет</p>
                <p>Для обеспечения использования Вами Сайтов и Сервисов Ваша Персональная информация собирается и используется Яндексом, в том числе включая общество с ограниченной ответственностью «Гросс маркет», юридическое лицо, созданное по законодательству Российской Федерации и зарегистрированное по адресу: 123351, Россия, Москва, ул. Гроссова, д. 12 (ООО «Гросс маркет»), или его аффилированным лицом, предоставляющим соответствующий Сервис в иных юрисдикциях. С информацией о том, какое лицо предоставляет тот или иной Сервис, Вы можете ознакомиться в условиях использования соответствующего Сервиса.</p>
            </>
        )

        return (
            <footer className="footer container">

                <div className="footer__share">
                    <Logo />
                    <p className="footer__shareText">поделиться</p>
                    <ul className="footer__social social">
                        <li className="social__item">
                            <VKShareButton url={location.pathname}>
                                <svg className="social__icon social__icon_vk"><use xlinkHref={iconVk}/></svg>
                            </VKShareButton>
                        </li>
                        <li className="social__item">
                            <FacebookShareButton url={location.pathname}>
                                <svg className="social__icon social__icon_facebook"><use xlinkHref={iconFacebook}/></svg>
                            </FacebookShareButton>
                        </li>
                    </ul>
                </div>
                <div className="footer__powered">
                    <p>© Гросс маркет {(new Date()).getFullYear()}</p>
                    <button className="footer__policy" onClick={this.toggleModal}>Политика обработки персональных данных</button>
                    <Modal
                        toggleModal={this.toggleModal}
                        showModal={showModal}
                        title={modalTitle}
                        content={modalContent}
                    />
                </div>
            </footer>
        )
    }
}

