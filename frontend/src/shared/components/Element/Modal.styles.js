//import styled, { css } from 'styled-components';
import tw, { styled, css } from 'twin.macro';

import { ClearIcon } from './Icons';

export const ScrollOverlay = styled.div(() => [
  tw`fixed z-10 left-0 top-0 h-full w-full overflow-y-auto`,
]);

export const ClickableOverlay = styled.div(({ variant }) => [
  tw`min-h-full bg-gray-700 bg-opacity-40`,
  variant && clickOverlayStyles[variant],
]);

const clickOverlayStyles = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `,
  aside: '',
};

export const StyledModal = styled.div(({ variant, width }) => [
  tw`relative inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transition-all ease-out duration-500 sm:align-middle sm:max-w-lg sm:w-full`,
  variant && modalStyles(variant, width),
]);

const modalStyles = (variant, width) => {
  if (variant === 'center') {
    return css`
      max-width: ${width}px;
      ${tw`align-middle rounded`}
    `;
  } else if (variant === 'aside') {
    return css`
      max-width: ${width}px;
      ${tw`min-h-screen shadow-sm`}
    `;
  }
};

export const CloseIcon = tw(
  ClearIcon
)`absolute text-sm text-gray-500 right-0 top-0 z-10 cursor-pointer transition duration-200 px-1 w-6 h-6 hover:bg-gray-200 rounded`;
//${mixin.clickable}
