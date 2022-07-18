return (
    <body>
        <div id = "image-head">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="container-fluid d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh"}} >  
        
        <Carousel interval={1000} keyboard={false} pauseOnHover={true}>  
        <Carousel.Item style={{'height':"500px", 'width':"700px","margin":"auto"}}  >  
        <img style={{'height':"300px"}}  
        className="d-block w-100"  
      src={'assets/img/img2.jpg'}  />  
          <Carousel.Caption>  
            <h3>First Demo </h3>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "0vh" , "margin-top": "1%" }}
            >
              <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
              </a>
            </div>  
          </Carousel.Caption>  
        </Carousel.Item  >  
  
        </Carousel>  
                  
        </div>
        
      </div>  
    </body>
    );

  {/* <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <ToggleButton onClick={routeChange} id="tbg-btn-1" value={1}>
        Mini Player
      </ToggleButton>
      <ToggleButton onClick={routeChange2} id="tbg-btn-2" value={2}>
        View Stats
      </ToggleButton>
    </ToggleButtonGroup> */}

 // <>
        // <div
        //   className="d-flex m-2"
        //   style={{ cursor: "pointer" }}
        // >
        // <img src={track.albumUrl2} style={{ height: "64px", width: "64px" }} />
        // <div className="ml-3">
        //   <div>{k}. {track.title}</div>
        //   <div className="text-muted">{track.artist}</div>
        // </div></div></>