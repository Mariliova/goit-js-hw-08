import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = ({ seconds }) => {
  localStorage.setItem(STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const getSeconds = () => {
  return localStorage.getItem(STORAGE_KEY) || 0;
};

player.setCurrentTime(getSeconds());
