import React, { useState, useRef, useEffect } from 'react';
import './RadioPlayer.css';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [station, setStation] = useState('Jazz');
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; 
    }
  }, [volume]);

  const stations = {
    Jazz: 'https://live.radiospinner.com/coffee-jazz-64',
    Gold: 'https://centova.svdns.com.br:19373/stream2',
    Classic: 'http://philae.shoutca.st:8204/stream/1/',
    Ambient: 'http://www.partyviberadio.com:8056/stream/1/'
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleStationChange = async (event) => {
    const newStation = event.target.value;
    if (isPlaying) {
      audioRef.current.pause();
    }
    setStation(newStation);
    audioRef.current.src = stations[newStation];
    await audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="radio-player">
      <h2>Radio Player</h2>
      <select className="station-select" value={station} onChange={handleStationChange}>
        <option value="Jazz">Jazz</option>
        <option value="Gold">Gold</option>
        <option value="Classic">Classic</option>
        <option value="Ambient">Ambient</option>
      </select>
      <audio ref={audioRef} src={stations[station]} />
      <div className="controls">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <button onClick={handlePlayPause} className='button btn'>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default RadioPlayer;