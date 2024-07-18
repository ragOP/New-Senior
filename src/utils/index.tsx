import { animateScroll } from "../components/animationScroll";

const getElementPosition = (element: any) => element.offsetTop;

export const scrollTo = ({ id, ref = null, duration = 1500, offset = 20 }: any) => {
    // the position of the scroll bar before the user clicks the button
    const initialPosition = window.scrollY;

    // if the reference is id
    if (id) {
        const element = document.getElementById(id);

        if (!element) {
            // log error if the reference passed is invalid
            console.error('Element not found');
            return;
        }

        // target position is the element's offsetTop minus the offset
        const targetPosition = getElementPosition(element) - offset;

        animateScroll({
            targetPosition,
            initialPosition,
            duration
        });
    }
};