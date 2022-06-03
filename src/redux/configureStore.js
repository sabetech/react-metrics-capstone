import { configureStore } from "@reduxjs/toolkit";
import covid from "./covid";

export default configureStore({
    reducer: {
        covid: covid
    }
});