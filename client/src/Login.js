import React from "react"
import { useState } from "react"
import { Container, Navbar,Nav, Carousel } from "react-bootstrap"
import { Parser } from 'html-to-react'
import Button from 'react-bootstrap/Button';        
import Dropdown from 'react-bootstrap/Dropdown';
import style from 'bootstrap/dist/css/bootstrap.css';

import i1 from "./images/1.jpg"
import i2 from "./images/2.jpg"
import i3 from "./images/3.jpg"
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=d37a20ba347e49498409af01c000377e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-read-playback-position%20user-top-read%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20user-library-modify%20user-library-read%20playlist-modify-private"

export default function Login() {
  
    return (
      <><Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Spotistats</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">MiniPlayer</Nav.Link>
          <Nav.Link href="#features">Stats</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
      <div className="container-fluid  d-flex justify-content-center align-items-center" 
      style={{ minHeight: "5vh"}} ></div>
      <Carousel>
        <Carousel.Item height={"100px"}><div class="d-flex justify-content-center align-items-center">
          <img object-fit={"cover"}
            className="w-80"
            src={i2} width={"50%"} height={"50%"}
            alt="Second slide" /></div>

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item height={"100px"}><div class="d-flex justify-content-center align-items-center">
          <img object-fit={"cover"}
            className=" w-80"
            src={i3} width={"50%"} height={"50%"}
            alt="Third slide" /></div>

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div
              className="d-flex justify-content-center align-items-center"
              style={{ margin: "10", maxHeight: "200vh" , "margin-top": "1%" }}
            >
              <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
              </a></div>
      </>
    );
}

