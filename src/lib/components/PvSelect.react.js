import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {type} from 'ramda';

const findOption = (value, options) => {
    return (
        (options &&
            options.find(
                (option) => String(option.value) === String(value)
            )) || {value: ''}
    );
};

const sanitizeOptionsValue = (value, options) => {
    // Sanitize options and value
    let sanitizedOptions = options;
    if (type(options) === 'Object') {
        sanitizedOptions = Object.entries(options).map(([value, label]) => ({
            label: React.isValidElement(label) ? label : String(label),
            value: value,
        }));
    }

    if (type(options) === 'Array') {
        if (
            options.length > 0 &&
            ['String', 'Number', 'Bool'].includes(type(options[0]))
        ) {
            sanitizedOptions = options.map((option) => ({
                label: String(option),
                value: option,
            }));
        }
    }

    const sanitizedValue =
        type(value) === 'Array'
            ? value.map((v) => findOption(v, sanitizedOptions).value)
            : findOption(value, sanitizedOptions).value;
    return {
        options: sanitizedOptions,
        value: sanitizedValue,
    };
};

/**
 * pv-icon is a component that renders an svg icon.
 */
export default class PvSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggleOn: false,
        };

        this._setSelectRef = this._setSelectRef.bind(this);
    }

    /** See Select#focus (in react-select) */
    focus() {
        if (this._selectRef) {
            return this._selectRef.focus();
        }
        return false;
    }

    _setSelectRef(ref) {
        this._selectRef = ref;
    }

    getOptionsValue() {
        // Get the value of the options
        const {value, options} = this.props;
        return sanitizeOptionsValue(value, options);
    }

    countSelected() {
        // Count the number of selected options
        const {multi} = this.props;
        const {value} = this.getOptionsValue();
        return multi && value ? value.length : value ? 1 : 0;
    }

    toggleDropdown() {
        // Toggle dropdown
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn,
        }));
    }

    closeDropdown(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            // Close dropdown
            this.setState({isToggleOn: false});
        }
    }

    optionOnChange(event) {
        // Select option
        const {value} = event.target;
        const {multi} = this.props;
        const {value: currentValue, options} = this.getOptionsValue();
        const option = findOption(value, options);
        let newValue = [];
        if (multi) {
            if (currentValue && currentValue.includes(option.value)) {
                newValue = currentValue.filter((v) => v !== option.value);
            } else {
                newValue = [...currentValue, option.value];
            }
        } else {
            newValue = value;
        }
        this.props.setProps({value: newValue});
    }

    selectAllClick() {
        // Select all options
        const {options} = this.getOptionsValue();
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
        const {options} = this.getOptionsValue();
        // Filter options, setting visible to true if the option label contains the search value
        const filteredOptions = options.map((option) => {
            const visible = option.label
                .toLowerCase()
                .includes(value.toLowerCase());
            return {...option, visible};
        });
        this.props.setProps({options: filteredOptions});
    }

    render() {
        const {
            id,
            className,
            searchable,
            selectAll,
            deselectAll,
            placeholder,
            multi,
            disabled,
            dataAlign,
            dropdownWidth,
            withCountTag,
        } = this.props;
        const {isToggleOn} = this.state;
        const {options, value} = this.getOptionsValue();

        // Create list of options
        const listOptions = options.map((option) => {
            if (option.visible === false) {
                return null;
            }
            const checked =
                multi && value
                    ? value.includes(option.value)
                    : value && value === option.value;
            return (
                <li
                    key={id + '-' + option.value}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <label
                        className="pv-flex"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <input
                            type={multi ? "checkbox" : "radio"}
                            className={multi ? "pv-checkbox" : "pv-radio"}
                            name={id}
                            value={option.value}
                            disabled={disabled | option.disabled}
                            checked={checked}
                            onChange={(e) => this.optionOnChange(e)}
                        />
                        <span>{option.label}</span>
                    </label>
                </li>
            );
        });

        // Render selected options
        let selectedOption = null;
        if (multi === true) {
            if (withCountTag === true) {
                selectedOption = (
                    <span>
                        <span className="pv-tag-inverse">
                            {this.countSelected()}
                        </span>
                        {placeholder}
                    </span>
                );
            } else {
                if (!value || value.length === 0) {
                    selectedOption = <span>{placeholder}</span>;
                } else {
                    selectedOption = value.map((v) => {
                        const label = options.find(
                            (option) => option.value === v
                        ).label;
                        return (
                            <span key={label} className="pv-tag-inverse">
                                {label}
                            </span>
                        );
                    });
                }
            }
        } else {
            if (!value) {
                selectedOption = <span>{placeholder}</span>;
            } else {
                const label = options.find(
                    (option) => option.value === value
                ).label;
                selectedOption = (
                    <span>{value && label ? label : placeholder}</span>
                );
            }
        }

        return (
            <div
                id={id}
                className={'pv-dropdown pv-full-width ' + className}
                onBlur={(event) => this.closeDropdown(event)}
            >
                <button
                    className="pv-select-multiple pv-text-left"
                    aria-haspopup="listbox"
                    {...(isToggleOn ? {'data-dropdown': 'true'} : {})}
                    aria-controls={id + '-select-listbox'}
                    onClick={() => this.toggleDropdown()}
                >
                    {selectedOption}
                </button>
                <div
                    role="listbox"
                    id={id + '-select-listbox'}
                    className="pv-popover"
                    data-align={dataAlign}
                    style={{width: dropdownWidth}}
                >
                    {searchable && (
                        <div
                            className="pv-inset-square-16"
                            style={{paddingBottom: '0px'}}
                        >
                            <input
                                type="text"
                                className="pv-input-search"
                                placeholder="Search"
                                onChange={(e) => this.searchOnChange(e)}
                            />
                        </div>
                    )}
                    {multi && (deselectAll || selectAll) && (
                        <div
                            className="pv-space-between pv-inset-inline-16"
                            style={{marginTop: '16px'}}
                        >
                            {multi && deselectAll && (
                                <button
                                    type="button"
                                    className="pv-button-link"
                                    onClick={() => this.deselectAllClick()}
                                >
                                    Deselect All
                                </button>
                            )}
                            {multi && selectAll && (
                                <button
                                    type="button"
                                    className="pv-button-link"
                                    onClick={() => this.selectAllClick()}
                                >
                                    Select All
                                </button>
                            )}
                        </div>
                    )}
                    <ul role="list" className="pv-popover-list">
                        {listOptions}
                    </ul>
                </div>
            </div>
        );
    }
}

PvSelect.propTypes = {
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
     * width of the dropdown element. Default: 100%
     */
    dropdownWidth: PropTypes.string,

    /**
     * Defines if the select uses withCountTag or not
     */
    withCountTag: PropTypes.bool,

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

PvSelect.defaultProps = {
    options: [],
    value: '',
    className: '',
    placeholder: 'Selected',
    selectAll: false,
    deselectAll: false,
    disabled: false,
    multi: false,
    searchable: false,
    withCountTag: false,
    dataAlign: 'left',
    dropdownWidth: '100%',
};

export const propTypes = PvSelect.propTypes;
export const defaultProps = PvSelect.defaultProps;
