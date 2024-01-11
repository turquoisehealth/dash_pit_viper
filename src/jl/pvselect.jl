# AUTO GENERATED FILE - DO NOT EDIT

export pvselect

"""
    pvselect(;kwargs...)

A PvSelect component.
pv-icon is a component that renders an svg icon.
Keyword arguments:
- `id` (String; optional): The ID of this component, used to identify dash components
in callbacks. The ID needs to be unique across all of the
components in an app.
- `className` (String; optional): className of the dropdown element
- `dataAlign` (a value equal to: 'left', 'right'; optional): Aligns the dropdown menu to the right or left of the container.
- `deselectAll` (Bool; optional): Adds the ability to deselect all options.
- `disabled` (Bool; optional): If true, this dropdown is disabled and the selection cannot be changed.
- `dropdownWidth` (String; optional): width of the dropdown element. Default: 100%
- `loading_state` (optional): Object that holds the loading state object coming from dash-renderer. loading_state has the following type: lists containing elements 'is_loading', 'prop_name', 'component_name'.
Those elements have the following types:
  - `is_loading` (Bool; optional): Determines if the component is loading or not
  - `prop_name` (String; optional): Holds which property is loading
  - `component_name` (String; optional): Holds the name of the component that is loading
- `multi` (Bool; optional): If true, the user can select multiple values
- `options` (optional): An array of options {label: [string|number], value: [string|number]},
an optional disabled field can be used for each option. options has the following type: Array of String | Real | Bools | Dict | Array of lists containing elements 'label', 'value', 'disabled', 'visible'.
Those elements have the following types:
  - `label` (a list of or a singular dash component, string or number; required): The option's label
  - `value` (String | Real | Bool; required): The value of the option. This value
corresponds to the items specified in the
`value` property.
  - `disabled` (Bool; optional): If true, this option is disabled and cannot be selected.
  - `visible` (Bool; optional): If false, this option is hidden from view.s
- `placeholder` (String; optional): The grey, default text shown when no option is selected
- `searchable` (Bool; optional): Whether to enable the searching feature or not
- `selectAll` (Bool; optional): Adds the ability to select all options.
- `style` (Dict; optional): Defines CSS styles which will override styles previously set.
- `value` (String | Real | Bool | Array of String | Real | Bools; optional): The value of the input. If `multi` is false (the default)
then value is just a string that corresponds to the values
provided in the `options` property. If `multi` is true, then
multiple values can be selected at once, and `value` is an
array of items with values corresponding to those in the
`options` prop.
- `withCountTag` (Bool; optional): Defines if the select uses withCountTag or not
"""
function pvselect(; kwargs...)
        available_props = Symbol[:id, :className, :dataAlign, :deselectAll, :disabled, :dropdownWidth, :loading_state, :multi, :options, :placeholder, :searchable, :selectAll, :style, :value, :withCountTag]
        wild_props = Symbol[]
        return Component("pvselect", "PvSelect", "dash_pit_viper", available_props, wild_props; kwargs...)
end

