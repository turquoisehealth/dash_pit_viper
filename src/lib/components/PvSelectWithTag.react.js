import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {type} from 'ramda';

const sanitizeOptions = options => {

    if (type(options) === 'Object') {
        return Object.entries(options).map(([value, label]) => ({
            label: React.isValidElement(label) ? label : String(label),
            value,
        }));
    }

    if (type(options) === 'Array') {
        if (
            options.length > 0 &&
            ['String', 'Number', 'Bool'].includes(type(options[0]))
        ) {
            return options.map(option => ({
                label: String(option),
                value: option,
            }));
        }
        return options;
    }

    return options;
};

const sanitizeValue = (value, options) => {
    if (type(value) === 'Array') {
        return value.filter(v => options.some(o => o.value === v));
    }
    return options.some(o => o.value === value) ? value : null;
};

/**
 * pv-icon is a component that renders an svg icon.
 */
export default class PvSelectWithTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
        };
        // Sanitize options
        const {options, value} = props;
        const sanitizedOptions = sanitizeOptions(options);
        // Sanitize value
        const sanitizedValue = sanitizeValue(value, sanitizedOptions);
        props.setProps({value: sanitizedValue, options: sanitizedOptions});
    }

    countSelected() {
        // Count the number of selected options
        const {multi, value} = this.props;
        return multi && value ? value.length : value ? 1 : 0;
    }

    handleClick() {
        // Open/close dropdown
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
    }

    optionOnChange(event) {
        // Select option
        const {value} = event.target;
        const {multi, value: currentValue} = this.props;
        let newValue = [];
        if (multi) {
            if (currentValue && currentValue.includes(value)) {
                newValue = currentValue.filter((v) => v !== value);
            } else {
                newValue = [...currentValue, value];
            }
        } else {
            newValue = value;
        }
        this.props.setProps({value: newValue});
    }

    selectAllClick() {
        // Select all options
        const {options} = this.props;
        this.props.setProps({value: options.map((option) => option.value)});
    }

    deselectAllClick() {
        // Deselect all options
        const {multi} = this.props;
        this.props.setProps({value: multi ? [] : null});
    }

    searchOnChange(event) {
        // Search for options
        const {value} = event.target;
        const {options} = this.props;
        // Filter options, setting visible to true if the option label contains the search value
        const filteredOptions = options.map((option) => {
            const visible = option.label.toLowerCase().includes(value.toLowerCase());
            return {...option, visible};
        });
        this.props.setProps({options: filteredOptions});
    }

    render() {
        const {id, className, searchable, selectAll, deselectAll, placeholder, multi, disabled, dataAlign, value, options, dropdownWidth} = this.props;
        const {isToggleOn} = this.state;
        const sanitizedOptions = sanitizeOptions(options);

        // Create list of options
        const listOptions = sanitizedOptions.map((option) => {
            if (option.visible === false) {
                return null;
            }
            const checked = multi && value ? value.includes(option.value) : value && value === option.value;
            return (
                <li key={id + "-" + option.value}>
                    <label className="pv-flex">
                        <input type={ multi ? "checkbox" : "radio"} className={ multi ? "pv-checkbox" : "pv-radio"} name={id} value={option.value} disabled={disabled | option.disabled} checked={checked} onChange={(e) => this.optionOnChange(e)}/>
                        <span>{option.label}</span>
                    </label>
                </li>
            );
        });

        return (
            <div id={id} className={"pv-dropdown pv-full-width " + className}>
                <button className="pv-select-multiple pv-text-left" aria-haspopup="listbox" {...(isToggleOn ? {'data-dropdown': 'true'} : {})} aria-controls={id + "-select-listbox"} onClick={() => this.handleClick()}>
                    <span className="pv-tag-inverse">{this.countSelected()}</span> {placeholder}
                </button>
                <div role="listbox" id={id + "-select-listbox"} className="pv-popover" data-align={dataAlign} style={dropdownWidth ? {"width": dropdownWidth} : {}}>
                    {
                        searchable &&
                        <div className="pv-inset-square-8">
                            <input type="text" className="pv-input-search" placeholder="Search" onChange={(e) => this.searchOnChange(e)}/>
                        </div>
                    }
                    <div className="pv-space-between pv-inset-inline-16">
                        { deselectAll && <button type="button" className="pv-button-link" onClick={() => this.deselectAllClick()}>Deselect All</button>}
                        { selectAll && <button type="button" className="pv-button-link" onClick={() => this.selectAllClick()}>Select All</button> }
                    </div>
                    <ul role="list" className="pv-popover-list">{listOptions}</ul>
                </div>
            </div>
        );
    }
}

