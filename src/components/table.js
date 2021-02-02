import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
// import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

// import { fetchAllInvoicesData } from "../services/services.js";

import axios from "axios";

// let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "company_id",
    numeric: false,
    disablePadding: true,
    label: "Company ID",
  },
  {
    id: "account_header_id",
    numeric: false,
    disablePadding: true,
    label: "Account Header ID",
  },
  {
    id: "document_number",
    numeric: true,
    disablePadding: false,
    label: "Document Number",
  },
  {
    id: "business_code",
    numeric: true,
    disablePadding: false,
    label: "Business_Code",
  },
  {
    id: "document_type",
    numeric: true,
    disablePadding: false,
    label: "Document Type",
  },
  {
    id: "customer_number",
    numeric: true,
    disablePadding: false,
    label: "Customer Number",
  },
  {
    id: "customer_map_id",
    numeric: true,
    disablePadding: false,
    label: "Customer Map ID",
  },
  {
    id: "name_of_customer",
    numeric: true,
    disablePadding: false,
    label: "Name Of Customer",
  },
  {
    id: "document_create_date",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  {
    id: "baseline_date",
    numeric: true,
    disablePadding: false,
    label: "Baseline Date",
  },
  {
    id: "invoice_date",
    numeric: true,
    disablePadding: false,
    label: "Invoice Date",
  },
  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "Invoice ID",
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount",
  },
  {
    id: "customer_payment_terms",
    numeric: true,
    disablePadding: false,
    label: "Customer Payment Terms",
  },
  {
    id: "clear_date",
    numeric: true,
    disablePadding: false,
    label: "Clear Date",
  },
  {
    id: "is_open_invoice",
    numeric: true,
    disablePadding: false,
    label: "Is Open Invoice",
  },
  {
    id: "shipping_date",
    numeric: true,
    disablePadding: false,
    label: "Shipping Date",
  },
  {
    id: "payment_amount",
    numeric: true,
    disablePadding: false,
    label: "Payment Amount",
  },
  {
    id: "days_past_due_date",
    numeric: true,
    disablePadding: false,
    label: "Days Past Due Date",
  },
  {
    id: "doc_id",
    numeric: true,
    disablePadding: false,
    label: "Doc ID",
  },
  // {
  //   id: "document_create_date",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Document Create Date",
  // },
  {
    id: "actual_amount_outstanding",
    numeric: true,
    disablePadding: false,
    label: "Actual Amount Outstanding",
  },
  {
    id: "age_of_invoice",
    numeric: true,
    disablePadding: false,
    label: "Age Of Invoice",
  },
  {
    id: "invoice_currency",
    numeric: true,
    disablePadding: false,
    label: "Invoice Currency",
  },
  {
    id: "predicted_payment_type",
    numeric: true,
    disablePadding: false,
    label: "Predicted Payment Type",
  },
  {
    id: "predicted_amount",
    numeric: true,
    disablePadding: false,
    label: "Predicted Amount",
  },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            (row) => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
                style={{ color: "grey" }}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  //   actions: {
  //     color: theme.palette.text.secondary,
  //   },
  title: {
    flex: "0 0 auto",
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar className={classNames(classes.root)}>
      <div className={classes.title}>
        <Typography
          variant="h6"
          id="tableTitle"
          style={{ color: "floralwhite" }}
        >
          Invoices
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Predict 1st PP">
            <Button
              autoid="predict-button"
              variant="contained"
              className={classes.button}
              onClick={props.predict}
              style={{
                color: "skyblue",
                border: "1px solid skyblue",
                backgroundColor: "rgb(27, 31, 56)",
              }}
            >
              PREDICT
            </Button>
          </Tooltip>
        ) : (
          <div>
            <Button
              autoid="predict-button"
              variant="contained"
              className={classes.button}
              style={{ color: "black", background: "grey" }}
              disabled="true"
            >
              PREDICT
            </Button>
          </div>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto",
    overflowY: "auto",
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    predictionData: [],
  };

  prediction = () => {
    var data = [];
    this.state.data.forEach((item) => {
      if (this.state.selected.includes(item.acct_doc_header_id)) {
        data.push(item);
      }
    });

    axios
      .post(
        "http://127.0.0.1:5000/predict?",
        {},
        {
          headers: { "Content-Type": "application/json" },
          params: {
            id: "1729025",
            data: data,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  componentDidMount() {
    axios.get("http://localhost:8080/1729025/invoices").then((res) => {
      this.setState({ data: res.data });
    });
    // console.log("table props : ", this.props.data);
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({
        selected: state.data.map((n) => n.document_id),
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, this.state.data.length - page * rowsPerPage);

    return (
      <Paper
        className={classes.root}
        style={{
          background: "rgb(37, 44, 72)",
          padding: "1em",
          marginTop: "0",
          height: "100%",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          predict={() => this.prediction(this.state.predictionData)}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            style={{
              background: "rgb(27, 31, 56)",
              display: "block",
              height: "14em",
              overflow: "auto",
            }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = this.isSelected(n.document_id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        this.handleClick(event, n.document_id)
                      }
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.document_id}
                      selected={isSelected}
                      style={{ color: "floralwhite" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        style={{ color: "floralwhite" }}
                      >
                        {n.company_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.acct_doc_header_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.document_number}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.business_code}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.doctype}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.customer_number}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.fk_customer_map_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.customer_name}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.document_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.baseline_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.invoice_date_normr}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.invoice_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.total_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.cust_payment_terms}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.clearing_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.isOpen}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.ship_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.paid_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.dayspast_due}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.document_id}
                      </TableCell>
                      {/* <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.document_create_date}
                      </TableCell> */}
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.actual_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.invoice_age}
                      </TableCell>
                      <TableCell align="right" style={{ color: "floralwhite" }}>
                        {n.invoice_amount_doc_currency}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ color: "floralwhite" }}
                      ></TableCell>
                      <TableCell
                        align="right"
                        style={{ color: "floralwhite" }}
                      ></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          style={{ color: "floralwhite" }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
