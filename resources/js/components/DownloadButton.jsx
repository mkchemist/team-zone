import React from "react";
import PropTypes from "prop-types";

function addScript(url) {
  var script = document.createElement("script");
  script.type = "application/javascript";
  script.src = url;
  document.head.appendChild(script);
}
addScript(
  "https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"
);
addScript(
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.min.js"
);

function DownloadButton({ name, data, keys, buttons }) {
  let [exportData, setExportData] = React.useState([]);

  React.useEffect(() => {
    let $data = [];
    data.map((item) => {
      let row = {};
      keys.map((key) => {
        let val = item[key];
        if (val instanceof Date) {
          val = new Date(val).toLocaleString();
        }
        row[key] = val;
      });
      $data.push(row);
    });
    setExportData($data);
  }, [data, keys]);

  const buildExportTable = () => {
    let tbl = document.createElement("table");
    tbl.classList.add("table", "table-sm", "small", "table-striped");
    tbl.style.fontSize = "10px";
    let head = document.createElement("thead");
    let body = document.createElement("tbody");
    let _headContent = `<tr>`;
    keys.map((key) => {
      _headContent += `<th>${key[0].toUpperCase() + key.substr(1)}</th>`;
    });
    head.innerHTML += _headContent;
    exportData.map((row) => {
      let _rowContent = "<tr>";
      for (let key in row) {
        _rowContent += `<td>${row[key]}</td>`;
      }
      _rowContent += "</tr>";
      body.innerHTML += _rowContent;
    });
    tbl.append(head);
    tbl.append(body);
    return tbl;
  };

  const exportToExcel = (e) => {
    e.preventDefault();
    let table = buildExportTable();
    console.log(XLSX)
    let sheet = XLSX.utils.table_to_sheet(table);
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, sheet, name);
    XLSX.writeFile(wb, name+'.xls');
  };

  const exportToPDF = (e) => {
    e.preventDefault();
    let table = buildExportTable();
    html2pdf().from(table).save(name);
  };

  return (
    <div className={`dropdown my-1`}>
      <button
        data-toggle="dropdown"
        className={`btn btn-sm btn-block btn-success dropdown-toggle`}
      >
        Download
      </button>
      <div className="dropdown-menu">
        {buttons.includes('excel') && (
          <a href="" className="dropdown-item small" onClick={exportToExcel}>
            <span className="fa fa-file-excel mr-1"></span>
            <span>to Excel</span>
          </a>
        )}
        {buttons.includes('pdf') && (
          <a href="" className="dropdown-item small" onClick={exportToPDF}>
            <span className="fa fa-file-pdf mr-1"></span>
            <span>to PDF</span>
          </a>
        )}
      </div>
    </div>
  );
}

DownloadButton.defaultProps = {
  keys: [],
  name: "file",
  buttons: ['excel', 'pdf']
};

DownloadButton.propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.array,
  name: PropTypes.string,
  buttons: PropTypes.array
};

export default DownloadButton;
