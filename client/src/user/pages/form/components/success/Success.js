import React from 'react'

// Import static files
import './Success.css'

const Success = () => (
    <div className="success">
        <h1 className="success__title">Ждем тебя!</h1>
        <div className="success__epilogue">
            <div>
                <p>В 2020 году самыми востребованными умениями и качествами на рынке труда станут: </p>
                <p className="success__decorText success__text_size_small">Умение ставить цели, планировать свое время, инициативность, настойчивость, высокая мотивация, умение эффективно общаться, любознательность. </p>
                <p>А профессиональным навыкам можно научить любого человека.</p>
            </div>
            <div>
                <p className="success__text_size_medium">Остались вопросы?</p>
                <a href="tel:79264331416" className="success__link button button_gray">+7 (926) 433-14-16</a>
            </div>
        </div>
    </div>
)

export default Success