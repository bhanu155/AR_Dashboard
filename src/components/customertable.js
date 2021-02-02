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

import { lighten } from "@material-ui/core/styles/colorManipulator";

import axios from "axios";
import Modal from "@material-ui/core/Modal";
import SimpleCard from "../components/modifyCard.js";

import { CSVLink, CSVDownload } from "react-csv";

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
  // {
  //   id: "predicted_payment_type",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Predicted Payment Type",
  // },
  // {
  //   id: "predicted_amount",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Predicted Amount",
  // },
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
    <Toolbar className={classNames(classes.root)} style={{ paddingLeft: "0" }}>
      <div className={classes.title}>
        {numSelected === 1 ? (
          <div>
            <Button
              autoid="modify-button"
              onClick={props.handleModalOpen}
              variant="contained"
              className={classes.button}
              style={{
                color: "skyblue",
                backgroundColor: "rgb(27, 31, 56)",
                border: "1px solid skyblue",
                marginRight: "2em",
              }}
            >
              Modify
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={props.modalopen}
              // onClose={props.handleModalClose}
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <SimpleCard
                onSave={props.handleModify}
                onClose={props.handleModalClose}
                selected={props.selected}
              />
            </Modal>
            <Button
              autoid="export-button"
              variant="contained"
              className={classes.button}
              style={{
                color: "skyblue",
                backgroundColor: "rgb(27, 31, 56)",
                border: "1px solid skyblue",
                marginRight: "2em",
              }}
              onClick={props.handleExport}
            >
              <CSVLink
                data={props.csvdata}
                headers={props.csvhead}
                filename={"1729025_exportedData.csv"}
                target="_blank"
                style={{ textDecoration: "none", color: "skyblue" }}
              >
                {console.log("data in props of button :", props.csvdata)}
                Export
              </CSVLink>
            </Button>
          </div>
        ) : numSelected > 1 ? (
          <div>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "grey",
                border: "1px solid grey",
                marginRight: "2em",
              }}
              disabled="true"
            >
              Modify
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "skyblue",
                backgroundColor: "rgb(27, 31, 56)",
                border: "1px solid skyblue",
                marginRight: "2em",
              }}
              onClick={props.handleExport}
            >
              <CSVLink
                data={props.csvdata}
                headers={props.csvhead}
                filename={"1729025_exportedData.csv"}
                target="_blank"
                style={{ textDecoration: "none", color: "skyblue" }}
              >
                {console.log("data in props of button :", props.csvdata)}
                Export
              </CSVLink>
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "grey",
                border: "1px solid grey",
                marginRight: "2em",
              }}
              disabled="true"
            >
              Modify
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "grey",
                border: "1px solid grey",
                marginRight: "2em",
              }}
              disabled="true"
            >
              Export
            </Button>
          </div>
        )}
      </div>
      <div className={classes.spacer} />

      <div>
        <Typography
          style={{
            marginRight: "2em",
            paddingLeft: "1em",
            borderLeft: "0.5px solid grey",
            width: "max-content",
          }}
        >
          <h4
            autoid="total-open-invoices-customer"
            style={{
              fontSize: "1.5em",
              color: "floralwhite",
              marginBottom: "0",
            }}
          >
            {props.toi}
          </h4>
          <p style={{ color: "grey", marginTop: "0" }}>Total Open Invoices</p>
        </Typography>
      </div>
      <div>
        <Typography
          style={{
            marginRight: "2em",
            paddingLeft: "1em",
            borderLeft: "0.5px solid grey",
            width: "max-content",
          }}
        >
          <h4
            autoid="total-open-amount-customer"
            style={{
              fontSize: "1.5em",
              color: "floralwhite",
              marginBottom: "0",
            }}
          >
            {props.toa}
          </h4>
          <p style={{ color: "grey", marginTop: "0" }}>Total Open Amount</p>
        </Typography>
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
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      toi: 0,
      toa: 0,
      csvdata: [],
      csvhead: [],
      modalopen: false,
    };
  }
  //   state = {
  //     order: "asc",
  //     orderBy: "calories",
  //     selected: [],
  //     data: [],
  //     page: 0,
  //     rowsPerPage: 5,
  //     toi: 0,
  //     toa: 0,
  //   };

  handleModify = () => {
    const newAmount = document.getElementById("openAmount").value;
    const newType = document.getElementById("documentType").value;
    // send post request to update DB
    const k = this.state.selected[0];
    console.log(k, newAmount, newType);

    axios
      .get(
        "http://localhost:8080/1729025/modifypost?id=" +
          k +
          "&amt=" +
          newAmount +
          "&type=" +
          newType
      )
      .then((response) => console.log(response));
    this.setState({ modalopen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalopen: true });
  };

  handleModalClose = () => {
    this.setState({ modalopen: false });
  };
  handleExport = () => {
    const arr = this.state.selected;
    const csvhead = [
      { label: "acct_doc_header_id", key: "acct_doc_header_id" },
      { label: "company_id", key: "company_id" },
      { label: "document_number", key: "document_number" },
      { label: "document_number_norm", key: "document_number_norm" },
      { label: "business_code", key: "business_code" },
      { label: "create_year", key: "create_year" },
      { label: "document_line_number", key: "document_line_number" },
      { label: "doctype", key: "doctype" },
      { label: "customer_number", key: "customer_number" },
      { label: "customer_number_norm", key: "customer_number_norm" },
      { label: "fk_customer_map_id", key: "fk_customer_map_id" },
      { label: "customer_name", key: "customer_name" },
      { label: "division", key: "division" },
      { label: "document_create_date", key: "document_create_date" },
      { label: "document_create_date_norm", key: "document_create_date_norm" },
      // { label: "posting_date", key: "posting_date" },
      // { label: "posting_date_norm", key: "posting_date_norm" },
      { label: "posting_id", key: "posting_id" },
      // { label: "due_date", key: "due_date" },
      // { label: "due_date_norm", key: "due_date_norm" },
      // { label: "order_date", key: "order_date" },
      // { label: "order_date_norm", key: "order_date_norm" },
      { label: "invoice_id", key: "invoice_id" },
      { label: "invoice_id_norm", key: "invoice_id_norm" },
      // { label: "baseline_create_date", key: "baseline_create_date" },
      // { label: "invoice_date_norm", key: "invoice_date_norm" },
      { label: "total_open_amount", key: "total_open_amount" },
      { label: "total_open_amount_norm", key: "total_open_amount_norm" },
      { label: "cust_payment_terms", key: "cust_payment_terms" },
      { label: "business_area", key: "business_area" },
      // { label: "ship_date", key: "ship_date" },
      { label: "ship_to", key: "ship_to" },
      { label: "clearing_date", key: "clearing_date" },
      { label: "clearing_date_norm", key: "clearing_date_norm" },
      { label: "reason_code", key: "reason_code" },
      { label: "isOpen", key: "isOpen" },
      // { label: "discount_due_date_norm", key: "discount_due_date_norm" },
      // { label: "debit_credit_indicator", key: "debit_credit_indicator" },
      { label: "payment_method", key: "payment_method" },
      // { label: "document_creation_date", key: "document_creation_date" },
      {
        label: "invoice_amount_doc_currency",
        key: "invoice_amount_doc_currency",
      },
      { label: "document_id", key: "document_id" },
      { label: "actual_open_amount", key: "actual_open_amount" },
      { label: "paid_amount", key: "paid_amount" },
      { label: "dayspast_due", key: "dayspast_due" },
      { label: "invoice_age", key: "invoice_age" },
      { label: "disputed_amount", key: "disputed_amount" },
    ];

    var csvdata = [];

    arr.forEach((item) => {
      //query database and get an array of invoices against document_id
      axios
        .get(
          'http://localhost:8080/1729025/csvdataapi?key="' +
            parseInt(item) +
            '"'
        )
        .then((res) => {
          res.data.forEach((d) => {
            csvdata.push({
              acct_doc_header_id: d.acct_doc_header_id.toString(),
              company_id: d.company_id.toString(),
              document_number: d.document_number.toString(),
              document_number_norm: d.document_number_norm.toString(),
              business_code: d.business_code,
              create_year: d.create_year,
              document_line_number: d.document_line_number.toString(),
              doctype: d.doctype,
              customer_number: d.customer_number.toString(),
              customer_number_norm: d.customer_number_norm.toString(),
              fk_customer_map_id: d.fk_customer_map_id.toString(),
              customer_name: d.customer_name,
              division: d.division,
              document_create_date: d.document_create_date.toString(),
              document_create_date_norm: d.document_create_date_norm.toString(),
              // posting_date: d.posting_date,
              // posting_date_norm: d.posting_date_norm,
              posting_id: d.posting_id,
              // due_date: d.due_date,
              // due_date_norm: d.due_date_norm,
              // order_date: d.order_date,
              // order_date_norm: d.order_date_norm,
              invoice_id: d.invoice_id.toString(),
              invoice_id_norm: d.invoice_id_norm.toString(),
              // baseline_create_date: d.baseline_create_date,
              // invoice_date_norm: d.invoice_date_norm,
              total_open_amount: d.total_open_amount.toString(),
              total_open_amount_norm: d.total_open_amount_norm.toString(),
              cust_payment_terms: d.cust_payment_terms.toString(),
              business_area: d.business_area,
              // ship_date: d.ship_date,
              ship_to: d.ship_to,
              clearing_date: d.clearing_date.toString(),
              clearing_date_norm: d.clearing_date_norm.toString(),
              reason_code: d.reason_code,
              isOpen: d.isOpen.toString(),
              // discount_due_date_norm: d.discount_due_date_norm,
              // debit_credit_indicator: d.debit_credit_indicator,
              payment_method: d.payment_method,
              // document_creation_date: d.document_creation_date,
              invoice_amount_doc_currency: d.invoice_amount_doc_currency.toString(),
              document_id: d.document_id.toString(),
              actual_open_amount: d.actual_open_amount.toString(),
              paid_amount: d.paid_amount.toString(),
              dayspast_due: d.dayspast_due.toString(),
              invoice_age: d.invoice_age.toString(),
              disputed_amount: d.disputed_amount.toString(),
            });
            // add each of the result to csvdata[]
          });
        });
    });
    csvdata.push({
      acct_doc_header_id: "543242125",
      actual_open_amount: "8088.13",
      business_area: "",
      business_code: "mdtd4",
      clearing_date: "Apr 21, 2019",
      clearing_date_norm: "Apr 21, 2019",
      company_id: "60",
      create_year: "",
      cust_payment_terms: "60",
      customer_name: "mdassist pvt ltd",
      customer_number: "226552",
      customer_number_norm: "226552",
      dayspast_due: "-1",
      disputed_amount: "0",
      division: "",
      doctype: "RI",
      document_create_date: "Feb 21, 2019",
      document_create_date_norm: "Feb 21, 2019",
      document_id: "543242125",
      document_line_number: "0",
      document_number: "46480991",
      document_number_norm: "46480991",
      fk_customer_map_id: "-1",
      invoice_age: "59",
      invoice_amount_doc_currency: "8088.13",
      invoice_id: "46480991",
      invoice_id_norm: "46480991",
      isOpen: "0",
      paid_amount: "8088.13",
      payment_method: "",
      posting_id: "",
      reason_code: "",
      ship_to: "",
      total_open_amount: "0",
      total_open_amount_norm: "0",
    });
    console.log("data before setState : ", csvdata);
    this.setState({ csvdata, csvhead });
  };
  convertToString = (num) => {
    var res = "$";

    if (parseInt(num / 1000000000) > 0) {
      let n = parseInt(num / 1000000000);
      let q = " B";
      res = res + n + q;
    } else if (parseInt(num / 1000000) > 0) {
      let n = parseInt(num / 1000000);
      let q = " M";
      res = res + n + q;
    } else if (parseInt(num / 1000) > 0) {
      let n = parseInt(num / 1000);
      let q = " K";
      res = res + n + q;
    } else {
      res = res + parseInt(num);
    }

    return res;
  };
  componentDidMount() {
    const key = parseInt(window.location.href.split("/")[5]);

    axios
      .get("http://localhost:8080/1729025/customerDetails?key=" + key)
      .then((res) => {
        let toa = 0;
        let toi = 0;
        res.data.forEach((inv) => {
          toa += inv.total_open_amount;
          if (inv.isOpen === 1) {
            toi++;
          }
        });
        this.setState({
          data: res.data,
          toa: this.convertToString(toa),
          toi: parseInt(toi),
        });
      });
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
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper
        className={classes.root}
        style={{
          background: "rgb(37, 44, 72)",
          padding: "1em",
          height: "100%",
          margin: "auto",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          toi={this.state.toi}
          toa={this.state.toa}
          handleExport={() => this.handleExport()}
          csvdata={this.state.csvdata}
          csvhead={this.state.csvhead}
          modalopen={this.state.modalopen}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
          handleModify={this.handleModify}
          selected={this.state.selected}
        />
        <div className={classes.tableWrapper}>
          <Table
            autoid="invoice-table-customer"
            className={classes.table}
            aria-labelledby="tableTitle"
            style={{
              background: "rgb(27, 31, 56)",
              display: "block",
              height: "15em",
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
                      {/* <TableCell
                        align="right"
                        style={{ color: "floralwhite" }}
                      ></TableCell>
                      <TableCell
                        align="right"
                        style={{ color: "floralwhite" }}
                      ></TableCell> */}
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
          autoid="invoice-table-pagination-customer"
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

// EnhancedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(EnhancedTable);

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          style={{
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <SimpleCard onClose={() => this.handleClose()} />
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
