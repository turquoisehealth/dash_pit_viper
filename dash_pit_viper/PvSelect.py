# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class PvSelect(Component):
    """A PvSelect component.
pv-icon is a component that renders an svg icon.

Keyword arguments:

- id (string; optional):
    The ID of this component, used to identify dash components in
    callbacks. The ID needs to be unique across all of the components
    in an app.

- className (string; optional):
    className of the dropdown element.

- dataAlign (a value equal to: 'left', 'right'; default 'left'):
    Aligns the dropdown menu to the right or left of the container.

- deselectAll (boolean; default False):
    Adds the ability to deselect all options.

- disabled (boolean; default False):
    If True, this dropdown is disabled and the selection cannot be
    changed.

- dropdownWidth (string; optional):
    width of the dropdown element.

- loading_state (dict; optional):
    Object that holds the loading state object coming from
    dash-renderer.

    `loading_state` is a dict with keys:

    - component_name (string; optional):
        Holds the name of the component that is loading.

    - is_loading (boolean; optional):
        Determines if the component is loading or not.

    - prop_name (string; optional):
        Holds which property is loading.

- multi (boolean; default False):
    If True, the user can select multiple values.

- options (list of dicts; optional):
    An array of options {label: [string|number], value:
    [string|number]}, an optional disabled field can be used for each
    option.

    `options` is a list of string | number | booleans | dict | list of
    dicts with keys:

    - disabled (boolean; optional):
        If True, this option is disabled and cannot be selected.

    - label (a list of or a singular dash component, string or number; required):
        The option's label.

    - value (string | number | boolean; required):
        The value of the option. This value corresponds to the items
        specified in the `value` property.

    - visible (boolean; optional):
        If False, this option is hidden from view.

- placeholder (string; default 'Selected'):
    The grey, default text shown when no option is selected.

- searchable (boolean; default False):
    Whether to enable the searching feature or not.

- selectAll (boolean; default False):
    Adds the ability to select all options.

- style (dict; optional):
    Defines CSS styles which will override styles previously set.

- value (string | number | boolean | list of string | number | booleans; default ''):
    The value of the input. If `multi` is False (the default) then
    value is just a string that corresponds to the values provided in
    the `options` property. If `multi` is True, then multiple values
    can be selected at once, and `value` is an array of items with
    values corresponding to those in the `options` prop.

- withCountTag (boolean; default False):
    Defines if the select uses withCountTag or not."""
    _children_props = ['options[].label']
    _base_nodes = ['children']
    _namespace = 'dash_pit_viper'
    _type = 'PvSelect'
    @_explicitize_args
    def __init__(self, options=Component.UNDEFINED, value=Component.UNDEFINED, multi=Component.UNDEFINED, selectAll=Component.UNDEFINED, deselectAll=Component.UNDEFINED, searchable=Component.UNDEFINED, placeholder=Component.UNDEFINED, disabled=Component.UNDEFINED, dataAlign=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, dropdownWidth=Component.UNDEFINED, withCountTag=Component.UNDEFINED, id=Component.UNDEFINED, loading_state=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'dataAlign', 'deselectAll', 'disabled', 'dropdownWidth', 'loading_state', 'multi', 'options', 'placeholder', 'searchable', 'selectAll', 'style', 'value', 'withCountTag']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'dataAlign', 'deselectAll', 'disabled', 'dropdownWidth', 'loading_state', 'multi', 'options', 'placeholder', 'searchable', 'selectAll', 'style', 'value', 'withCountTag']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(PvSelect, self).__init__(**args)
