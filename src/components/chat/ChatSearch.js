import React from "react";
import { Box } from "@material-ui/core";
export const ChatSearch = () => {
  return (
    <div className="chat__left-search">
      <input type="text" className="chat__left-search-input" placeholder="Buscar" />
      <button className="chat__left-search-button">
        <i class="fas fa-search search__icon"></i>
      </button>
    </div>

    // <div>
    //                    <Box bgcolor="red">
    //             <input />
    //         </Box>
    // </div>
  );
};
