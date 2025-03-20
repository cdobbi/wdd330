export const enableTouchSupport = (draggableElements, dropZone, onDropCallback) => {
    let draggedElement = null;
  
    // Attach touch events to draggable elements
    draggableElements.forEach(draggable => {
      draggable.addEventListener('touchstart', e => {
        draggedElement = e.target;
        e.target.style.opacity = '0.5'; // Provide visual feedback
      });
  
      draggable.addEventListener('touchmove', e => {
        e.preventDefault(); // Prevent default scrolling behavior
        const touch = e.touches[0];
        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${touch.pageX - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${touch.pageY - draggedElement.offsetHeight / 2}px`;
      });
  
      draggable.addEventListener('touchend', e => {
        e.preventDefault();
        e.target.style.opacity = '1'; // Reset visual feedback
        draggedElement.style.position = 'static'; // Reset position
        const touch = e.changedTouches[0];
        const dropZoneRect = dropZone.getBoundingClientRect();
  
        // Check if dropped inside the drop zone
        if (
          touch.pageX > dropZoneRect.left &&
          touch.pageX < dropZoneRect.right &&
          touch.pageY > dropZoneRect.top &&
          touch.pageY < dropZoneRect.bottom
        ) {
          onDropCallback(draggedElement.textContent); // Trigger the callback
        }
      });
    });
  };
  