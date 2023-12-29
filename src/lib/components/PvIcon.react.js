import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * pv-icon is a component that renders an svg icon.
 */
export default class PvIcon extends Component {
    render() {
        const {id, className, href} = this.props;
        return (
            <svg id={id} className={className}>
                <use href={href}></use>
            </svg>
        );
    }
}

PvIcon.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The className could be pv-icon, pv-icon-20, etc.
     */
    className: PropTypes.string,

    /**
     * The href is the ID of the pv-icon.
     */
    href: PropTypes.string.isRequired,
};


PvIcon.defaultProps = {className: "pv-icon"};