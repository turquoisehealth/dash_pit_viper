# AUTO GENERATED FILE - DO NOT EDIT

#' @export
pvSelect <- function(id=NULL, className=NULL, dataAlign=NULL, deselectAll=NULL, disabled=NULL, dropdownWidth=NULL, loading_state=NULL, multi=NULL, options=NULL, placeholder=NULL, searchable=NULL, selectAll=NULL, style=NULL, value=NULL, withCountTag=NULL) {
    
    props <- list(id=id, className=className, dataAlign=dataAlign, deselectAll=deselectAll, disabled=disabled, dropdownWidth=dropdownWidth, loading_state=loading_state, multi=multi, options=options, placeholder=placeholder, searchable=searchable, selectAll=selectAll, style=style, value=value, withCountTag=withCountTag)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'PvSelect',
        namespace = 'dash_pit_viper',
        propNames = c('id', 'className', 'dataAlign', 'deselectAll', 'disabled', 'dropdownWidth', 'loading_state', 'multi', 'options', 'placeholder', 'searchable', 'selectAll', 'style', 'value', 'withCountTag'),
        package = 'dashPitViper'
        )

    structure(component, class = c('dash_component', 'list'))
}
