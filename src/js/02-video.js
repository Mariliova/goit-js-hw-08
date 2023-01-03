import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import localStorageApi from './local-storage-api';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(() => localStorageApi.load(STORAGE_KEY) || 0);

function onPlay({ seconds }) {
  localStorageApi.save(STORAGE_KEY, seconds);
}
