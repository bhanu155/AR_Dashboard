import React, { Component } from "react";
import axios from "axios";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import Card from "@material-ui/core/Card";

class Chart extends Component {
  state = { codeDim: {}, tempObject: {}, options: {} };
  prepareDataForHighcharts(groups) {
    var categories = [];
    var data = [];
    var gdata = groups.all();

    gdata.forEach((d) => {
      categories.push(d.key);
      data.push(d.value);
    });

    return { categories: categories, data: data };
  }
  componentDidMount() {
    var fun = this.props;
    axios
      .get("http://localhost:8080/1729025/invoices")
      .then((res) => {
        // console.log("axios says : ", res.data);
        var crossfilter = require("crossfilter");
        var data = crossfilter(res.data);

        var codeDim = data.dimension((d) => d.business_code);
        var quantityGroup1 = codeDim.group().reduceCount((d) => d.isOpen);

        var tempObject = this.prepareDataForHighcharts(quantityGroup1);

        return { data: tempObject.data, categories: tempObject.categories };
      })
      .then((tempObject, codeDim) => {
        const options = {
          chart: {
            renderTo: "chart",
            type: "bar",
            backgroundColor: "rgba(0,0,0,0)",
          },
          title: {
            text: "Total Amount By Company Code",
            style: {
              color: "floralwhite",
              fontSize: "15px",
            },
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            categories: tempObject.categories,
            // categories: ["a", "b", "c"],
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: "transparent",
            minorTickLength: 0,
            tickLength: 0,
            labels: {
              style: {
                color: "floralwhite",
              },
            },
          },
          yAxis: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: "transparent",
            labels: {
              enabled: false,
            },
            minorTickLength: 0,
            tickLength: 0,
            visible: false,
          },
          plotOptions: {
            column: {
              pointWidth: 20,
              pointPadding: 1.0,
              // borderWidth: 0,
              //   pointMargin: 10,
            },
            series: {
              point: {
                events: {
                  click: function () {
                    this.select(null, true);

                    var selectedPoints = this.series.chart.getSelectedPoints();

                    //   console.log(selectedPoints);

                    var filteredPoints = [];

                    for (
                      let index = 0;
                      index < selectedPoints.length;
                      index++
                    ) {
                      filteredPoints.push(selectedPoints[index].category);
                    }

                    // console.log("in options : ", filteredPoints);
                    // console.log(fun.onFilter);
                    fun.onFilter(filteredPoints);
                  },
                },
              },
            },
          },

          series: [{ name: "Count", data: tempObject.data }],
          //   series: [{ name: "bhanu", data: [1, 3, 4] }],
        };
        this.setState({ tempObject, codeDim, options });
      });
  }

  render() {
    return (
      <Card
        style={{
          height: "10em",
          width: "100%",
          background: "rgb(37, 44, 72)",
          overflowY: "scroll",
          padding: "1em",
        }}
      >
        <div id="chart">
          <HighchartsReact
            autoid="companycode-chart"
            highcharts={Highcharts}
            options={this.state.options}
          />
        </div>
      </Card>
    );
  }
}

export default Chart;
