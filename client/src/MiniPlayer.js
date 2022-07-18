import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import $ from 'jquery';
const spotifyApi = new SpotifyWebApi({
  clientId: "d37a20ba347e49498409af01c000377e",
})

export default function MiniPlayer({ code }) {
//   console.log(code);
  const accessToken = code;
//   console.log(code,accessToken);
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  var damn=false;
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
    if(track){
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
  }, [accessToken])

//   useEffect(()=>{
//     console.log("hell");
//     $('#content').html(lyrics);
//     if(lyrics == "No Lyrics Found"){
//         $('#content').html( <img style={{marginTop:"5%"}} src={playingTrack?.albumUrl2}></img> );
//         damn=true;
//     }else{
//         damn=false;
//         $('#content').html(lyrics);
//     }
//     console.log("Lyrics present? : ",damn,lyrics);
//   },[lyrics])

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
            albumUrl2: track.album.images[1].url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])
//   }, [search, accessToken])
 
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
          <div  className="content text-center" style={{ whiteSpace: "pre" }}>
            <img style={{marginTop:"5%"}} src={playingTrack?.albumUrl2}></img>
          </div>)
        }
      </div>
      <div style={{width:"70%", margin:"auto" , marginBottom:"10%"}}>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )
}
