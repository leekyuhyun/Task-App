import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const wrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 1000,
});

export const modalWindow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '80%',
  height: 'max-content',
  maxHeight: '500px',
  overflowY: 'auto',
  backgroundColor: vars.color.mainDarker,
  opacity: 0.95,
  padding: 20,
  boxShadow: vars.shadow.basic,
  color: vars.color.brightText,
  borderRadius: 14,
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '40px',
});

export const closeButton = style({
  cursor: 'pointer',
  fontSize: vars.fontSizing.T2,
  marginTop: '-20px',
  ':hover': {
    opacity: 0.8,
  },
});

export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: 'auto',
  marginBottom: vars.spacing.medium,
});

export const buttons = style({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '50px',
});

export const updateButton = style({
  cursor: 'pointer',
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  ':hover': {
    opacity: 0.8,
  },
});

export const deleteButton = style({
  cursor: 'pointer',
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  ':hover': {
    opacity: 0.8,
  },
});

export const input = style({
  width: '100%',
  padding: vars.spacing.medium,
  border: 'none',
  borderRadius: 5,
  marginBottom: vars.spacing.big2,
  backgroundColor: '#fff',
  fontSize: vars.fontSizing.T4,
  maxHeight: '30px',
  boxShadow: vars.shadow.basic,
});
