import React from 'react'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup';

class PopUp extends React.Component {

    constructor(props) {
        super(props)
        // this.state = { open: false }
        // this.closeModal = this.closeModal.bind(this)
        // this.openModal = this.openModal.bind(this)
        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            const {
                openPopUp,
            } = this.props;
            //Do whatever when esc is pressed
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    // openModal() {
    //     this.setState({ open: true })
    // }

    // closeModal() {
    //     this.setState({ open: false })
    // }

    render() {
        const {
            content,
            openPopUp,
            closeModal,
            classname,
            parentClass
        } = this.props;
        return (
            <React.Fragment>
                <Popup
                    open={openPopUp}
                    closeOnDocumentClick
                    // onClose={this.closeModal}
                    className={parentClass}
                >
                    <div className={classname}>
                        <a className="close ripplelink" onClick={() => closeModal()}>
                            <i className="icon-57" />
                        </a>
                        {content}
                    </div>
                </Popup>
            </React.Fragment>
        );
    }
}

// PopUp.propTypes = {
// };

// PopUp.defaultProps = {
// };

export default PopUp;