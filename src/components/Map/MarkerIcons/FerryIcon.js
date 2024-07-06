import { DivIcon } from 'leaflet'
import { ICONSIZE, POPUPANCHOR } from './MarkerIconsSettings'

import 'leaflet/dist/leaflet.css';
import './MarkerIcons.css';

export default function FerryIcon(colour) {
    const SVG = `
      <svg viewBox="0 0 283.46 283.46" fill-opacity="0.8">
        <circle cx="141.73" cy="141.73" r="141.73" fill="${colour}"/>
        <path d="M234.67,244.18a26.17,26.17,0,0,1-6.55,
        2.28l20.44-76.52v-1.54c0-7.22-7.25-13.15-14.36-14h0c-.54-.06-7.39-1.74-7.39-1.74s-4-31-4-31.21l-.07-.8h-.05L212.7,
        69.19l-2-7.73h-.13a10.31,10.31,0,0,0-8.91-8.29h-.08l-.2,0-55.16-6.29h0L144.47,21.6a2.54,2.54,0,1,0-5.08,0l-1.68,
        25.25h0L82.51,53.13l-.2,0h-.08a10.31,10.31,0,0,0-8.91,8.29h-.13l-2,7.73-9.93,51.51h-.05l-.07.8c0,.25-4,31.21-4,
        31.21s-6.85,1.68-7.39,1.74h0c-7.11.82-14.36,6.75-14.36,14v1.54l20.44,76.52a26.17,26.17,0,0,
        1-6.55-2.28c-16.92-8.8-29-10.44-42.45-2.14C.44,245.4,5,256.8,13.11,254.22c7.49-2.38,17.78-3.15,29.8,3C58.17,265,
        71.1,265,84,258.21s20.11-8,35.82-1.18A46.32,46.32,0,0,0,164,257c15.71-6.81,22.89-5.59,35.82,1.18s25.87,6.77,
        41.13-1c12-6.13,22.31-5.36,29.8-3,8.12,2.58,12.67-8.82,6.37-12.18C263.68,233.75,251.59,235.39,234.67,244.18ZM86.46,
        90.43s.8-12.58,1.07-14.78-.8-5,3.21-5.35c0,0,15-3.46,23-3.46h56.33c8,0,23,3.46,23,3.46,4,.31,2.94,3.14,3.21,
        5.35s1.07,14.78,1.07,14.78c.27,2.2-1.6,2.51-2.94,2.2s-14.84-2.83-23-2.83h-59c-8.19,0-21.69,2.52-23,2.83S86.19,
        92.63,86.46,90.43ZM160,243.31a42.68,42.68,0,0,1-36.2,0c-13.22-5.9-23.4-6.94-34.51-2.8l2.58-7.85s.29-2.54,3.76-6,
        9.63-3.29,9.63-3.29h73.27s6.15-.19,9.63,3.29,3.76,6,3.76,6l2.58,7.85C183.43,236.36,173.25,237.41,160,
        243.31Zm40.87-98.71c-1.5-.35-16.62-3.17-25.8-3.17H108.76c-9.18,0-24.3,2.82-25.8,3.17s-3.6,0-3.3-2.47c0,0,.9-14.09,
        1.2-16.56s-.9-5.64,3.6-6c0,0,16.84-3.88,25.79-3.88H173.6c8.95,0,25.79,3.88,25.79,3.88,4.5.35,3.3,3.52,3.6,6s1.2,
        .56,1.2,16.56C204.5,144.59,202.4,144.94,200.9,144.59Z"/>
      </svg>
    `;
  
    return new DivIcon({
      html: SVG,
      className: 'MarkerIcon',
      iconSize : ICONSIZE,
      popupAnchor : POPUPANCHOR
    });
  }