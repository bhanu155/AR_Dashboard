import React, { Component } from "react";
// import classNames from "classnames";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

class SearchResult extends Component {
  state = {};

  converted = (n) => "$_" + parseInt(n);

  render() {
    const rows = [
      {
        id: "customer_name",
        numeric: false,
        disablePadding: true,
        label: "Customer Name",
      },
      {
        id: "customer_number",
        numeric: false,
        disablePadding: true,
        label: "Customer Number",
      },
      {
        id: "open_amount",
        numeric: false,
        disablePadding: true,
        label: "Open Amount",
      },
    ];

    return (
      <Table
        style={{
          background: "rgb(27, 31, 56)",
          display: "block",
          height: "10em",
          overflow: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            {rows.map((row) => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding="default"
                //   sortDirection={orderBy === row.id ? order : false}
                style={{
                  color: "grey",
                  paddingLeft: "2em",
                  paddingRight: "1em",
                  marginLeft: "1em",
                }}
              >
                {row.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data.map((cust) => (
            <TableRow key={cust.customer_number}>
              <TableCell
                style={{
                  paddingRight: "1em",
                  paddingLeft: "2em",
                }}
              >
                <Link
                  to={"/customer-dashboard/" + cust.customer_number}
                  style={{ color: "floralwhite", textDecoration: "none" }}
                >
                  {cust.customer_name}
                </Link>
              </TableCell>
              <TableCell style={{ color: "floralwhite", paddingRight: "1em" }}>
                <Link
                  to={"/customer-dashboard/" + cust.customer_number}
                  style={{ color: "floralwhite", textDecoration: "none" }}
                >
                  {cust.customer_number}
                </Link>
              </TableCell>
              <TableCell style={{ color: "floralwhite", paddingRight: "1em" }}>
                <Link
                  to={"/customer-dashboard/" + cust.customer_number}
                  style={{ color: "floralwhite", textDecoration: "none" }}
                >
                  {this.converted(cust.totalOpenAmount)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
export default SearchResult;