PvSelectWithTag.propTypes = {

    /**
     * An array of options {label: [string|number], value: [string|number]},
     * an optional disabled field can be used for each option
     */
    options: PropTypes.oneOfType([
        /**
         * Array of options where the label and the value are the same thing - [string|number|bool]
         */
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ])
        ),
        /**
         * Simpler `options` representation in dictionary format. The order is not guaranteed.
         * {`value1`: `label1`, `value2`: `label2`, ... }
         * which is equal to
         * [{label: `label1`, value: `value1`}, {label: `label2`, value: `value2`}, ...]
         */
        PropTypes.object,
        /**
         * An array of options {label: [string|number], value: [string|number]},
         * an optional disabled field can be used for each option
         */
        PropTypes.arrayOf(
            PropTypes.exact({
                /**
                 * The option's label
                 */
                label: PropTypes.node.isRequired,

                /**
                 * The value of the option. This value
                 * corresponds to the items specified in the
                 * `value` property.
                 */
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool,
                ]).isRequired,

                /**
                 * If true, this option is disabled and cannot be selected.
                 */
                disabled: PropTypes.bool,

                /**
                 * If false, this option is hidden from view.
                 */
                visible: PropTypes.bool,

            })
        ),
    ]),

    /**
     * The value of the input. If `multi` is false (the default)
     * then value is just a string that corresponds to the values
     * provided in the `options` property. If `multi` is true, then
     * multiple values can be selected at once, and `value` is an
     * array of items with values corresponding to those in the
     * `options` prop.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ])
        ),
    ]),

    /**
     * If true, the user can select multiple values
     */
    multi: PropTypes.bool,

    /**
     * Adds the ability to select all options.
     */
    selectAll: PropTypes.bool,

    /**
     * Adds the ability to deselect all options.
     */
    deselectAll: PropTypes.bool,

    /**
     * Whether to enable the searching feature or not
     */
    searchable: PropTypes.bool,

    /**
     * The grey, default text shown when no option is selected
     */
    placeholder: PropTypes.string,

    /**
     * If true, this dropdown is disabled and the selection cannot be changed.
     */
    disabled: PropTypes.bool,

    /**
     * Aligns the dropdown menu to the right or left of the container.
     */
    dataAlign: PropTypes.oneOf(['left', 'right']),

    /**
     * Defines CSS styles which will override styles previously set.
     */
    style: PropTypes.object,

    /**
     * className of the dropdown element
     */
    className: PropTypes.string,

    /**
     * width of the dropdown element
     */
    dropdownWidth: PropTypes.string,

    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that gets fired when the input changes
     */
    setProps: PropTypes.func,

    /**
     * Object that holds the loading state object coming from dash-renderer
     */
    loading_state: PropTypes.shape({
        /**
         * Determines if the component is loading or not
         */
        is_loading: PropTypes.bool,
        /**
         * Holds which property is loading
         */
        prop_name: PropTypes.string,
        /**
         * Holds the name of the component that is loading
         */
        component_name: PropTypes.string,
    }),
};

PvSelectWithTag.defaultProps = {
    options: [],
    placeholder: "Selected",
    selectAll: true,
    deselectAll: true,
    disabled: false,
    multi: false,
    searchable: true,
    dataAlign: 'left',
};

export const propTypes = PvSelectWithTag.propTypes;
export const defaultProps = PvSelectWithTag.defaultProps;