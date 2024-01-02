# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class PvIcon(Component):
    """A PvIcon component.
pv-icon is a component that renders an svg icon.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; default 'pv-icon'):
    The className could be pv-icon, pv-icon-20, etc.

- href (string; required):
    The href is the ID of the pv-icon."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_pit_viper'
    _type = 'PvIcon'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, className=Component.UNDEFINED, href=Component.REQUIRED, **kwargs):
        self._prop_names = ['id', 'className', 'href']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'href']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['href']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(PvIcon, self).__init__(**args)
