import { useState, useEffect } from "react"
import {Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import useAuth from "./useAuth"
import ToggleButton from 'react-bootstrap/ToggleButton'
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import { Button, ToggleButtonGroup} from 'react-bootstrap'
import arrayChunk from 'lodash.chunk';
import {Tabs, Tab, Navbar,Nav, Carousel } from "react-bootstrap"
import "./a.css"
import axios from "axios"
import Miniplayer from "./MiniPlayer.js"
// var curl = require("curlrequest")
const spotifyApi = new SpotifyWebApi({
  clientId: "d37a20ba347e49498409af01c000377e",
})

export default function Dashboard({ code }) {
//   console.log(code);
  const accessToken = useAuth(code)
//   console.log(code,accessToken);
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [topArtists, setTopArtistsAllTime] = useState([])
  const [topTracks, setTopTracksAllTime] = useState([])
  const [topArtistsRecent, setTopArtistsRecent] = useState([])
  const [topTracksRecent, setTopTracksRecent] = useState([])
  const [topArtists6, setTopArtists6] = useState([])
  const [topTracks6, setTopTracks6] = useState([])
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
    if(track){
        axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
    }
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.name,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken);
    (async () => {
        try {
            await getTopTracksAllTime();
            await getTopArtistsAllTime();
            await getTopTracksRecent();
            await getTopArtistsRecent();
            await getTopTracks6();
            await getTopArtists6();
            // console.log(topTracks,topArtists);
        } catch (error) {
            console.log(error);
        }
    })();
  }, [accessToken])

  useEffect(()=>{
    if(topTracks.length==25 && topArtists.length==25 && topTracksRecent.length==25 && topArtistsRecent.length==25){
      console.log("These are your top tracks, artists!! >.< ");
      console.log(topTracks,topArtists,topTracksRecent,topArtistsRecent);
    }
    return
    
  }, [topTracks,topArtists,topTracksRecent,topArtistsRecent])

  const getTopTracksAllTime = async () => {
    console.log("Inside function!",accessToken) // this log returns a valid token
    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?offset=0&limit=25&time_range=long_term', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    // console.log(res); // this log returns a response with error code 403
    const data = await res.json();
    console.log(data.items)
    const ok = data.items
    setTopTracksAllTime(ok.map(track => {    
      //
      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[1].url,
        albumUrl2: track.album.images[2].url,
      }
    }));
    // return data.items;
  };

  const getTopArtistsAllTime = async () => {
    console.log("Inside function!",accessToken) // this log returns a valid token
    const res = await fetch('https://api.spotify.com/v1/me/top/artists?offset=0&limit=25&time_range=long_term', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    // console.log(res); // this log returns a response with error code 403
    const data = await res.json();
    setTopArtistsAllTime(data.items.map(track => {    
      //
      return {
        artist: track.name,
        genre: track.genres[0],
        uri: track.uri,
        albumUrl: track.images[1].url,
      }
    }));
    // return data.items;
  };

  const getTopTracksRecent = async () => {
    console.log("Inside function!",accessToken) // this log returns a valid token
    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?offset=0&limit=25&time_range=short_term', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    // console.log(res); // this log returns a response with error code 403
    const data = await res.json();
    console.log(data.items)
    const ok = data.items
    setTopTracksRecent(ok.map(track => {    
      //
      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[1].url,
        albumUrl2: track.album.images[2].url,
      }
    }));
    // return data.items;
  };

  const getTopArtistsRecent = async () => {
    console.log("Inside function!",accessToken) // this log returns a valid token
    const res = await fetch('https://api.spotify.com/v1/me/top/artists?offset=0&limit=25&time_range=short_term', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    // console.log(res); // this log returns a response with error code 403
    const data = await res.json();
    setTopArtistsRecent(data.items.map(track => {    
      //
      return {
        artist: track.name,
        genre: track.genres[0],
        uri: track.uri,
        albumUrl: track.images[1].url,
      }
    }));
    // return data.items;
  };

  const getTopTracks6 = async () => {
    console.log("Inside function!",accessToken) // this log returns a valid token
    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?offset=0&limit=25&time_range=medium_term', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    // console.log(res); // this log returns a response with error code 403
    const data = await res.json();
    console.log(data.items)
    const ok = data.items
    setTopTracks6(ok.map(track => {    
      //
      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[1].url,
        albumUrl2: track.album.images[2].url,
      }
    }));
    // return data.items;
  };

  const getTopArtists6 = async () => {
    console.log("Inside function!",accessToken) // this log returns a valid token
    const res = await fetch('https://api.spotify.com/v1/me/top/artists?offset=0&limit=25&time_range=medium_term', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    // console.log(res); // this log returns a response with error code 403
    const data = await res.json();
    setTopArtists6(data.items.map(track => {    
      //
      return {
        artist: track.name,
        genre: track.genres[0],
        uri: track.uri,
        albumUrl: track.images[1].url,
      }
    }));
    // return data.items;
  };

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    // spotifyApi.searchTracks(search).then(res => {
    spotifyApi.searchTracks(search).then(res => {
    
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])
//   }, [search, accessToken])
  const [value, setValue] = useState([1, 2]);
    
  /*
  * The second argument that will be passed to
  * `handleChange` from `ToggleButtonGroup`
  * is the SyntheticEvent object, but we are
  * not using it in this example so we will omit it.
  */
  const handleChange = (val) => setValue(val);
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
      let path = `./miniplayer`; 
      navigate(path);
  }
  const routeChange2 = () =>{ 
      let path = `./statsArtists`; 
      navigate(path);
  }
  const routeChange3 = () =>{ 
    let path = `./statsTracks`; 
    navigate(path);
}
  return (
  // <div class='wrapper text-center' style={{ marginTop: "25px"}}>
  <div>
    
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Spotistats</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={routeChange}>MiniPlayer</Nav.Link>
          <Nav.Link onClick={routeChange2} >Artists Stats</Nav.Link>
          <Nav.Link onClick={routeChange3} >Tracks Stats</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    {/* <Miniplayer code={accessToken}/> */}
    <Routes>
      <Route path="/" element={<Miniplayer code={accessToken}/>} />
      <Route path="/statsArtists" element={<Home />} />
      <Route path="/statsTracks" element={<Tracks />} />
      <Route path="/miniplayer" element={<Miniplayer code={accessToken}/>} />
    </Routes></div>
  );

  function Home() {
    const imgArtistsAllTime = [], imgArtists6 = [], imgArtistsRecent=[];
    var k = 0;
    topArtists.forEach((data) => {
      k += 1;
      imgArtistsAllTime.push(<div class="img-with-text"><img src= {data.albumUrl} /><p>{k}. {data.artist}</p></div>)
    })
    k = 0;
    topArtists6.forEach((data) => {
      k += 1;
      imgArtists6.push(<div class="img-with-text"><img src= {data.albumUrl} /><p>{k}. {data.artist}</p></div>)
    })
    k = 0;
    topArtistsRecent.forEach((data) => {
      k += 1;
      imgArtistsRecent.push(<div class="img-with-text"><img src= {data.albumUrl} /><p>{k}. {data.artist}</p></div>)
    })
    return (
    <>
    <h2 class="content text-center">Home</h2>

    {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '-200vh'}}> */}
    <div className="content text-center" style={{ whiteSpace: "pre" }}>
    <Tabs style={{width:"70%", margin:"auto"}} defaultActiveKey="alltime" id="uncontrolled-tab-example" 
        className="mb-3 align-center nav nav-tabs nav-justified">
      <Tab eventKey="alltime" title="All Time">
        <div id="img-wrapper" class="text-align-centre">
          {imgArtistsAllTime}
        </div>
      </Tab>
      <Tab eventKey="6months" title="Last 6 Months">
        <div id="img-wrapper" class="text-align-centre">
          {imgArtists6}
        </div>
      </Tab>
      <Tab eventKey="4weeks" title="Last 4 Weeks">
       <div id="img-wrapper" class="text-align-centre">
          {imgArtistsRecent}
        </div>
      </Tab>
    </Tabs>
    
    </div>

    </>

    );
  }

  function Tracks() {
    const imgtracksAllTime = [], imgtracks6 = [], imgtracksRecent=[];
    var k = 0;
    topTracks.forEach((track) => {
      k += 1;
      imgtracksAllTime.push(
       
        <div class="media text-muted pt-3">
          <img src={track.albumUrl2} alt="" class="mr-2 rounded" style={{float:"left" ,marginLeft:"30%",marginTop:"-0.8%"}}/>
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">{track.title}</strong>
            {track.artist}
          </p>
        </div>
        );
    })
    k = 0;
    topTracks6.forEach((data) => {
      k += 1;
      imgtracks6.push(<div><img src= {data.albumUrl2} /><p>{k}.{data.title} | By: {data.artist}</p></div>)
    })
    k = 0;
    topTracksRecent.forEach((data) => {
      k += 1;
      imgtracksRecent.push(<div><img src= {data.albumUrl2} /><p>{k}.{data.title} | By: {data.artist}</p></div>)
    })
    return (
    <>
    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/offcanvas/"/>
    <link href="../../dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="offcanvas.css" rel="stylesheet"/>
    <h2 class="content text-center">Home</h2>

    {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '-200vh'}}> */}
    <div className="content text-center" style={{ whiteSpace: "pre" }}>
    <Tabs style={{width:"70%", margin:"auto"}} defaultActiveKey="alltime" id="uncontrolled-tab-example" 
        className="mb-3 align-center nav nav-tabs nav-justified">
      <Tab eventKey="alltime" title="All Time">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        <h6 class="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
        {imgtracksAllTime}
      </div>
      </Tab>
      <Tab eventKey="6months" title="Last 6 Months">
        <div  class="text-align-centre">
          {imgtracks6}
        </div>
      </Tab>
      <Tab eventKey="4weeks" title="Last 4 Weeks">
       <div  class="text-align-centre">
          {imgtracksRecent}
        </div>
      </Tab>
    </Tabs>
    
    </div>

    </>

    );
  }
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )

}
