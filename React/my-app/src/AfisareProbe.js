import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { variables } from "./Variables";

export class AfisareProbe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_probe: [],
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch(variables.API_URL + '/InformatiiProba')
            .then(response => response.json())
            .then(data => {
        console.log(data);
                this.setState({ info_probe: data });
            });
    }

    render() {
        const {info_probe} = this.state;

        return (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nume Client</th>
                  <th>Prenume Client</th>
                  <th>CNP Client</th>
                  <th>Data inceperii probei scrise</th>
                  <th>durata proba scrisa</th>
                  <th>Locul sustinere proba scrisa</th>
                  <th>Data sustinerii traseu</th>
                  <th>Nume traseu</th>
                  <th>Durata traseu</th>
                  {/* <th>Optiuni</th> */}
                </tr>
              </thead>
              <tbody>
                {info_probe.map((info_proba) => {
                    return (
                        <tr key={info_proba.ID}>
                        <td>{info_proba.Nume}</td>
                        <td>{info_proba.Prenume}</td>
                        <td>{info_proba.CNP}</td>
                        <td>{info_proba.DataInceperii_scris ? info_proba.DataInceperii_scris : "-"}</td>
                        <td>{info_proba.durata_scris ? info_proba.durata_scris : "-"}</td>
                        <td>{info_proba.LoculSustinere_scris ? info_proba.LoculSustinere_scris : "-"}</td>
                        <td>{info_proba.DataSustinerii_traseu ? info_proba.DataSustinerii_traseu : "-"}</td>
                        <td>{info_proba.NumeTraseu ? info_proba.NumeTraseu : "-"}</td>
                        <td>{info_proba.DurataTraseu ? info_proba.DurataTraseu : "-"}</td>
                        <td>{info_proba.ZonaPlecare_traseu ? info_proba.ZonaPlecare_traseu : "-"}</td>
                        </tr>
                )})
                }
                {/* {info_probe.map((info_probe) => {
                  
                  return (
                    <td>{info_probe.Nume}</td>
                    <td>{info_probe.Prenume}</td>
                    <td>{info_probe.CNP}</td>
                    <td>{info_probe.DataInceperii_scris}</td>
                    <td>{info_probe.DataInceperii_scris}</td>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        );
    }
}
