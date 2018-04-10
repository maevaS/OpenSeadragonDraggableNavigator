/**
 *
 * @author Harshali Talele <https://github.com/harshalitalele/OpenSeadragonDraggableNavigator>
 */
(function($) {
    "use strict";

    if (!$.version || $.version.major < 2) {
        throw new Error('This version of OpenSeadragonZoomLevels requires OpenSeadragon version 2.0.0+');
    }

    $.Viewer.prototype.setNavigatorDraggable = function(isSet) {
        var droppableElem = this.element, 
            navigatorParent = this.navigator.container.parentElement.parentElement, 
            draggableDivSize = 25, 
            draggableItemId = "osd-draggable-nav";

        if(isSet) {
            if(this.navigator._draggable) {
                return;
            } else {
                function moveNavigator(event) {
                    var elem = navigatorParent.parentElement, 
                        osdy = droppableElem.getBoundingClientRect().y,
                        osdx = droppableElem.getBoundingClientRect().x;
                    elem.style.top =  event.y - osdy - navigatorParent.scrollHeight + "px";
                    elem.style.left = event.x - osdx + "px";
                    elem.style.zIndex = 99999;
                }
                
                var draggableDiv = document.createElement( "img" );
                draggableDiv.setAttribute("id", draggableItemId);
                draggableDiv.style.width = draggableDivSize + "px";
                draggableDiv.style.height = draggableDivSize + "px";
                draggableDiv.setAttribute("src", "move-arrows.svg");
                draggableDiv.setAttribute("alt", "+");
                draggableDiv.style.zIndex = 99999;
                draggableDiv.style.position = "absolute";
                draggableDiv.style.left = "-25px";
                draggableDiv.style.bottom = "-25px";

                draggableDiv.addEventListener("drag", moveNavigator);
                draggableDiv.setAttribute("draggable", "true");
                navigatorParent.append(draggableDiv);

                droppableElem.addEventListener("dragover", function(event) {
                    event.preventDefault();
                });
                droppableElem.addEventListener("drop", function(event) {
                    event.preventDefault();
                    moveNavigator(event);
                });
            }
            this.navigator._draggable = true;
        } else {
            var draggableDiv = document.getElementById(draggableItemId);
            draggableDiv.parentElement.removeChild(draggableDiv);
            this.navigator._draggable = false;
        }
    };
}(OpenSeadragon));