import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop(){
    const {pathname}=useLocation();
    useEffect(()=>{
        // scroll to top whenever the route changes
        window.scrollTo(0,0);
        // OR 
        // With Smooth Animation move to top Each And EveryTime When We move to another page.
        // window.scrollTo({top:0,behavior:"smooth"});
    },[pathname]);
    return null; // this component doesn't render anything visible.
}
export default ScrollToTop;