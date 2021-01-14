import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import usePortal from 'react-useportal';

import { DragObjectIcon } from '@/shared/components/Icon';

const HandleWrapper = styled.span`
  padding: 4px 0;
  cursor: move;
  cursor: grab;
`;

const DraggableHandle = ({ onDrag, children }) => {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => onDrag(e.movementX, e.movementY);

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  return <HandleWrapper onMouseDown={handleMouseDown}>{children}</HandleWrapper>;
};

const DraggableListWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 4px;
  z-index: 2147483640;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  cursor: pointer;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px;
`;
const HeadingWrapper = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 2px;
`;
const BodyWrapper = styled.span``;

const DraggableList = ({ children }) => {
  const listRef = useRef(null);

  const handleDrag = (movementX, movementY) => {
    const list = listRef.current;
    if (!list) return;

    const { x, y } = list.getBoundingClientRect();
    list.style.left = `${x + movementX}px`;
    list.style.top = `${y + movementY}px`;
  };

  return (
    <DraggableListWrapper ref={listRef}>
      <DraggableHandle onDrag={handleDrag}>
        <DragObjectIcon size={16} />
        <HeadingWrapper>Page list</HeadingWrapper>
      </DraggableHandle>
      <BodyWrapper>{children}</BodyWrapper>
    </DraggableListWrapper>
  );
};

const DraggableListPortal = (props) => {
  const { Portal } = usePortal({
    bindTo: document.getElementById('portal'),
  });
  return (
    <Portal>
      <DraggableList {...props} />
    </Portal>
  );
};

export default DraggableListPortal;
