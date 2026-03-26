import { vars } from '../../App.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  alignItems: 'center',
  flexWrap: 'wrap',
  rowGap: '15px',
  minHeight: 'max-content',
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainDarker,
});

export const addButton = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T2,
  cursor: 'pointer',
  marginLeft: vars.spacing.big1,
  ':hover': {
    opacity: 0.8,
  },
});

export const boardItem = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  backgroundColor: vars.color.mainFaded,
  padding: vars.spacing.medium,
  borderRadius: 10,
  cursor: 'pointer',
  marginRight: vars.spacing.big1,
  ':hover': {
    opacity: 0.8,
    transform: 'scale(1.03)',
  },
});

export const boardItemActive = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  backgroundColor: vars.color.selectedTab,
  padding: vars.spacing.medium,
  borderRadius: 10,
  cursor: 'pointer',
  marginRight: vars.spacing.big1,
});

export const title = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T2,
  marginRight: vars.spacing.big1,
});

export const addSection = style({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

export const smallTitle = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
});

export const authSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginLeft: '2rem', // 플러스 버튼과 간격 확보
});

export const greeting = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  fontWeight: 'bold',
});

export const authButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: vars.color.mainFaded,
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    opacity: 0.8,
    transform: 'scale(1.03)',
  },
});
