from dash import Dash, Input, Output, html

import dash_pit_viper

app = Dash(
    __name__,
    external_stylesheets=["https://pitviper.turquoise.health/assets/css/pit-viper.css?v=1.13.0"],
)

app.layout = html.Div(
    [
        dash_pit_viper.PvIcon(
            id="input",
            className="pv-icon",
            href="#settings",
        ),
        html.Button("add options", id="add-options"),
        html.H1("Pit Viper Select With Tag (dict)"),
        html.Div(
            dash_pit_viper.PvSelect(
                options=[
                    {"label": "Option 1", "value": "1"},
                    {"label": "Option 2", "value": "2"},
                ],
                id="select",
                value=["1"],
                multi=True,
                selectAll=True,
                deselectAll=True,
                dataAlign="right",
                placeholder="Providers",
                withCountTag=True,
            ),
            className="pv-surface-accent pv-bordered pv-inset-square-24 pv-margin-auto",
            style={"maxWidth": "260px"},
        ),
        html.Label("Values", id="output"),
        html.H1("Pit Viper Select With Tag (list)"),
        html.Div(
            dash_pit_viper.PvSelect(
                options=list(range(1, 10)),
                id="select2",
                value=[1],
                multi=True,
                selectAll=True,
                deselectAll=True,
                searchable=True,
                dataAlign="right",
                placeholder="Providers",
                dropdownWidth="260px",
                withCountTag=True,
                sortBySelected=True,
            ),
            className="pv-surface-accent pv-bordered pv-inset-square-24 pv-margin-auto",
            style={"maxWidth": "260px"},
        ),
        html.H1("Pit Viper Select(list)"),
        html.Div(
            dash_pit_viper.PvSelect(
                options=["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"],
                id="select3",
                value="3",
                multi=False,
                selectAll=True,
                deselectAll=True,
                dataAlign="right",
                placeholder="Providers",
                dropdownWidth="260px",
                withCountTag=False,
            ),
            className="pv-surface-accent pv-bordered pv-inset-square-24 pv-margin-auto",
            style={"maxWidth": "260px"},
        ),
    ]
)


@app.callback(
    [
        Output("select", "options"),
        Output("select", "value"),
    ],
    [Input("add-options", "n_clicks")],
)
def add_options(n_clicks):
    if n_clicks is None:
        return [
            {"label": "Option 1", "value": "1"},
            {"label": "Option 2", "value": "2"},
        ], ["1"]
    return [{"label": f"Option {i}", "value": str(i)} for i in range(n_clicks)], [str(n_clicks - 1)]


@app.callback(Output("output", "children"), [Input("select", "value")])
def display_output(value):
    return value


if __name__ == "__main__":
    app.run_server(port=9051, debug=True)
