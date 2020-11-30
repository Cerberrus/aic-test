import React from 'react'
import NumberFormat from "react-number-format"

// Import static files
import './Input.css'
import iconArrow from '~user/static/icons/arrow.svg'
import iconCheck from '~user/static/icons/check.svg'

const Input = ({type, placeholder, label, className, options, required=false}) => {
    switch(type) {
        case 'text': case 'email': case 'date':
            return (
                <label>
                    <span>{label} {required && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                    <input type={type} placeholder={placeholder} className={className} />
                </label>
            )
        case 'radio':
            return (
                <>
                    {options.map((item, index) => (
                        <label key={index}>
                            <input type="radio" name={item.name} value={item.value} className={className} aria-label={label} defaultChecked={item.checked}/>
                            <span>{item.value}</span>
                        </label>
                    ))}
                </>
            )
        case 'tel':
            return (
                <label>
                    <span>{label} {required && <svg className="form__iconCheck"><use xlinkHref={iconCheck}/></svg>}</span>
                    <NumberFormat format="+7 (###) ### - ####" mask="_" allowEmptyFormatting className={className}/>
                </label>
            )
        case 'file':
            return (
                <input type="file" className={className}/>
            )
        case 'textarea':
            return(
                <label>
                    <span>{label}</span>
                    <textarea className={className}/>
                </label>
            )
        default:
            return false
    }
}

export default Input
