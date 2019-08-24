import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography } from 'antd';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Carousel from './Carousel'
import { Modal } from 'antd';
import { Container, Col, Row, Image } from 'react-bootstrap';
import Form from "./registrationForm"
import Profile from './userProfile'
import ContentTeamMembers from './contentTeamMembers'
import ContentImages from './contentImages'
import Bot from './chatBot'
import 'antd/dist/antd.css';

const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

class App extends React.Component {

  constructor(props){
    super(props)
  }

  state = { visible1: false, 
            visibleUsersList: false, 
            user: null, 
            visibleForm: false,
            userResponses: [],
            showTeamMembers: false, 
          };

  showModal = () => {
    console.log("Modal on click called!")
    this.setState((state) => {
      return {...state, visible: true}
    });
  };

  showRegistrationForm = () => {
    console.log("Handler called")
    this.setState((state) => {
      return {...state, visibleForm: true}
    });
  }

  showUsersList = () => {
    this.setState((state) => {
      return {...state, showTeamMembers: !this.state.showTeamMembers, visibleUsersList: false}
    }, ()=> {
      console.log(this.state)
    });
  }

  handleOk = () => {
    this.setState((state) => {
      return {...state, visible: false, informationAdded: true}
    });
  };

  handleOKRegistrationForm = u => {
    this.setState((state) => {
      return {...state, visibleForm: false, user: u}
    });
  }

  handleOKShowUsersList = () => {
    this.setState((state) => {
      return {...state, visibleUsersList: false}
    });
  }

  handleCancel = e => {
    console.log(e);
    this.setState((state) => {
      return {...state, visible: false}
    });
  };

  handleCancelRegistrationForm = e => {
    console.log("Registration Form should be cancelled")
    this.setState((state) => {
      return {...state, visibleForm: false}
    });
  }

  handleCancelUsersList = () => {
    this.setState((state) => {
      return {...state, visibleUsersList: false}
    });
  }

  delay = (t, v) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

  handleEnd = () => {
    this.delay(2 * 1000)
    .then(() => {
      console.log(this.state)
      this.handleOk()
    })
  }

  render(){
    var conditionalButton; 
    if ((this.state.user) && (!this.state.informationAdded)){
      conditionalButton = <div>
                              <Button onClick={this.showModal} variant="contained" color="primary" style={{padding: "10px", margin: "10px"}}>
                                Tell us more about Yourself 
                              </Button>
                              <Button variant="contained" color="primary" onClick={this.showUsersList} style={{padding: "10px", margin: "10px"}}>
                                Find your Team Members
                              </Button>
                          </div>
    } else if (this.state.user) { 
      conditionalButton = <div>
                            <Button variant="contained"  onClick={this.showUsersList} color="primary" style={{padding: "10px", margin: "10px"}}>
                              Find your Team Members
                            </Button>
                          </div>
    } else {
      conditionalButton = <Button onClick={this.showRegistrationForm} variant="contained" color="primary" style={{padding: "10px", margin: "10px"}}>
                            Sign-In
                          </Button>
    }
    var avatar = null; 
    if (this.state.user){
      avatar = <Container style={{maxWidth: "1000px"}}>
                  <Profile userName={this.state.user.userName} firstName={this.state.user.firstName} lastName={this.state.user.lastName} 
                            pic="http://tss.edu.au/wp-content/uploads/2018/01/avatar.b6a87.png"
                  />
                </Container>
    }

    var firstName = this.state.user ? this.state.user.firstName : null; 

    var content = <ContentImages />
    if (this.state.showTeamMembers){
      content = <ContentTeamMembers />
    }

    var title = !this.state.user ? <Title style={{padding:"10px", marginTop: "10px"}}> Tinder for Hackathon </Title> : null
    return (
      <div className="App">
            {title}
            {conditionalButton}
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={null}
            >
              <Bot firstName={firstName}/>
            </Modal>
            <Modal
              visible={this.state.visibleUsersList}
              onOk={this.handleOKShowUsersList}
              onCancel={this.handleCancelUsersList}
            />
            <Form
              visible={this.state.visibleForm}
              onOk={this.handleOKRegistrationForm}
              onCancel={this.handleCancelRegistrationForm}
            />
            {avatar}
            {content}
      </div>
    );
  }
}

export default App;
