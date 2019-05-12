import React from "react"

import './emiCalculator.css'

class EmiCalculator extends React.Component{
  constructor(props) {
    super(props);

    this.fillTable=this.fillTable.bind(this);
    this.showTable=this.showTable.bind(this);
    this.hideTable=this.hideTable.bind(this);
    this.calculateEMI=this.calculateEMI.bind(this);
  }


  calculateEMI(loanAmount,numberOfMonths,rateOfInterest1,rateOfInterest2){
    var I1 = rateOfInterest1/12/100;  //monthlyInterestRatio
    var emi1 = (loanAmount*I1*Math.pow((1+I1),numberOfMonths))/(Math.pow((1+I1),numberOfMonths)-1);
    var I2 = rateOfInterest2/12/100;  //monthlyInterestRatio
    var emi2 = (loanAmount*I2*Math.pow((1+I2),numberOfMonths))/(Math.pow((1+I2),numberOfMonths)-1);
    return [emi1.toFixed(2),emi2.toFixed(2)];
  }

  fillTable(){
    var table= document.getElementById("table");
    var amount = document.getElementById("amount");
    var tableRef = table.getElementsByTagName('tbody')[0];
    while(tableRef.hasChildNodes()){
      tableRef.removeChild(tableRef.firstChild);
    }
    let months = [1,2,3,6,9,12,18,24];
    for(let i in months){
      var emi=this.calculateEMI(amount.value,months[i],this.props.rateOfInterest1,this.props.rateOfInterest2);
      var row   = tableRef.insertRow(tableRef.rows.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = months[i];
      cell2.innerHTML = "₹ " + emi[0].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") +" - "+"₹" +emi[1].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      cell3.innerHTML = "₹ " + parseInt(emi[0]*months[i]-amount.value).toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - "+"₹" +parseInt(emi[1]*months[i]-amount.value).toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  showTable(){
    var table= document.getElementById("table")
    var showTableBtn = document.getElementById("showTableBtn")
    table.classList.remove("d-none");
    showTableBtn.classList.add('d-none');
  }
  hideTable(){
    var table= document.getElementById("table")
    table.classList.add("d-none");
  }
  
  componentDidMount(){
    var self = this;
    var slider = this.refs.slider;
    var amount = this.refs.amount;
    var minAmount = this.props.minAmount;
    var maxAmount = this.props.maxAmount;
    var popup = this.refs.popup;
    var table = this.refs.table;
    var showTableBtn = this.refs.showTableBtn;
    amount.value = minAmount;
    this.fillTable();

    slider.oninput = function() {
      amount.value = this.value;
      self.fillTable();
      if(this.value>=minAmount && this.value<=maxAmount && table.matches(".d-none")){
        showTableBtn.classList.remove('d-none');
      }
    }
    amount.oninput = function(){
      if(this.value<minAmount || this.value>maxAmount){
        popup.classList.add("show");
        showTableBtn.classList.add('d-none');
        self.hideTable();
      }else{
        popup.classList.remove("show");
        showTableBtn.classList.remove('d-none');
      }
      slider.value = this.value;
      self.fillTable();
    }
    amount.addEventListener('keydown',function(e){
      if (e.which === 40 && this.value<=minAmount) {
        e.preventDefault();
      }
      if (e.which === 38 && this.value>=maxAmount) {
        e.preventDefault();
      }
    });
  }

  render(){
    return(
      <>
        <div className="container">
          <div className="row center">
            <div className="col-md-6 m-auto">
              <div className="card shadow-9 shadow-lg p-5">
                <div className="card-body">
                  <p className="m-0 fw-400 text-center">Loan Amount</p>
                  <input type="number" ref="amount" className="form-control text-dark amount fw-600" id="amount"></input>                  
                  <br/>
                  <input type="range" ref="slider" min={this.props.minAmount} max={this.props.maxAmount} defaultValue={this.props.minAmount} className="slider" id="slider"/>
                  <p><small className="float-left">₹ {this.props.minAmount}</small>
                  <small className="float-right">₹ {this.props.maxAmount}</small></p>
                  <br/>
                  <br/>
                  <center><a style={{cursor: 'pointer'}} className="fw-600 text-primary" ref="showTableBtn" id="showTableBtn" onClick={this.showTable}>See EMI Plans</a></center>
                </div>
                <table ref="table" id="table" className="table table-small table-hover d-none">
                  <thead className="thead-light">
                    <tr>
                      <th>No. of months</th>
                      <th>EMI (per month)</th>
                      <th>Total interest</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div id="popup-bottom-center" ref="popup" className="popup bg-dark md-col-6 col-md-4" data-position="bottom-center" data-animation="slide-up">
          <button type="button" className="close text-white" data-dismiss="popup" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <p className="text-white text-center">Min. amount {this.props.minAmount} & Max amount is {this.props.maxAmount}</p>
          <button type="button" className="btn btn-primary text-white float-right" data-dismiss="popup" aria-label="Close">close</button>
        </div>
      </>
    )
  }
}
export default EmiCalculator



