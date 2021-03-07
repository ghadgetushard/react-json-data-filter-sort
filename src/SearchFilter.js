import React, { Component } from "react";
import data from "./data.json";

class SearchFilter extends Component {
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
  };
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="text-center text-capitalize pt-5">
            {" "}
            Filter Insurance Plans{" "}
          </h1>
          <hr className="w-25 mx-auto pb-5" />
          <div className="mb-5 row text-center">
            <div className="col-lg-4 col-md-4 col-12">
              <div className="form-group">
                <input
                  type="input"
                  className="form-control input-lg"
                  id="txt-insurance-type"
                  placeholder="Type here insurance type"
                  onChange={this.insuranceTypeValueEntered}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-12">
              <div className="form-group">
                <input
                  type="input"
                  className="form-control input-lg"
                  id="txt-insurance-provider"
                  placeholder="Type here insurance provider "
                  onChange={this.insuranceProviderValueEntered}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-12">
              <div className="form-group">
                <select
                  className="form-control input-lg"
                  name="agencyRepair"
                  id="txt-agency-repair"
                  onChange={this.agencyRepairValueSelected}
                >
                  <option defaultValue disabled>
                    --Select Agency repair cover--
                  </option>
                  <option value="included">Included</option>
                  <option value="excluded">Not Included</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-12">
              <div className="form-group">
                <select
                  id="sortfilter"
                  className="form-control input-lg"
                  onChange={this.sortBy}
                >
                  <option defaultValue disabled>
                    -- select Premium order --
                  </option>
                  <option value="asc">Premium: Low to High</option>
                  <option value="des">Premium: High to Low</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-12">
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary"
                  onClick={this.clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mb-5 row text-center">
            {this.state.itemsToDisplay.map((rest, index) => {
              return (
                <div className="col-lg-4 col-md-4 col-12" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {rest["provider"]["en-ae"]["product_name"]}
                      </h5>
                      <a href="#" className="btn btn-primary">
                        {rest["premium"]}&nbsp;{rest["currency"]}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  insuranceTypeValueEntered = () => {
    var e = document.getElementById("txt-insurance-type");
    var selected = e.value;
    let itemsToDisplay = this.state.itemsToUse.filter((item) =>
      item["insurance_type"].toLowerCase().includes(selected.toLowerCase())
    );
    this.setState({ itemsToDisplay });
  };

  insuranceProviderValueEntered = () => {
    var e = document.getElementById("txt-insurance-provider");
    var selected = e.value;
    let itemsToDisplay = this.state.itemsToUse.filter((item) =>
      item["provider"]["en-ae"]["name"]
        .toLowerCase()
        .includes(selected.toLowerCase())
    );
    this.setState({ itemsToDisplay });
  };

  clearFilters = () => {
    document.getElementById("txt-insurance-type").value = "";
    document.getElementById("txt-insurance-provider").value = "";
    document.getElementById("txt-agency-repair").value =
      "--Select Agency repair cover--";
    document.getElementById("sortfilter").value = "-- select Premium order --";

    this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
  };

  agencyRepairValueSelected = () => {
    var e = document.getElementById("txt-agency-repair");
    var selected = e.options[e.selectedIndex].value;
    let itemsToDisplay = this.state.itemsToUse.filter(function (item) {
      console.log(item);

      var agencyrepair = item["covers"].find(function (cover) {
        return cover.name === "agencyRepair";
      });
      console.log(agencyrepair.type, selected);
      return selected === "excluded"
        ? agencyrepair.type === selected
        : agencyrepair.type !== "excluded";
    });
    console.log("items to dislay : ", itemsToDisplay);
    this.setState({ itemsToDisplay });
  };

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function (a, b) {
        return a["premium"] - b["premium"];
      });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function (a, b) {
        return b["premium"] - a["premium"];
      });
      this.setState({ itemsToDisplay });
    }
  };

  componentDidMount() {
    this.setState({ itemsToDisplay: data }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }
}

export default SearchFilter;
