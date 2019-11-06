import React from 'react'
import PropTypes from 'prop-types'

class TextInput extends React.Component {

    render() {
        const {
            type,
            value,
            name,
            className,
            placeholder,
            maxLength,
            id,
            required,
            onChange,
            onBlur,
            autocomplete,
            onClick,
            onKeyUp,
            readonly
        } = this.props;
        return (
            <input
                type={type}
                id={id}
                value={value}
                name={name}
                className={className}
                placeholder={placeholder}
                maxLength={maxLength}
                required={required}
                onChange={onChange}
                autoComplete={autocomplete}
                onBlur={onBlur}
                onClick={onClick}
                onKeyUp={onKeyUp}
                readOnly={readonly}
            />
        );


    }
}

TextInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    maxLength: PropTypes.string,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    style: PropTypes.object,
    onChange: PropTypes.any,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onKeyUp: PropTypes.func,
    autocomplete: PropTypes.string,
};

TextInput.defaultProps = {
    type: 'text',
    style: {},
    value: '',
    name: '',
    className: '',
    placeholder: '',
    id: '',
    maxLength: '',
    required: false,
    onChange: '',
    autocomplete: '',
    onBlur: () => { },
    onClick: () => { },
    onKeyUp: () => { },
    readonly:false
};

export default TextInput;