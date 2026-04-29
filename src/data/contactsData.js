// src/data/contactsData.js
import React from 'react';
import { FaEnvelope, FaLinkedin, FaInstagram, FaUniversity } from 'react-icons/fa';

export const contactsData = [
  {
    type: 'Email',
    value: 'lorenzo.fezza00@gmail.com',
    icon: <FaEnvelope />,
    link: 'mailto:lorenzo.fezza00@gmail.com',
    color: '#D44638',
  },
  {
    type: 'LinkedIn',
    value: 'Lorenzo Fezza',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/in/lorenzo-fezza-33aa122a6',
    color: '#0077B5',
  },
  {
    type: 'Instagram',
    value: '@schiuma_da_barbie',
    icon: <FaInstagram />,
    link: 'https://www.instagram.com/schiuma_da_barbie/',
    color: '#E1306C',
  },
  {
    type: 'PoliTO',
    value: 'Lorenzo Fezza',
    icon: <FaUniversity />,
    link: 'https://www.polito.it/personale?p=lorenzo.fezza',
    color: 'rgba(0, 43, 73, .9)',
  },
];