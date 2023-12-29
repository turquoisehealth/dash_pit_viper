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
        html.Div(
            dash_pit_viper.PvSelectWithTag(
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
            ),
            className="pv-surface-accent pv-bordered pv-inset-square-24 pv-margin-auto",
            style={"maxWidth": "260px"},
        ),
        html.Label("Values", id="output"),
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
    app.run_server(debug=True)
