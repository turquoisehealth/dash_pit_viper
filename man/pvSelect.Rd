% Auto-generated: do not edit by hand
\name{pvSelect}

\alias{pvSelect}

\title{PvSelect component}

\description{
pv-icon is a component that renders an svg icon.
}

\usage{
pvSelect(id=NULL, className=NULL, dataAlign=NULL, deselectAll=NULL,
disabled=NULL, dropdownWidth=NULL, loading_state=NULL,
multi=NULL, options=NULL, placeholder=NULL, searchable=NULL,
selectAll=NULL, sortBySelected=NULL, style=NULL, value=NULL,
withCountTag=NULL)
}

\arguments{
\item{id}{Character. The ID of this component, used to identify dash components
in callbacks. The ID needs to be unique across all of the
components in an app.}

\item{className}{Character. className of the dropdown element}

\item{dataAlign}{A value equal to: 'left', 'right'. Aligns the dropdown menu to the right or left of the container.}

\item{deselectAll}{Logical. Adds the ability to deselect all options.}

\item{disabled}{Logical. If true, this dropdown is disabled and the selection cannot be changed.}

\item{dropdownWidth}{Character. width of the dropdown element. Default: 100\%}

\item{loading_state}{Lists containing elements 'is_loading', 'prop_name', 'component_name'.
those elements have the following types:
  - is_loading (logical; optional): determines if the component is loading or not
  - prop_name (character; optional): holds which property is loading
  - component_name (character; optional): holds the name of the component that is loading. Object that holds the loading state object coming from dash-renderer}

\item{multi}{Logical. If true, the user can select multiple values}

\item{options}{List of character | numeric | logicals | named list | list of lists containing elements 'label', 'value', 'disabled', 'visible'.
those elements have the following types:
  - label (a list of or a singular dash component, string or number; required): the option's label
  - value (character | numeric | logical; required): the value of the option. this value
corresponds to the items specified in the
`value` property.
  - disabled (logical; optional): if true, this option is disabled and cannot be selected.
  - visible (logical; optional): if false, this option is hidden from view.s. An array of options {label: [string|number], value: [string|number]},
an optional disabled field can be used for each option}

\item{placeholder}{Character. The grey, default text shown when no option is selected}

\item{searchable}{Logical. Whether to enable the searching feature or not}

\item{selectAll}{Logical. Adds the ability to select all options.}

\item{sortBySelected}{Logical. Defines if the are sorted by selected or not: Default: false}

\item{style}{Named list. Defines CSS styles which will override styles previously set.}

\item{value}{Character | numeric | logical | list of character | numeric | logicals. The value of the input. If `multi` is false (the default)
then value is just a string that corresponds to the values
provided in the `options` property. If `multi` is true, then
multiple values can be selected at once, and `value` is an
array of items with values corresponding to those in the
`options` prop.}

\item{withCountTag}{Logical. Defines if the select uses withCountTag or not}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

