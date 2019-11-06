import React from 'react'
import PropTypes from 'prop-types'

class DynamicLoader extends React.Component {

    render() {
        const {
            loaderOpen,
            loaderWidth,
            loaderHeight

        } = this.props;
        return (
            <img 
            className={loaderOpen ? 'login-loader' : 'login-loader d-none'} 
            width={loaderWidth} 
            height={loaderHeight} 
            src="/images/spinner.gif" 
            alt="" />
        );
    }
}

DynamicLoader.propTypes = {
    loaderWidth: PropTypes.string,
    loaderHeight: PropTypes.string
};

DynamicLoader.defaultProps = {
    loaderWidth: '10',
    loaderHeight: '10'
};

export default DynamicLoader;