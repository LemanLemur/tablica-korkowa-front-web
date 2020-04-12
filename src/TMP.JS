import React, { Component } from "react";
import axios from "axios";
import { GET_CARDS_BY_ID} from "../../constants/API";
import "./../index.css";
import "./index.css";
import Avatar from "@material-ui/core/Avatar";

class CardPage extends React.Component {
    constructor(props){
      super(props)
      
      this.state = {
        auth: "",
        dataDesktop1: [],
        isMobile: false,
        //isLoading: true
      }
    }

    componentWillMount(){
      window.addEventListener("resize", this.handleResize());
     
      //this.getUserData();
    }

    async componentDidMount(){
      axios.get(GET_CARDS_BY_ID + this.props.location.ID).then((res) => {
        console.log(res.data, "res")
        this.setState({dataDesktop1: res.data});
      });
    }

  handleResize() {
    if (window.innerWidth <= 1020) {
      this.setState( {isMobile: true} );
    } else {
      this.setState( {isMobile: false} );
    }
  }
/*
  async getUserData() {
    useDispatch({ type: START_LOAD_DATA });
    await axios.get(GET_USER_BY_AID_URL + this.auth).then(res => {
      useDispatch({ type: LOAD_USER, payload: res.data[0] });
    });
  }*/

  render() {
    return (
          <div className="container cardContainter">
            <div className="row">
              <div className="col-sm-12 col-md-9">
                {console.log(this.state.dataDesktop1.avatar, "av")}
          <Avatar alt="avatar" src={this.state.dataDesktop1.avatar} />
              </div>
              <div className="col-sm-12 col-md-3">
              </div>
            </div>
          </div>
    );
  }
}
export default CardPage
  
  