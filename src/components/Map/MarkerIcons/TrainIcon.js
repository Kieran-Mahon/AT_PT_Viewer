import { DivIcon } from 'leaflet'
import { ICONSIZE, POPUPANCHOR } from './MarkerIconsSettings'

import 'leaflet/dist/leaflet.css';
import './MarkerIcons.css';

export default function TrainIcon(colour) {
    const SVG = `
      <svg viewBox="0 0 283.46 283.46" fill-opacity="0.8">
        <circle cx="141.73" cy="141.73" r="141.73" fill="${colour}"/>
        <path d="M209,76.7c-.44-18.41-27.07-29.37-49-33.61l8.38-13h19.44a5.55,5.55,0,1,0,0-11.09h-93a5.55,5.55,0,1,0,0,
        11.09H114.2l8.38,13c-22,4.23-48.6,15.2-49,33.61-.58,24.3,0,96.33,0,96.33-.72,6.07.72,14.38,2.88,21.21s9.36,19.71,
        20.89,19.71h7.06L79.42,253.39a7.2,7.2,0,1,0,12.14,7.75l5.35-8.38,1.44-2.26.95-1.5h83.9l.95,1.5,1.44,2.26,5.35,
        8.38a7.2,7.2,0,1,0,12.14-7.75l-24.95-39.45h7.06c11.53,0,18.73-12.89,20.89-19.71S209.69,179.1,209,173C209,173,
        209.54,101,209,76.7Zm-67.71-46.6h17.15l-7.47,11.6a74.32,74.32,0,0,0-19.36,0l-7.47-11.6Zm-42.17,137c0,3.6-8.41,
        10.2-12,11.4s-4.2-6-4.2-9.6V146c0-4.8,3-4.8,5.4-3,3.87,2.9,10.81,5.4,10.81,9.6ZM141.25,
        240H105l6.44-10.21h59.65L177.52,240Zm-24.14-19.21,3.72-5.9a7.11,7.11,0,0,0,.47-.94H161.2a7.11,7.11,0,0,0,
        .47.94l3.72,5.9H117.11ZM171,136.14H111.54c-4.49,0-19.8-13.72-20.44-18.17L86.23,84.43a6.88,6.88,0,0,1,
        7-8.08h96a6.88,6.88,0,0,1,7,8.08L191.41,118C190.76,122.42,175.46,136.14,171,136.14Zm28.66,32.72c0,3.6-.6,
        10.81-4.2,9.6s-12-7.8-12-11.4V152.65c0-4.2,6.94-6.7,10.81-9.6,2.4-1.8,5.4-1.8,5.4,3Z"/>
      </svg>
    `;
  
    return new DivIcon({
      html: SVG,
      className: 'MarkerIcon',
      iconSize : ICONSIZE,
      popupAnchor : POPUPANCHOR
    });
  }