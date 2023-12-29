# AUTO GENERATED FILE - DO NOT EDIT

#' @export
pvSelectWithTag <- function(id=NULL, className=NULL, dataAlign=NULL, deselectAll=NULL, disabled=NULL, loading_state=NULL, multi=NULL, options=NULL, placeholder=NULL, searchable=NULL, selectAll=NULL, style=NULL, value=NULL) {
    
    props <- list(id=id, className=className, dataAlign=dataAlign, deselectAll=deselectAll, disabled=disabled, loading_state=loading_state, multi=multi, options=options, placeholder=placeholder, searchable=searchable, selectAll=selectAll, style=style, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'PvSelectWithTag',
        namespace = 'dash_pit_viper',
        propNames = c('id', 'className', 'dataAlign', 'deselectAll', 'disabled', 'loading_state', 'multi', 'options', 'placeholder', 'searchable', 'selectAll', 'style', 'value'),
        package = 'dashPitViper'
        )

    structure(component, class = c('dash_component', 'list'))
}
