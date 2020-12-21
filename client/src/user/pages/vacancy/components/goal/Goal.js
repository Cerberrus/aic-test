import React from "react"

// Import static files
import "./Goal.css"

const Goal = ({ phone }) => (
    <section className="goal">
        <h2 className="goal__tile">Наша суперцель</h2>
        <p>
            — стать любимым магазином для каждой российской семьи.<br/><br/>
            Сотни тысяч наших сотрудников ежедневно работают над её достижением.<br/><br/>
            Мы уверены, что в ближайшие годы достигнем этого и будет здорово,<br/>
            если вместе с тобой.
        </p>
        <a href={`tel:${phone}`} className="goal__link button button_gray">+{phone}</a>
    </section>
)

export default Goal
