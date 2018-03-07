import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user:'', team:[]
    }
  }
  
  klik(){
    this.setState({user: this.refs.nama.value});
  }
  click() {
    var teamName = this.state.user;
    axios.get('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+teamName)
    .then((getData) => {
      console.log(getData.data.player);
      this.setState({
        team: getData.data.player
      })
    })
  }
  render() {
    const data = this.state.team.map((item, index) => {
      var nama = item.strPlayer;
      var posisi = item.strPosition;
      var foto = item.strThumb;
      var deskripsi = item.strDescriptionEN;
      return (
      <div className="row">
      <div className="col-xs-12 col-lg-12">
      <div className="panel panel-primary">
      <div className="panel-heading">
      <h4><b>{nama}&nbsp;({posisi})</b></h4>
      </div>
      <div className="panel-body">
      <div className="col-lg-4">
      <img src={foto} alt="ok"/>
      </div>
      <div className="col-lg-8">
      <p id="desk">{deskripsi}</p>
      </div>
      </div>
      </div></div></div>
    )})
    return (
      <div className="container">
        <center>
        <h1>Daftar Pemain {this.state.user}</h1>
        <br/>
        <div className="row">
        <div className="col-md-8">
        <input ref="nama" type="text" className="form-control" placeholder="Team Name"
         onInput={()=>{this.klik();}} />
        </div>
        <div className="col-md-4">
        <button className="btn btn-success btn-block" type="submit" 
        onClick={()=>{this.click();}}>Lihat Daftar</button>
        </div>
        </div>
      </center>
      <br />
      {data}
      </div>
    );
  }
}

export default App;
