import './styles.css'
import cn from 'classnames'

const Button = (props) => {
    return (
        <button {...props} className={cn('cnButton', props.className)} />
    )
}

export default Button