import styled from 'styled-components';
import { baseZIndex, interComponentSpacing } from 'styles/Variables';
import { largeFont } from 'styles/FontSize';

export const CalendarContainer = styled.div`
  z-index: ${baseZIndex};
  position: relative;
  height: 100%;
  width: calc(100% - ${interComponentSpacing});
  cursor: default;

  ${largeFont}
`;
