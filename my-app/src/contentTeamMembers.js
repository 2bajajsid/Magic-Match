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
import ChatBot from 'react-simple-chatbot';
import 'antd/dist/antd.css';

class C extends Component {
    render(){
        return(
            <Container style={{paddingTop: "50px"}}>
                     <Row className="justify-content-md-center">
                      <Col md="6"> 
                      <Profile userName="Sampler" firstName="Sampler" lastName="Sampler"
                            pic="https://studybreaks.com/wp-content/uploads/2018/01/Drake-1.jpg"/>
                      </Col>
                      <Col md="6">
                      <Profile userName="Sampler" firstName="Sampler" lastName="Sampler"
                            pic="https://pbs.twimg.com/profile_images/929030268043845633/ilS1ri2v.jpg"/>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col md="6">
                        <Profile userName="Sampler" firstName="Sampler" lastName="Sampler"
                            pic="https://studybreaks.com/wp-content/uploads/2018/01/Drake-1.jpg"/>
                      </Col>
                    </Row>
            </Container>
        )
    }
}

export default C